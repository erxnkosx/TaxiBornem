/**
 * Toestemming voor externe inhoud (op dit moment enkel de Google Maps-kaart
 * op de contactpagina).
 *
 * De keuze bewaren we maximaal 180 dagen in localStorage, niet in een cookie.
 * Zo kunnen we de keuze respecteren zonder de Google-kaart voor die bezoeker
 * opnieuw te laden. Zolang er geen geldige keuze is, wordt niets van Google
 * geladen.
 */

const KEY = "taxibornem-cookieconsent";
const GELDIGHEID_MS = 180 * 24 * 60 * 60 * 1000;

export type Consent = "accepted" | "refused";

/** Naam van het window-event dat afgaat zodra de keuze wijzigt. */
export const CONSENT_CHANGED = "cookieconsent:changed";

/** Naam van het window-event dat de banner opnieuw opent. */
export const CONSENT_OPEN = "cookieconsent:open";

/** Huidige keuze, of null als de bezoeker nog niets gekozen heeft. */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;

    // Verwijder ook oude, niet-verlopende waarden zodat de bezoeker opnieuw
    // een actuele keuze kan maken.
    let saved: { consent?: unknown; expiresAt?: unknown };
    try {
      saved = JSON.parse(raw);
    } catch {
      window.localStorage.removeItem(KEY);
      return null;
    }
    const geldig =
      (saved.consent === "accepted" || saved.consent === "refused") &&
      typeof saved.expiresAt === "number" &&
      saved.expiresAt > Date.now();

    if (!geldig) {
      window.localStorage.removeItem(KEY);
      return null;
    }

    return saved.consent as Consent;
  } catch {
    // Privémodus of storage geblokkeerd: dan behandelen we het als "nog niets
    // gekozen" en laden we niets. Veiligste kant.
    return null;
  }
}

/** Keuze bewaren en de rest van de pagina verwittigen. */
export function writeConsent(consent: Consent): void {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ consent, expiresAt: Date.now() + GELDIGHEID_MS }),
    );
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
