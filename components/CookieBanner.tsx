"use client";
import { useEffect, useState } from "react";
import { getStoredConsent, setStoredConsent, type ConsentStatus } from "@/lib/cookieConsent";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getStoredConsent() === null) {
      // Small delay so it doesn't pop in during the page-load transition.
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (status: ConsentStatus) => {
    setStoredConsent(status);
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed z-[300] inset-x-5 bottom-5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[380px] transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
    >
      <div className="bg-[#fcf8f3] border border-[#380102]/15 rounded-[16px] shadow-[0_10px_40px_rgba(56,1,2,0.18)] p-5 flex flex-col gap-4">
        <p className="font-aleo text-[14px] leading-[1.5] text-[#380102]">
          We use cookies to keep this site running smoothly and to see how visitors find us. You can accept or reject them.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="flex-1 font-bel uppercase text-[12px] bg-[#380102] text-[#f9ce6a] rounded-full px-[20px] py-[11px] transition-colors duration-200 hover:bg-[#d7432a]"
            style={{ letterSpacing: "0.08em" }}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="flex-1 font-bel uppercase text-[12px] border border-[#380102] text-[#380102] rounded-full px-[20px] py-[11px] transition-colors duration-200 hover:bg-[#380102] hover:text-[#f9ce6a]"
            style={{ letterSpacing: "0.08em" }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
