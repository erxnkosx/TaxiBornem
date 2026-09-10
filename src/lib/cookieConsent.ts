/**
 * Toestemming voor externe inhoud (op dit moment enkel de Google Maps-kaart
 * op de contactpagina).
 *
 * De keuze zelf bewaren we in localStorage, niet in een cookie. Dat mag
 * zonder toestemming: het is strikt noodzakelijk om de keuze van de bezoeker
 * te kunnen respecteren. Zolang er geen keuze is, wordt er niets van Google
 * geladen.
 */

const KEY = "taxibornem-cookieconsent";

export type Consent = "accepted" | "refused";

/** Naam van het window-event dat afgaat zodra de keuze wijzigt. */
export const CONSENT_CHANGED = "cookieconsent:changed";

/** Naam van het window-event dat de banner opnieuw opent. */
export const CONSENT_OPEN = "cookieconsent:open";

/** Huidige keuze, of null als de bezoeker nog niets gekozen heeft. */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "refused" ? v : null;
  } catch {
    // Privémodus of storage geblokkeerd: dan behandelen we het als "nog niets
    // gekozen" en laden we niets. Veiligste kant.
    return null;
  }
}

/** Keuze bewaren en de rest van de pagina verwittigen. */
export function writeConsent(consent: Consent): void {
  try {
    window.localStorage.setItem(KEY, consent);
  } catch {
    // Niets kunnen bewaren is niet fataal: de keuze geldt dan voor dit bezoek.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: consent }));
}

/** Keuze wissen, zodat de banner opnieuw verschijnt. */
export function clearConsent(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* stil */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: null }));
}

/** Vraagt de banner om zich opnieuw te tonen. */
export function openConsentBanner(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN));
}