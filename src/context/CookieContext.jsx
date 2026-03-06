import React, { createContext, useContext, useState, useEffect } from 'react';

const CookieContext = createContext();

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    ads: false,
  });
  
  const [consentGiven, setConsentGiven] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const storedConsent = localStorage.getItem('cookieConsent');
    const storedPreferences = localStorage.getItem('cookiePreferences');

    if (storedConsent) {
      setConsentGiven(true);
    }

    if (storedPreferences) {
      try {
        setPreferences(JSON.parse(storedPreferences));
      } catch (e) {
        console.error('Failed to parse cookie preferences', e);
      }
    }
  }, []);

  const savePreferences = (newPreferences) => {
    const prefs = { ...newPreferences, essential: true }; // Always ensure essential is true
    setPreferences(prefs);
    setConsentGiven(true);
    
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    setIsModalOpen(false);
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      ads: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      essential: true,
      analytics: false,
      ads: false,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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