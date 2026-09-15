"use client";
import { useEffect, useState } from "react";
import { getStoredPreferences, setStoredPreferences, OPEN_PREFERENCES_EVENT } from "@/lib/cookieConsent";

function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`shrink-0 w-[42px] h-[24px] rounded-full relative transition-colors duration-200 ${
        checked ? "bg-[#d7432a]" : "bg-[#380102]/20"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-[#fcf8f3] transition-transform duration-200 ${
          checked ? "translate-x-[21px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<"banner" | "preferences">("banner");
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [advertisingChecked, setAdvertisingChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getStoredPreferences() === null) {
      // Small delay so it doesn't pop in during the page-load transition.
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    setStoredPreferences({ analytics: true, advertising: true });
    setVisible(false);
  };

  const openPreferences = () => {
    const current = getStoredPreferences();
    setAnalyticsChecked(current?.analytics ?? false);
    setAdvertisingChecked(current?.advertising ?? false);
    setView("preferences");
    setVisible(true);
  };

  const savePreferences = () => {
    setStoredPreferences({ analytics: analyticsChecked, advertising: advertisingChecked });
    setVisible(false);
  };

  // Lets a "Cookie Preferences" link elsewhere on the site (e.g. the
  // footer) reopen this panel after a visitor has already made a choice.
  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed z-[300] inset-x-5 bottom-5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[400px] transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
    >
      <div className="bg-[#fcf8f3] border border-[#380102]/15 rounded-[16px] shadow-[0_10px_40px_rgba(56,1,2,0.18)] p-5 flex flex-col gap-4">
        {view === "banner" ? (
          <>
            <p className="font-aleo text-[14px] leading-[1.5] text-[#380102]">
              We use cookies to keep this site running smoothly, see how visitors find us, and measure our ads. You can accept them or choose your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 font-bel uppercase text-[12px] bg-[#380102] text-[#f9ce6a] rounded-full px-[20px] py-[11px] transition-colors duration-200 hover:bg-[#d7432a]"
                style={{ letterSpacing: "0.08em" }}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="flex-1 font-bel uppercase text-[12px] border border-[#380102] text-[#380102] rounded-full px-[20px] py-[11px] transition-colors duration-200 hover:bg-[#380102] hover:text-[#f9ce6a]"
                style={{ letterSpacing: "0.08em" }}
              >
                Preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bel text-[12px] uppercase text-[#380102]" style={{ letterSpacing: "0.08em" }}>
                    Necessary
                  </p>
                  <p className="font-aleo text-[13px] leading-[1.4] text-[#380102] opacity-70 mt-[4px]">
                    Required for the site to work — like remembering this choice.
                  </p>
                </div>
                <Toggle checked disabled />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bel text-[12px] uppercase text-[#380102]" style={{ letterSpacing: "0.08em" }}>
                    Analytics
                  </p>
                  <p className="font-aleo text-[13px] leading-[1.4] text-[#380102] opacity-70 mt-[4px]">
                    Google Analytics — helps us see how visitors find and use the site.
                  </p>
                </div>
                <Toggle checked={analyticsChecked} onChange={() => setAnalyticsChecked((v) => !v)} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bel text-[12px] uppercase text-[#380102]" style={{ letterSpacing: "0.08em" }}>
                    Advertising
                  </p>
                  <p className="font-aleo text-[13px] leading-[1.4] text-[#380102] opacity-70 mt-[4px]">
                    Google Ads — helps us measure how well our ads lead to inquiries.
                  </p>
                </div>
                <Toggle checked={advertisingChecked} onChange={() => setAdvertisingChecked((v) => !v)} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={savePreferences}
                className="flex-1 font-bel uppercase text-[12px] bg-[#380102] text-[#f9ce6a] rounded-full px-[20px] py-[11px] transition-colors duration-200 hover:bg-[#d7432a]"
                style={{ letterSpacing: "0.08em" }}
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => setView("banner")}
                className="font-bel uppercase text-[12px] text-[#380102] px-[10px] py-[11px] underline hover:text-[#d7432a] transition-colors duration-200"
                style={{ letterSpacing: "0.08em" }}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
