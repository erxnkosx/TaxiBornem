import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { readConsent, writeConsent, CONSENT_OPEN } from "../lib/cookieConsent";
import { readAnalyticsConsent, writeAnalyticsConsent } from "../lib/analyticsConsent";
import { analyticsAvailable } from "../lib/analytics";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [analyticsReady, setAnalyticsReady] = useState(false);
  const [maps, setMaps] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [customize, setCustomize] = useState(false);
  useEffect(() => {
    const ready = analyticsAvailable();
    setAnalyticsReady(ready);
    const restore = () => {
      setMaps(readConsent() === "accepted");
      setStatistics(readAnalyticsConsent() === true);
    };
    restore();
    if (readConsent() === null || (ready && readAnalyticsConsent() === null)) setOpen(true);
    const reopen = () => { restore(); setCustomize(true); setOpen(true); };
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => window.removeEventListener(CONSENT_OPEN, reopen);
  }, []);
  const save = (allowMaps: boolean, allowStatistics: boolean) => {
    writeConsent(allowMaps ? "accepted" : "refused");
    if (analyticsReady) writeAnalyticsConsent(allowStatistics);
    setCustomize(false);
    setOpen(false);
  };
  if (!open) return null;
  const button = "min-h-11 min-w-0 px-3 py-2 bg-slate-100 border border-transparent text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600";
  return (
    <div role="dialog" aria-labelledby="consent-title"
      aria-describedby="consent-description"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 sm:left-5 sm:right-auto sm:w-[min(38rem,calc(100vw-2.5rem))] max-h-[80dvh] overflow-y-auto z-[60] bg-white rounded-2xl border border-slate-200 shadow-xl p-4 text-slate-900">
      {customize && <button type="button" onClick={() => setCustomize(false)} aria-label="Terug naar cookiekeuzes"
        className="absolute top-2 right-2 min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-600">
        <X className="w-4 h-4" />
      </button>}
      <div className={`flex items-start gap-3 ${customize ? "pr-10" : ""}`}>
        <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600"><Cookie className="w-4 h-4" aria-hidden="true" /></span>
        <div>
          <h2 id="consent-title" className="text-sm font-bold">{customize ? "Uw cookiekeuzes" : "We gebruiken cookies"}</h2>
          <p id="consent-description" className="mt-1 text-xs text-slate-600 leading-relaxed">
            {analyticsReady ? "Statistieken en Google Maps laden alleen met uw toestemming." : "Google Maps laadt alleen met uw toestemming."}{" "}
            <a href="/cookiebeleid" className="underline underline-offset-2">Cookiebeleid</a>
          </p>
        </div>
      </div>
      {customize && <div className="mt-3 border-t border-slate-100 pt-2">
      <label className="flex items-start gap-3 py-3 text-xs leading-relaxed cursor-pointer">
        <input type="checkbox" checked={maps} onChange={e => setMaps(e.target.checked)} className="mt-1 accent-[#181818]" />
        <span><strong>Google Maps</strong><br />Toon de kaart via Google.</span>
      </label>
      {analyticsReady && <label className="flex items-start gap-3 py-3 text-xs leading-relaxed cursor-pointer">
        <input type="checkbox" checked={statistics} onChange={e => setStatistics(e.target.checked)} className="mt-1 accent-[#181818]" />
        <span><strong>Statistieken</strong><br />Meet bezoeken en contactklikken met Google Analytics.</span>
      </label>}
      <p className="text-xs text-slate-500 mt-1">Uw keuze geldt maximaal 180 dagen. <a href="/privacybeleid" className="underline underline-offset-2">Privacybeleid</a></p>
      </div>}
      <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto] gap-2 mt-3">
        <button type="button" className={button} onClick={() => save(true, true)}>Alles accepteren</button>
        <button type="button" className={button} onClick={() => save(false, false)}>Alles weigeren</button>
        {customize ? <button type="button" className={`${button} col-span-2 sm:col-span-1 !border-teal-600 !bg-white !text-teal-700 hover:!bg-teal-50`} onClick={() => save(maps, statistics)}>Keuzes opslaan</button>
          : <button type="button" className={`${button} col-span-2 sm:col-span-1 !border-teal-600 !bg-white !text-teal-700 hover:!bg-teal-50`} onClick={() => setCustomize(true)}>Aanpassen</button>}
      </div>
    </div>
  );
}
