import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useCookie } from '@/context/CookieContext';
import { useLanguage } from '@/context/LanguageContext';

const CookiePreferencesPage = () => {
  const { openModal } = useCookie();
  const { t } = useLanguage();

  useEffect(() => {
    openModal();
    // The page serves as a direct entry point to the preferences dialog.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <SeoHead
        title={t('meta.cookiePreferences.title')}
        description={t('meta.cookiePreferences.description')}
        path="/cookie-preferences"
        noindex
      />

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            {t('cookiePreferencesPage.title')}
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {t('cookiePreferencesPage.intro')}
          </p>
          <button
            type="button"
            onClick={(event) => openModal(event.currentTarget)}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12121a]"
          >
            {t('cookiePreferencesPage.openButton')}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePreferencesPage;
