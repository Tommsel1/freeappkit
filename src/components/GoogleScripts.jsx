import React, { useEffect } from 'react';
import { useCookie } from '@/context/CookieContext';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const ADSENSE_CLIENT = 'ca-pub-4653533937550770';

const getGtag = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
  return window.gtag;
};

const GoogleScripts = () => {
  const { consentGiven, preferences } = useCookie();

  useEffect(() => {
    const gtag = getGtag();

    // Consent Mode v2 must be initialized before optional scripts are loaded.
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });
  }, []);

  useEffect(() => {
    if (!consentGiven) {
      return;
    }

    const gtag = getGtag();
    gtag('consent', 'update', {
      ad_storage: preferences.ads ? 'granted' : 'denied',
      ad_user_data: preferences.ads ? 'granted' : 'denied',
      ad_personalization: preferences.ads ? 'granted' : 'denied',
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
    });

    if (
      preferences.analytics &&
      GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
      !document.querySelector('script[data-ga-script="true"]')
    ) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      gaScript.dataset.gaScript = 'true';
      document.head.appendChild(gaScript);

      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
    }

    if (preferences.ads && !document.querySelector('script[data-adsense-script="true"]')) {
      const adSenseScript = document.createElement('script');
      adSenseScript.async = true;
      adSenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      adSenseScript.crossOrigin = 'anonymous';
      adSenseScript.dataset.adsenseScript = 'true';
      document.head.appendChild(adSenseScript);
    }
  }, [consentGiven, preferences]);

  return null;
};

export default GoogleScripts;
