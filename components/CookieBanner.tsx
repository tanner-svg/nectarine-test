"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nectarine-cookie-consent";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    let seenBefore = true;
    try {
      seenBefore = !!localStorage.getItem(STORAGE_KEY);
    } catch {
      seenBefore = false;
    }
    if (!seenBefore) {
      // Small delay so it doesn't pop in during the page-load transition.
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "acknowledged");
    } catch {
      // Private browsing / blocked storage — banner just won't persist dismissal.
    }
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed z-[300] inset-x-5 bottom-5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[360px] transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
    >
      <div className="bg-[#fcf8f3] border border-[#380102]/15 rounded-[16px] shadow-[0_10px_40px_rgba(56,1,2,0.18)] p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <p className="font-aleo text-[14px] leading-[1.5] text-[#380102] flex-1">
          We use cookies to keep this site running smoothly and to see how visitors find us.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="font-bel uppercase text-[12px] bg-[#380102] text-[#f9ce6a] rounded-full px-[20px] py-[11px] w-full sm:w-auto shrink-0 transition-colors duration-200 hover:bg-[#d7432a]"
          style={{ letterSpacing: "0.08em" }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
