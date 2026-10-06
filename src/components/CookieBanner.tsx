import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
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
  const button = "min-h-11 min-w-0 px-3 py-2 bg-[#181818] border border-[#181818] text-white text-xs font-semibold rounded-xl hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC107]";
  return (
    <div role="dialog" aria-labelledby="consent-title"
      aria-describedby="consent-description"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 sm:left-5 sm:right-auto sm:w-[26rem] max-h-[80dvh] overflow-y-auto z-[60] bg-[#fffdf7] rounded-[22px] border border-[#181818]/10 border-t-4 border-t-[#FFC107] shadow-[0_8px_32px_rgba(0,0,0,0.16)] p-5 text-[#181818]">
      {customize && <button type="button" onClick={() => setCustomize(false)} aria-label="Terug naar cookiekeuzes"
        className="absolute top-3 right-3 min-h-11 min-w-11 flex items-center justify-center rounded-xl hover:bg-[#FFF6D6] focus-visible:outline-2 focus-visible:outline-[#FFC107]">
        <ArrowLeft className="w-4 h-4" />
      </button>}
      <div className={`flex items-center gap-2 mb-3 ${customize ? "pr-10" : ""}`}>
        <img src="/logo.webp" alt="" width={40} height={40} className="h-10 w-10 shrink-0 object-contain" />
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase">Taxi Bornem <span className="text-[#8a8170] font-medium">/ Privacy</span></span>
      </div>
      <h2 id="consent-title" className="text-lg font-bold tracking-tight">{customize ? "Wat mogen we laden?" : "Uw bezoek, uw keuze."}</h2>
      <p id="consent-description" className="mt-1 text-xs text-[#68645c] leading-relaxed">
        {analyticsReady ? "Cookies voor statistieken en Google Maps? U beslist." : "Google Maps laden? U beslist."}
      </p>
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
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button type="button" className={button} onClick={() => save(true, true)}>Alles accepteren</button>
        <button type="button" className={button} onClick={() => save(false, false)}>Alles weigeren</button>
        {customize && <button type="button" className={`${button} col-span-2 !border-[#FFC107] !bg-[#FFC107] !text-[#181818] hover:!bg-[#FFD54F]`} onClick={() => save(maps, statistics)}>Keuzes opslaan</button>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 mt-2 text-xs">
        {!customize && <button type="button" className="min-h-11 font-semibold underline underline-offset-4 decoration-[#FFC107] decoration-2 hover:text-[#725600] focus-visible:outline-2 focus-visible:outline-[#FFC107] rounded" onClick={() => setCustomize(true)}>Zelf kiezen</button>}
        <a href="/cookiebeleid" className="inline-flex items-center min-h-11 text-[#68645c] underline underline-offset-2">Cookiebeleid</a>
      </div>
    </div>
  );
}
