import { SlidersHorizontal } from "lucide-react";
import { openConsentBanner } from "../lib/cookieConsent";

// Klein interactief eilandje: heropent de cookiebanner.
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFC107] text-[#181818] font-semibold rounded-[18px] hover:bg-[#FFD54F] transition-colors"
    >
      <SlidersHorizontal className="w-4 h-4" />
      Cookievoorkeuren openen
    </button>
  );
}
