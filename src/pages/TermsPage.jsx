import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <SeoHead
        title={t('meta.terms.title')}
        description={t('meta.terms.description')}
        path="/terms"
        noindex
      />

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            {t('termsPage.title')}
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {t('termsPage.intro')}
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {t('termsPage.scopeNote')}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><Link to="/impressum" className="text-cyan-400 hover:text-cyan-300 underline">{t('termsPage.links.impressum')}</Link></li>
            <li><Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">{t('termsPage.links.privacy')}</Link></li>
            <li><Link to="/affiliate-disclosure" className="text-cyan-400 hover:text-cyan-300 underline">{t('termsPage.links.affiliate')}</Link></li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
