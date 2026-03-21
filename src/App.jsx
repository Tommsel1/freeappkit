import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import ImpressumPage from '@/pages/ImpressumPage';
import PrivacyPage from '@/pages/PrivacyPage';
import AffiliateDisclosurePage from '@/pages/AffiliateDisclosurePage';
import TemplateDetailPage from '@/pages/TemplateDetailPage';
import GuidesPage from '@/pages/GuidesPage';
import GuideDetailPage from '@/pages/GuideDetailPage';
import TermsPage from '@/pages/TermsPage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';
import CookiePreferencesPage from '@/pages/CookiePreferencesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { CookieProvider } from '@/context/CookieContext';
import { LanguageProvider } from '@/context/LanguageContext';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import CookieSettingsModal from '@/components/CookieSettingsModal';
import GoogleScripts from '@/components/GoogleScripts';
import SkipToContentLink from '@/components/SkipToContentLink';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <CookieProvider>
          <SkipToContentLink />
          <ScrollToTop />
          <GoogleScripts />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:slug" element={<GuideDetailPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/cookie-preferences" element={<CookiePreferencesPage />} />
            <Route path="/templates/:slug" element={<TemplateDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
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
