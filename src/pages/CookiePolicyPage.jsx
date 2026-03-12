import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const CookiePolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <SeoHead
        title={t('meta.cookiePolicy.title')}
        description={t('meta.cookiePolicy.description')}
        path="/cookie-policy"
        noindex
      />

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            {t('cookiePolicyPage.title')}
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {t('cookiePolicyPage.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
            <li>{t('cookiePolicyPage.items.0')}</li>
            <li>{t('cookiePolicyPage.items.1')}</li>
            <li>{t('cookiePolicyPage.items.2')}</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link to="/privacy#cookies" className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-cyan-400 hover:text-cyan-300 transition-colors">
              {t('cookiePolicyPage.actions.privacy')}
            </Link>
            <Link to="/cookie-preferences" className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-cyan-400 hover:text-cyan-300 transition-colors">
              {t('cookiePolicyPage.actions.preferences')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
