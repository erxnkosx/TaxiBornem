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
  useEffect(() => {
    const ready = analyticsAvailable();
    setAnalyticsReady(ready);
    const restore = () => {
      setMaps(readConsent() === "accepted");
      setStatistics(readAnalyticsConsent() === true);
    };
    restore();
    if (readConsent() === null || (ready && readAnalyticsConsent() === null)) setOpen(true);
    const reopen = () => { restore(); setOpen(true); };
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => window.removeEventListener(CONSENT_OPEN, reopen);
  }, []);
  const save = (allowMaps: boolean, allowStatistics: boolean) => {
    writeConsent(allowMaps ? "accepted" : "refused");
    if (analyticsReady) writeAnalyticsConsent(allowStatistics);
    setOpen(false);
  };
  if (!open) return null;
  const button = "flex-1 px-4 py-2.5 bg-[#f4f4f4] border border-black/10 text-[#181818] text-sm font-semibold rounded-[12px] hover:bg-[#e8e8e8]";
  return (
    <div role="dialog" aria-labelledby="consent-title"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md max-h-[85dvh] overflow-y-auto z-[60] bg-white rounded-[20px] border border-black/10 shadow-xl p-5">
      <button type="button" onClick={() => save(false, false)} aria-label="Sluiten en alles weigeren"
        className="absolute top-3 right-3 p-2 rounded-lg hover:bg-[#f4f4f4]">
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2 pr-8 mb-3">
        <Cookie className="w-5 h-5 text-[#c99700]" />
        <h2 id="consent-title" className="text-sm font-bold">Uw privacykeuzes</h2>
      </div>
      <p className="text-xs text-[#6b6b6b] leading-relaxed mb-3">
        U kiest zelf welke Google-diensten mogen laden. We onthouden uw keuzes maximaal
        180 dagen. Weigeren heeft geen invloed op het aanvragen van een rit.
      </p>
      <label className="flex items-start gap-3 py-2 text-xs leading-relaxed">
        <input type="checkbox" checked={maps} onChange={e => setMaps(e.target.checked)} className="mt-1 accent-[#181818]" />
        <span><strong>Google Maps</strong><br />Toon de kaart. Google ontvangt dan uw IP-adres en browsergegevens en kan cookies plaatsen.</span>
      </label>
      {analyticsReady && <label className="flex items-start gap-3 py-2 text-xs leading-relaxed">
        <input type="checkbox" checked={statistics} onChange={e => setStatistics(e.target.checked)} className="mt-1 accent-[#181818]" />
        <span><strong>Statistieken (Google Analytics)</strong><br />Meet paginaweergaven, formuliergebruik en contactklikken met cookies. We sturen geen ingevulde rit- of contactgegevens mee.</span>
      </label>}
      <div className="flex gap-2 mt-4">
        <button type="button" className={button} onClick={() => save(false, false)}>Alles weigeren</button>
        <button type="button" className={button} onClick={() => save(true, true)}>Alles toestaan</button>
      </div>
      <button type="button" className={`${button} w-full mt-2`} onClick={() => save(maps, statistics)}>Keuzes opslaan</button>
      <div className="mt-3 flex gap-3 text-xs text-[#6b6b6b]">
        <a href="/cookiebeleid" className="underline">Cookiebeleid</a>
        <a href="/privacybeleid" className="underline">Privacybeleid</a>
      </div>
    </div>
  );
}
