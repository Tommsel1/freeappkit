import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CookieContext = createContext();
const CONSENT_STORAGE_KEY = 'freeappkit-cookie-consent';
const PREFS_STORAGE_KEY = 'freeappkit-cookie-preferences';
const LEGACY_CONSENT_STORAGE_KEY = 'cookieConsent';
const LEGACY_PREFS_STORAGE_KEY = 'cookiePreferences';
const CONSENT_VERSION = '2026-03-12';
const DEFAULT_PREFERENCES = {
  necessary: true,
  statistics: false,
  marketing: false,
};

const normalizePreferences = (value) => {
  if (!value || typeof value !== 'object') {
    return { ...DEFAULT_PREFERENCES };
  }

  const nextPreferences = {
    ...DEFAULT_PREFERENCES,
  };

  if (typeof value.necessary === 'boolean') {
    nextPreferences.necessary = value.necessary;
  }
  if (typeof value.statistics === 'boolean') {
    nextPreferences.statistics = value.statistics;
  }
  if (typeof value.marketing === 'boolean') {
    nextPreferences.marketing = value.marketing;
  }

  // Backward compatibility with legacy key names.
  if (typeof value.essential === 'boolean') {
    nextPreferences.necessary = value.essential;
  }
  if (typeof value.analytics === 'boolean') {
    nextPreferences.statistics = value.analytics;
  }
  if (typeof value.ads === 'boolean') {
    nextPreferences.marketing = value.ads;
  }

  nextPreferences.necessary = true;
  return nextPreferences;
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  
  const [consentGiven, setConsentGiven] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastTriggerRef = useRef(null);

  const persistConsent = (prefs) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
    localStorage.setItem('freeappkit-cookie-consent-version', CONSENT_VERSION);
    localStorage.setItem('freeappkit-cookie-consent-updated-at', new Date().toISOString());
  };

  const restoreFocus = () => {
    const focusTarget = lastTriggerRef.current;
    if (focusTarget && typeof focusTarget.focus === 'function' && focusTarget.isConnected) {
      window.requestAnimationFrame(() => {
        focusTarget.focus();
      });
    }
  };

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY) || localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
    const storedPreferences = localStorage.getItem(PREFS_STORAGE_KEY) || localStorage.getItem(LEGACY_PREFS_STORAGE_KEY);

    if (storedConsent) {
      setConsentGiven(true);
    }

    if (storedPreferences) {
      try {
        const normalized = normalizePreferences(JSON.parse(storedPreferences));
        setPreferences(normalized);

        // Persist migrated storage shape.
        if (!localStorage.getItem(PREFS_STORAGE_KEY)) {
          persistConsent(normalized);
        }
      } catch (e) {
        console.error('Failed to parse cookie preferences', e);
      }
    }
  }, []);

  const savePreferences = (newPreferences) => {
    const prefs = normalizePreferences(newPreferences);
    setPreferences(prefs);
    setConsentGiven(true);
    
    persistConsent(prefs);
    setIsModalOpen(false);
    restoreFocus();
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      statistics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      statistics: false,
      marketing: false,
    });
  };

  const openModal = (triggerElement = null) => {
    lastTriggerRef.current = triggerElement || document.activeElement || null;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    restoreFocus();
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        consentGiven,
        isModalOpen,
        openModal,
        closeModal,
        savePreferences,
        acceptAll,
        rejectAll,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
