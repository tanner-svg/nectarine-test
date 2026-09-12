"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { getStoredPreferences, CONSENT_EVENT } from "@/lib/cookieConsent";

const GA_MEASUREMENT_ID = "G-V3LK17ZGFC";
const ADS_CONVERSION_ID = "AW-18414948107";

/**
 * Loads Google's gtag.js at most once, then configures whichever
 * product(s) the visitor has consented to. Google Analytics needs the
 * "Analytics" preference; Google Ads conversion tracking needs
 * "Advertising". Re-syncs whenever the cookie banner changes the choice
 * (CONSENT_EVENT), no page reload required.
 */
export default function GoogleTags() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const prefs = getStoredPreferences();
      setAnalyticsEnabled(prefs?.analytics === true);
      setAdvertisingEnabled(prefs?.advertising === true);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!analyticsEnabled && !advertisingEnabled) return null;

  // Either ID works as the loader — gtag.js itself doesn't differ per ID,
  // only the gtag('config', ...) calls below do. Loading it twice (once
  // per ID) would violate Google's own "only one Google tag per page"
  // guidance, so whichever product is enabled shares this single load.
  const loaderId = analyticsEnabled ? GA_MEASUREMENT_ID : ADS_CONVERSION_ID;

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`} strategy="afterInteractive" />
      <Script id="google-tag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${analyticsEnabled ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
          ${advertisingEnabled ? `gtag('config', '${ADS_CONVERSION_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
