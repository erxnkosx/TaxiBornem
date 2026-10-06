import { ANALYTICS_CHANGED, ANALYTICS_KEY, readAnalyticsConsent } from "./analyticsConsent";

type EventName = "booking_start" | "booking_error" | "generate_lead" | "click_whatsapp" | "click_phone";
type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag; [key: `ga-disable-${string}`]: boolean };
let id = "";
let initialized = false;
let configured = false;
let pageSent = false;
let script: HTMLScriptElement | null = null;

export function analyticsAvailable(): boolean {
  return typeof document !== "undefined" && /^G-[A-Z0-9]+$/.test(
    document.querySelector<HTMLMetaElement>('meta[name="ga-measurement-id"]')?.content ?? "",
  );
}

function enabled(): boolean {
  return !!id && readAnalyticsConsent() === true;
}

function removeCookies(): void {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, ".taxibornem.be", "taxibornem.be"];
  for (const entry of document.cookie.split(";")) {
    const name = entry.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ""}; SameSite=Lax; Secure`;
    }
  }
}

function syncConsent(): void {
  const w = window as AnalyticsWindow;
  w[`ga-disable-${id}`] = !enabled();
  if (!enabled()) {
    // Disable first; do not send a consent-denied ping (basic consent mode).
    removeCookies();
    return;
  }
  if (!configured) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", {
      analytics_storage: "granted", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied",
    });
    w.gtag("js", new Date());
    // Never include the query string, fragment, user-entered values or full referrer.
    let referrer = "";
    try { referrer = document.referrer ? new URL(document.referrer).origin : ""; } catch { /* ignore */ }
    w.gtag("config", id, {
      send_page_view: false,
      page_location: `${window.location.origin}${window.location.pathname}`,
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 15552000,
      cookie_update: false,
    });
    configured = true;
  }
  if (!script) {
    script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }
  if (!pageSent) {
    w.gtag?.("event", "page_view", { send_to: id });
    pageSent = true;
  }
}

// Fixed allowlist and no arbitrary parameters: form data cannot enter this API.
export function trackAnalytics(name: EventName): void {
  try {
    if (!["booking_start", "booking_error", "generate_lead", "click_whatsapp", "click_phone"].includes(name)) return;
    if (!enabled()) return;
    (window as AnalyticsWindow).gtag?.("event", name, { send_to: id, transport_type: "beacon" });
  } catch { /* Analytics must never break a booking or navigation. */ }
}

/** A short bounded wait lets the event leave before the thank-you navigation.
 * Blockers or a failed Google script must never hold the booking hostage. */
export async function trackSuccessfulBooking(): Promise<void> {
  if (!enabled()) return;
  await new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, 400);
    try {
      (window as AnalyticsWindow).gtag?.("event", "generate_lead", {
        send_to: id, transport_type: "beacon", event_timeout: 350,
        event_callback: () => { window.clearTimeout(timer); resolve(); },
      });
    } catch { window.clearTimeout(timer); resolve(); }
  });
}

export function initAnalytics(): void {
  if (initialized || !analyticsAvailable()) return;
  // Preview deploys and localhost must not pollute production reports.
  if (!["www.taxibornem.be", "taxibornem.be"].includes(window.location.hostname)) return;
  initialized = true;
  id = document.querySelector<HTMLMetaElement>('meta[name="ga-measurement-id"]')!.content;
  syncConsent();
  window.addEventListener(ANALYTICS_CHANGED, syncConsent);
  window.addEventListener("storage", (event) => {
    if (event.key === ANALYTICS_KEY || event.key === null) syncConsent();
  });
  // Also honour expiry on pages left open for a long time.
  window.setInterval(syncConsent, 60000);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const href = target.closest<HTMLAnchorElement>("a[href]")?.getAttribute("href");
    if (!href) return;
    if (href.startsWith("tel:")) trackAnalytics("click_phone");
    else {
      try {
        const url = new URL(href, window.location.href);
        if (["wa.me", "api.whatsapp.com"].includes(url.hostname)) trackAnalytics("click_whatsapp");
      } catch { /* not a URL */ }
    }
  });
}
