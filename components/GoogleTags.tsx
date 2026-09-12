"use client";
import Script from "next/script";
import { useEffect } from "react";
import { getStoredPreferences, CONSENT_EVENT, type CookiePreferences } from "@/lib/cookieConsent";

const GA_MEASUREMENT_ID = "G-V3LK17ZGFC";
const ADS_CONVERSION_ID = "AW-18414948107";

function consentSignals(prefs: CookiePreferences | null) {
  const analyticsGranted = prefs?.analytics === true ? "granted" : "denied";
  const advertisingGranted = prefs?.advertising === true ? "granted" : "denied";
  return {
    analytics_storage: analyticsGranted,
    ad_storage: advertisingGranted,
    ad_user_data: advertisingGranted,
    ad_personalization: advertisingGranted,
  };
}

/**
 * Installs Google's tag (gtag.js) using Google Consent Mode: the tag
 * loads and fires on every page load, every visit, regardless of the
 * cookie banner — that's what lets Google Analytics/Ads detect it and
 * do basic modeling. What changes based on the visitor's cookie choice
 * is the *consent signal* sent alongside it, which tells Google whether
 * it's allowed to use cookies / full tracking (granted) or must fall
 * back to limited, cookieless pings (denied). Loading the tag itself
 * conditionally (the earlier approach here) is why GA reported "tag not
 * detected" — an automated check doesn't click the cookie banner.
 */
export default function GoogleTags() {
  useEffect(() => {
    const sync = () => {
      if (typeof window.gtag !== "function") return;
      window.gtag("consent", "update", consentSignals(getStoredPreferences()));
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const defaultConsent = consentSignals(null);

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-tag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', ${JSON.stringify(defaultConsent)});
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
          gtag('config', '${ADS_CONVERSION_ID}');
        `}
      </Script>
    </>
  );
}
