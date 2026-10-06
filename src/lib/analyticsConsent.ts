// Separate consent: an old Maps choice never authorizes analytics.
export const ANALYTICS_KEY = "taxibornem-analytics-consent-v1";
export const ANALYTICS_CHANGED = "analyticsconsent:changed";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
let session: { allowed: boolean; expiresAt: number } | null = null;

export function readAnalyticsConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ANALYTICS_KEY);
    const value = raw ? JSON.parse(raw) : session;
    return value && typeof value.allowed === "boolean" &&
      typeof value.expiresAt === "number" && value.expiresAt > Date.now()
      ? value.allowed : null;
  } catch {
    return session && session.expiresAt > Date.now() ? session.allowed : null;
  }
}

export function writeAnalyticsConsent(allowed: boolean): void {
  session = { allowed, expiresAt: Date.now() + MAX_AGE };
  try {
    window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(session));
    session = null;
  } catch { /* session only */ }
  window.dispatchEvent(new Event(ANALYTICS_CHANGED));
}
