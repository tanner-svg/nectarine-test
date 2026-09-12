declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

/**
 * Sends a custom event to Google Analytics. A no-op whenever GA hasn't
 * loaded — before a visitor accepts the Analytics cookie preference, or if
 * they never do — so every call site can fire-and-forget without its own
 * consent check.
 */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
