import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const ImpressumPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <SeoHead
        title={t('meta.impressum.title')}
        description={t('meta.impressum.description')}
        path="/impressum"
      />

      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <Header />

        <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('impressum.back')}
            </Link>

            <div className="bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                {t('impressum.title')}
              </h1>
              <p className="text-gray-400 text-lg mb-8 pb-8 border-b border-white/10">
                {t('impressum.legalNotice')}
              </p>

              <div className="space-y-8 text-gray-300">
                <section>
                  <h2 className="text-xl font-semibold text-white mb-4">{t('impressum.section1Title')}</h2>
                  <p className="leading-relaxed">
                    Tom Silas Helmke<br />
                    c/o Online-Impressum.de #4746<br />
                    Europaring 90<br />
                    53757 Sankt Augustin<br />
                    Germany
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-white mb-4">{t('impressum.section2Title')}</h2>
                  <p className="leading-relaxed">
                    E-Mail: <a href="mailto:tshfm78@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">tshfm78@gmail.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-white mb-4">{t('impressum.section3Title')}</h2>
                  <p className="leading-relaxed">
                    Tom Silas Helmke<br />
                    c/o Online-Impressum.de #4746<br />
                    Europaring 90<br />
                    53757 Sankt Augustin
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-white mb-4">{t('impressum.section4Title')}</h2>
                  <p className="leading-relaxed">
                    {t('impressum.section4Text')}{' '}
                    <a 
                      href="https://ec.europa.eu/consumers/odr/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1"
                    >
                      https://ec.europa.eu/consumers/odr/
                    </a>.<br />
                    {t('impressum.section4LinkText')}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-white mb-4">{t('impressum.section5Title')}</h2>
                  <p className="leading-relaxed">
                    {t('impressum.section5Text')}
                  </p>
                </section>
                
                <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-500">
                  <p>{t('impressum.lastUpdated')}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImpressumPage;
