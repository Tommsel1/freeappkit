import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const PrivacyPage = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'overview', title: t('privacyPage.sections.overview') },
    { id: 'controller', title: t('privacyPage.sections.controller') },
    { id: 'collection', title: t('privacyPage.sections.collection') },
    { id: 'cookies', title: t('privacyPage.sections.cookies') },
    { id: 'analytics', title: t('privacyPage.sections.analytics') },
    { id: 'adsense', title: t('privacyPage.sections.adsense') },
    { id: 'hosting', title: '7. Hosting' },
    { id: 'localstorage', title: '8. localStorage' },
    { id: 'rights', title: t('privacyPage.sections.rights') },
    { id: 'supervisory', title: '10. Supervisory Authority' },
    { id: 'retention', title: '11. Data Retention' },
    { id: 'links', title: '12. Third-Party Links' },
    { id: 'changes', title: '13. Changes to This Policy' },
    { id: 'contact', title: '14. Contact' },
  ];

  return (
    <>
      <SeoHead
        title={t('meta.privacy.title')}
        description={t('meta.privacy.description')}
        path="/privacy"
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
              {t('privacyPage.back')}
            </Link>

            <div className="bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                {t('privacyPage.title')}
              </h1>
              <p className="text-gray-400 text-lg mb-2">
                {t('privacyPage.subtitle')}
              </p>
              <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">
                {t('privacyPage.lastUpdated')}
              </p>

              {/* Table of Contents */}
              <div className="bg-white/5 rounded-lg p-6 mb-12 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">{t('privacyPage.toc')}</h2>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-12 text-gray-300">
                
                {/* 1. Overview */}
                <section id="overview" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.overview')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.intro')}
                  </p>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.agreement')}
                  </p>
                </section>

                {/* 2. Data Controller */}
                <section id="controller" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.controller')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.controllerText')}
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-gray-200">
                      <strong>Tom Silas Helmke</strong><br />
                      c/o Online-Impressum #4746<br />
                      Europaring 90<br />
                      53757 Sankt Augustin<br />
                      Germany<br />
                      Email: <a href="mailto:tshfm78@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-300/70">tshfm78@gmail.com</a>
                    </p>
                  </div>
                </section>

                {/* 3. Data We Collect */}
                <section id="collection" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.collection')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.collectionText')}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                      {t('privacyPage.content.logFiles')}
                    </li>
                    <li>
                      {t('privacyPage.content.contactData')}
                    </li>
                  </ul>
                </section>

                {/* 4. Cookies */}
                <section id="cookies" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.cookies')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.cookiesText')}
                  </p>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.cookiesSession')}
                  </p>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.cookiesConfig')}
                  </p>
                </section>

                {/* 5. Google Analytics */}
                <section id="analytics" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.analytics')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.analyticsText')}
                  </p>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.analyticsAnon')}
                  </p>
                  <p className="leading-relaxed">
                    Google Analytics is only activated after explicit consent. The legal basis for processing is
                    Art. 6 Abs. 1 lit. a DSGVO.
                  </p>
                </section>

                {/* 6. Google AdSense */}
                <section id="adsense" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.adsense')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.adsenseText')}
                  </p>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.adsenseInfo')}
                  </p>
                  <p className="leading-relaxed mt-4">
                    We use Google AdSense with publisher ID <strong>ca-pub-4653533937550770</strong>. Ad requests and
                    related processing happen only after consent. Legal basis: Art. 6 Abs. 1 lit. a DSGVO.
                  </p>
                </section>

                {/* 7. Hosting */}
                <section id="hosting" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">7. Hosting</h2>
                  <p className="leading-relaxed mb-4">
                    This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                  </p>
                  <p className="leading-relaxed">
                    Hosting is required for secure and performant operation of the website. Legal basis:
                    Art. 6 Abs. 1 lit. f DSGVO (legitimate interest in stable website operation).
                  </p>
                </section>

                {/* 8. localStorage */}
                <section id="localstorage" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">8. localStorage</h2>
                  <p className="leading-relaxed mb-4">
                    We store your cookie consent status and consent preferences in your browser localStorage to
                    remember your privacy settings.
                  </p>
                  <p className="leading-relaxed">
                    Stored keys include consent status, preference categories and consent version metadata. This data
                    stays on your device unless you clear browser storage.
                  </p>
                </section>

                {/* 9. Your Rights (GDPR) */}
                <section id="rights" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.rights')}</h2>
                  <p className="leading-relaxed mb-4">
                    {t('privacyPage.content.rightsText')}
                  </p>
                  <p className="leading-relaxed mb-4">
                    You have rights under Art. 15-21 DSGVO (access, rectification, erasure, restriction, portability
                    and objection).
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{t('privacyPage.content.rightsList.0')}</li>
                    <li>{t('privacyPage.content.rightsList.1')}</li>
                    <li>{t('privacyPage.content.rightsList.2')}</li>
                    <li>{t('privacyPage.content.rightsList.3')}</li>
                    <li>{t('privacyPage.content.rightsList.4')}</li>
                    <li>{t('privacyPage.content.rightsList.5')}</li>
                  </ul>
                </section>

                {/* 10. Supervisory Authority */}
                <section id="supervisory" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">10. Supervisory Authority</h2>
                  <p className="leading-relaxed">
                    Competent supervisory authority: LDI NRW, Kavalleriestr. 2-4, 40213 Dusseldorf.
                  </p>
                </section>

                {/* 11. Data Retention */}
                <section id="retention" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.retention')}</h2>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.retentionText')}
                  </p>
                </section>

                {/* 12. Third-Party Links */}
                <section id="links" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.links')}</h2>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.linksText')}
                  </p>
                </section>

                {/* 13. Changes to This Policy */}
                <section id="changes" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.changes')}</h2>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.changesText')}
                  </p>
                </section>

                {/* 14. Contact */}
                <section id="contact" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('privacyPage.sections.contact')}</h2>
                  <p className="leading-relaxed">
                    {t('privacyPage.content.contactText')} <a href="mailto:tshfm78@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-300/70">tshfm78@gmail.com</a>.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPage;
