import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCookie } from '@/context/CookieContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const CookieConsentBanner = () => {
  const { consentGiven, acceptAll, rejectAll, openModal } = useCookie();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {!consentGiven && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          role="region"
          aria-label={t('cookieBanner.title')}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#12121a]/90 backdrop-blur-md border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Left Side: Content */}
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 text-2xl flex-shrink-0">
                  🍪
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    <span className="sm:hidden">🍪</span>
                    {t('cookieBanner.title')}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t('cookieBanner.description')}{" "}
                    <Link to="/cookie-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/30">
                      {t('cookieBanner.learnMore')}
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                 <button
                  type="button"
                  onClick={(event) => openModal(event.currentTarget)}
                  className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 transition-colors order-3 md:order-1 ml-auto md:ml-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12121a]"
                >
                  {t('cookieBanner.customize')}
                </button>
                <Button 
                  onClick={rejectAll}
                  variant="outline"
                  className="flex-1 md:flex-none border-white/10 text-gray-300 hover:bg-white/5 hover:text-white order-2"
                >
                  {t('cookieBanner.rejectAll')}
                </Button>
                <Button 
                  onClick={acceptAll}
                  className="flex-1 md:flex-none bg-cyan-500 hover:bg-cyan-600 text-white border-0 order-1 md:order-3"
                >
                  {t('cookieBanner.acceptAll')}
                </Button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
