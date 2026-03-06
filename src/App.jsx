import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import LegalPage from '@/pages/LegalPage';
import ImpressumPage from '@/pages/ImpressumPage';
import PrivacyPage from '@/pages/PrivacyPage';
import AffiliateDisclosurePage from '@/pages/AffiliateDisclosurePage';
import TemplateDetailPage from '@/pages/TemplateDetailPage';
import { CookieProvider } from '@/context/CookieContext';
import { LanguageProvider } from '@/context/LanguageContext';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import CookieSettingsModal from '@/components/CookieSettingsModal';
import GoogleScripts from '@/components/GoogleScripts';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <CookieProvider>
          <ScrollToTop />
          <GoogleScripts />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/templates/:slug" element={<TemplateDetailPage />} />
          </Routes>
          <CookieConsentBanner />
          <CookieSettingsModal />
          <Toaster />
        </CookieProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
