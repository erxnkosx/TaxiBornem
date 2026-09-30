import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  readConsent,
  writeConsent,
  CONSENT_OPEN,
  type Consent,
} from "../lib/cookieConsent";

export default function CookieBanner() {
  // Start altijd gesloten: server en client renderen dan hetzelfde, en de
  // banner mag pas verschijnen als we localStorage gelezen hebben.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);

    const heropen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN, heropen);
    return () => window.removeEventListener(CONSENT_OPEN, heropen);
  }, []);

  const kies = (consent: Consent) => {
    writeConsent(consent);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Toestemming voor Google Maps"
      className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:right-auto sm:max-w-md z-[60] bg-white rounded-[20px] border border-black/10 shadow-xl shadow-black/10 p-5"
    >
      <button
        type="button"
        onClick={() => kies("refused")}
        aria-label="Sluiten en weigeren"
        className="absolute top-3 right-3 p-1.5 rounded-[10px] text-[#9b9b9b] hover:text-[#181818] hover:bg-[#f4f4f4] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3 mb-3 pr-6">
        <div className="w-9 h-9 rounded-[12px] bg-[#FFC107]/15 flex items-center justify-center flex-shrink-0">
          <Cookie className="w-4 h-4 text-[#c99700]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#181818] mb-1">Google Maps laden?</p>
          <p className="text-xs text-[#6b6b6b] leading-relaxed">
            De kaart wordt pas geladen als u daarvoor kiest. Google ontvangt dan uw IP-adres en
            technische browsergegevens en kan cookies plaatsen. Uw keuze wordt maximaal 180 dagen
            op dit toestel onthouden.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => kies("accepted")}
          className="flex-1 px-4 py-2.5 bg-[#f4f4f4] border border-black/10 text-[#181818] text-sm font-semibold rounded-[12px] hover:bg-[#e8e8e8] transition-colors"
        >
          Google Maps laden
        </button>
        <button
          type="button"
          onClick={() => kies("refused")}
          className="flex-1 px-4 py-2.5 bg-[#f4f4f4] border border-black/10 text-[#181818] text-sm font-semibold rounded-[12px] hover:bg-[#e8e8e8] transition-colors"
        >
          Nu niet
        </button>
      </div>

      <div className="mt-3 flex gap-3 text-[11px] text-[#9b9b9b]">
        <a href="/cookiebeleid" className="underline hover:text-[#6b6b6b]">Cookiebeleid</a>
        <a href="/privacybeleid" className="underline hover:text-[#6b6b6b]">Privacybeleid</a>
      </div>
    </div>
  );
}
