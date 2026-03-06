import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const LegalPage = () => {
  const location = useLocation();
  const isImpressum = location.pathname === '/impressum';
  const { t } = useLanguage();
  
  // Note: This page seems redundant with ImpressumPage and PrivacyPage, but keeping it for completeness based on existing file list.
  // Assuming this page handles generic legal info if routed here, but main routes use specific pages.
  // Updating text to use translations anyway.
  
  const title = isImpressum ? t('impressum.title') : t('privacy.title');

  return (
    <>
      <SeoHead
        title={`${title} - FreeAppKit`}
        description={t('meta.legal.description')}
        path="/legal"
      />
      
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              {title}
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
              <p>
                {isImpressum 
                  ? t('impressum.legalNotice') 
                  : t('privacy.content.intro')}
              </p>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-2">{t('legalPage.disclaimerTitle')}</h3>
                <p className="text-sm text-gray-400">
                  {t('legalPage.disclaimerText')}
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                  {isImpressum ? t('legalPage.contactInfo') : t('legalPage.dataCollection')}
                </h2>
                <p>
                  {t('legalPage.placeholderText')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                  {isImpressum ? t('legalPage.responsibility') : t('legalPage.cookies')}
                </h2>
                <p>
                  {t('legalPage.placeholderText2')}
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LegalPage;
