import { build } from 'esbuild';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import vm from 'node:vm';

const bundled = await build({
  stdin: { contents: 'export * from "./src/lib/analytics"; export * from "./src/lib/analyticsConsent";', resolveDir: process.cwd() },
  bundle: true, write: false, format: 'iife', globalName: 'api', platform: 'browser',
});
function browser({ hostname = 'www.taxibornem.be', id = 'G-TEST12345', blocked = false } = {}) {
  const storage = new Map(); const scripts = []; const cookies = []; const listeners = {};
  const document = {
    querySelector: () => id ? { content: id } : null,
    referrer: 'https://example.org/search?email=private@example.org',
    createElement: () => ({}), head: { appendChild: s => scripts.push(s) },
    addEventListener: (name, cb) => { listeners[`doc:${name}`] = cb; },
    get cookie() { return '_ga=old; _ga_TEST12345=old; essential=keep'; },
    set cookie(value) { cookies.push(value); },
  };
  const window = {
    location: { hostname, origin: `https://${hostname}`, pathname: '/contact', href: `https://${hostname}/contact?email=secret#private` },
    localStorage: {
      getItem: k => { if (blocked) throw Error(); return storage.get(k) ?? null; },
      setItem: (k,v) => { if (blocked) throw Error(); storage.set(k,v); },
    },
    addEventListener: (n,cb) => { listeners[n] = cb; },
    dispatchEvent: e => listeners[e.type]?.(e),
    setInterval: cb => { listeners.tick = cb; }, setTimeout, clearTimeout,
  };
  const context = vm.createContext({ window, document, URL, Event, Element: class {}, Date, console });
  vm.runInContext(bundled.outputFiles[0].text, context);
  return { api: context.api, window, storage, scripts, cookies, listeners,
    events: () => (window.dataLayer ?? []).map(args => Array.from(args)) };
}
test('no Google script or events before consent, on refusal, or from old Maps consent', () => {
  const b=browser(); b.storage.set('taxibornem-cookieconsent', JSON.stringify({consent:'accepted',expiresAt:Date.now()+10000}));
  b.api.initAnalytics(); b.api.trackAnalytics('booking_start');
  assert.equal(b.scripts.length,0); assert.equal(b.events().length,0);
  b.api.writeAnalyticsConsent(false); assert.equal(b.scripts.length,0);
});
test('consent loads once and scrubs URLs; fixed events never include form data', () => {
  const b=browser(); b.api.initAnalytics(); b.api.writeAnalyticsConsent(true); b.api.initAnalytics(); b.api.writeAnalyticsConsent(true);
  assert.equal(b.scripts.length,1);
  assert.equal(b.events().filter(e=>e[1]==='page_view').length,1);
  const config=b.events().find(e=>e[0]==='config')[2];
  assert.equal(config.page_location,'https://www.taxibornem.be/contact');
  assert.equal(config.page_referrer,'https://example.org');
  assert.equal(config.send_page_view,false);
  b.api.trackAnalytics('click_phone'); b.api.trackAnalytics('secret@example.org');
  assert.equal(b.events().filter(e=>e[1]==='click_phone').length,1);
  assert.ok(!JSON.stringify(b.events()).includes('secret'));
});
test('revocation disables GA, stops custom events, clears only GA cookies, regrant does not duplicate script', () => {
  const b=browser(); b.api.initAnalytics(); b.api.writeAnalyticsConsent(true); b.api.writeAnalyticsConsent(false);
  assert.equal(b.window['ga-disable-G-TEST12345'],true);
  const count=b.events().length; b.api.trackAnalytics('booking_start'); assert.equal(b.events().length,count);
  assert.ok(b.cookies.some(c=>c.startsWith('_ga='))); assert.ok(!b.cookies.some(c=>c.startsWith('essential=')));
  b.api.writeAnalyticsConsent(true); assert.equal(b.scripts.length,1); assert.equal(b.window['ga-disable-G-TEST12345'],false);
});
test('missing ID and preview hosts cannot send events', () => {
  for (const options of [{id:''},{hostname:'taxibornem.pages.dev'},{hostname:'localhost'}]) {
    const b=browser(options); b.api.writeAnalyticsConsent(true); b.api.initAnalytics(); b.api.trackAnalytics('generate_lead');
    assert.equal(b.scripts.length,0); assert.equal(b.events().length,0);
  }
});
test('expired and malformed consent fails closed; blocked storage uses session choice', () => {
  const b=browser(); b.storage.set(b.api.ANALYTICS_KEY,JSON.stringify({allowed:true,expiresAt:1})); b.api.initAnalytics();
  assert.equal(b.scripts.length,0); b.storage.set(b.api.ANALYTICS_KEY,'broken'); assert.equal(b.api.readAnalyticsConsent(),null);
  const c=browser({blocked:true}); c.api.initAnalytics(); c.api.writeAnalyticsConsent(true); assert.equal(c.scripts.length,1);
});
test('cross-tab removal and expiry disable tracking', () => {
  const b=browser(); b.api.initAnalytics(); b.api.writeAnalyticsConsent(true);
  b.storage.clear(); b.listeners.storage({key:null}); assert.equal(b.window['ga-disable-G-TEST12345'],true);
  b.api.writeAnalyticsConsent(true); b.storage.set(b.api.ANALYTICS_KEY,JSON.stringify({allowed:true,expiresAt:1}));
  b.listeners.tick(); assert.equal(b.window['ga-disable-G-TEST12345'],true);
});
test('successful booking is bounded when Google is blocked; refusal sends nothing', async () => {
  const b=browser(); b.api.initAnalytics(); await b.api.trackSuccessfulBooking(); assert.equal(b.events().length,0);
  b.api.writeAnalyticsConsent(true); await b.api.trackSuccessfulBooking();
  assert.equal(b.events().filter(e=>e[1]==='generate_lead').length,1);
});
