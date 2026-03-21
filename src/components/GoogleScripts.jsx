import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookie } from '@/context/CookieContext';
import { isAdRenderingAllowed } from '@/lib/sitePolicy';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-4653533937550770';
const ENABLE_ADSENSE = import.meta.env.VITE_ENABLE_ADSENSE === 'true';

const getGtag = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
  return window.gtag;
};

const removeScriptBySelector = (selector) => {
  const script = document.querySelector(selector);
  if (script) {
    script.remove();
  }
};

const GoogleScripts = () => {
  const { consentGiven, preferences } = useCookie();
  const location = useLocation();

  useEffect(() => {
    const gtag = getGtag();

    // Consent Mode v2 must be initialized before optional scripts are loaded.
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      region: [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
        'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
        'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO',
        'CH', 'GB',
      ],
      wait_for_update: 500,
    });
  }, []);

  useEffect(() => {
    if (!consentGiven) {
      return;
    }

    const gtag = getGtag();
    gtag('consent', 'update', {
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
      analytics_storage: preferences.statistics ? 'granted' : 'denied',
    });

    const analyticsEnabled = preferences.statistics && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';
    const adRenderingAllowed = isAdRenderingAllowed({
      pathname: location.pathname,
      hasMarketingConsent: preferences.marketing,
      isAdSenseEnabled: ENABLE_ADSENSE,
    });

    if (
      analyticsEnabled &&
      !document.querySelector('script[data-ga-script="true"]')
    ) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      gaScript.dataset.gaScript = 'true';
      document.head.appendChild(gaScript);
    }

    if (analyticsEnabled && !window.__freeappkitGaConfigured) {
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
      window.__freeappkitGaConfigured = true;
    }

    if (!analyticsEnabled) {
      removeScriptBySelector('script[data-ga-script="true"]');
      window.__freeappkitGaConfigured = false;
    }

    if (adRenderingAllowed && !document.querySelector('script[data-adsense-script="true"]')) {
      const adSenseScript = document.createElement('script');
      adSenseScript.async = true;
      adSenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      adSenseScript.crossOrigin = 'anonymous';
      adSenseScript.dataset.adsenseScript = 'true';
      document.head.appendChild(adSenseScript);
    }

    if (!adRenderingAllowed) {
      removeScriptBySelector('script[data-adsense-script="true"]');
    }
  }, [consentGiven, preferences, location.pathname]);

  return null;
};

export default GoogleScripts;
