import { useEffect, useState } from "react";
import { MapPin, Play } from "lucide-react";
import {
  readConsent,
  writeConsent,
  openConsentBanner,
  CONSENT_CHANGED,
} from "../lib/cookieConsent";

// Interactief eilandje op de contactpagina: de Google Maps-kaart volgt de
// keuze uit de cookiebanner. Zolang de bezoeker niets toegestaan heeft, gaat
// er geen enkel verzoek naar Google.
export default function ContactMap() {
  const [kaartGeladen, setKaartGeladen] = useState(false);
  const [geweigerd, setGeweigerd] = useState(false);

  useEffect(() => {
    const sync = () => {
      const keuze = readConsent();
      setKaartGeladen(keuze === "accepted");
      setGeweigerd(keuze === "refused");
    };
    sync();
    window.addEventListener(CONSENT_CHANGED, sync);
    return () => window.removeEventListener(CONSENT_CHANGED, sync);
  }, []);

  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-black/5 shadow-sm">
      <div className="p-4 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FFC107]" />
          <span className="text-sm font-semibold text-[#181818]">Bornem, Antwerpen</span>
        </div>
        <a
          href="https://maps.google.com/?q=Bornem,Belgium"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#6b6b6b] hover:text-[#181818] transition-colors"
        >
          Open in Google Maps →
        </a>
      </div>
      {kaartGeladen ? (
        <iframe
          title="Bornem op Google Maps"
          src="https://maps.google.com/maps?q=Bornem,Belgium&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-56 border-0"
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-56 bg-[#f4f4f4] overflow-hidden">
          {/* Decoratief stratenpatroon — puur CSS, geen externe verzoeken. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "linear-gradient(#e2e2e2 1px, transparent 1px), linear-gradient(90deg, #e2e2e2 1px, transparent 1px), linear-gradient(115deg, transparent 47%, #dcdcdc 47%, #dcdcdc 53%, transparent 53%)",
              backgroundSize: "28px 28px, 28px 28px, 100% 100%",
            }}
          />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 gap-3">
            <MapPin className="w-6 h-6 text-[#FFC107]" />
            <p className="text-xs text-[#6b6b6b] max-w-xs leading-relaxed">
              De kaart komt van Google. Bij het laden ontvangt Google uw IP-adres en
              technische browsergegevens en kan het cookies plaatsen. Meer hierover in ons{" "}
              <a href="/cookiebeleid" className="underline hover:text-[#181818]">
                cookiebeleid
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => writeConsent("accepted")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFC107] text-[#181818] text-sm font-bold rounded-[12px] hover:bg-[#FFD54F] transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              Google Maps laden
            </button>
            {geweigerd && (
              <button
                type="button"
                onClick={openConsentBanner}
                className="text-[11px] text-[#9b9b9b] underline hover:text-[#6b6b6b] transition-colors"
              >
                Cookievoorkeuren wijzigen
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
