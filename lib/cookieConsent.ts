export type ConsentStatus = "accepted" | "rejected";

export const CONSENT_STORAGE_KEY = "nectarine-cookie-consent";
export const CONSENT_EVENT = "nectarine-consent-change";

export function getStoredConsent(): ConsentStatus | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(status: ConsentStatus) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Private browsing / blocked storage — the choice just won't persist.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}
