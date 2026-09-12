export interface CookiePreferences {
  analytics: boolean;
  advertising: boolean;
}

export const CONSENT_STORAGE_KEY = "nectarine-cookie-consent";
export const CONSENT_EVENT = "nectarine-consent-change";

export function getStoredPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    // Back-compat with the earlier single Accept/Reject button, which
    // stored the plain string "accepted" or "rejected" instead of an
    // object of preferences.
    if (raw === "accepted") return { analytics: true, advertising: false };
    if (raw === "rejected") return { analytics: false, advertising: false };
    const parsed = JSON.parse(raw);
    // Missing fields (e.g. a choice saved before "advertising" existed)
    // default to false rather than silently opting a visitor in.
    return { analytics: parsed.analytics === true, advertising: parsed.advertising === true };
  } catch {
    return null;
  }
}

export function setStoredPreferences(preferences: CookiePreferences) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Private browsing / blocked storage — the choice just won't persist.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: preferences }));
}
