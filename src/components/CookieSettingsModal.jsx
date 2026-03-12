import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart, MonitorPlay } from 'lucide-react';
import { useCookie } from '@/context/CookieContext';
import ToggleSwitch from '@/components/ToggleSwitch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const CookieSettingsModal = () => {
  const { isModalOpen, closeModal, preferences, savePreferences } = useCookie();
  const [localPrefs, setLocalPrefs] = useState(preferences);
  const { toast } = useToast();
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const titleId = 'cookie-settings-title';
  const subtitleId = 'cookie-settings-subtitle';

  // Sync local state when modal opens or preferences change
  useEffect(() => {
    if (isModalOpen) {
      setLocalPrefs(preferences);
    }
  }, [isModalOpen, preferences]);

  useEffect(() => {
    if (!isModalOpen || !dialogRef.current) {
      return undefined;
    }

    const dialogElement = dialogRef.current;
    const getFocusableElements = () =>
      Array.from(
        dialogElement.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const currentFocusable = getFocusableElements();
      if (currentFocusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusable = currentFocusable[0];
      const lastFocusable = currentFocusable[currentFocusable.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    dialogElement.addEventListener('keydown', handleKeyDown);
    return () => {
      dialogElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  const handleToggle = (key) => {
    setLocalPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    savePreferences(localPrefs);
    toast({
      title: t('cookieModal.toast.title'),
      description: t('cookieModal.toast.description'),
      duration: 3000,
    });
  };

  const handleAcceptAll = () => {
    setLocalPrefs({ necessary: true, statistics: true, marketing: true });
  };

  const handleRejectAll = () => {
    setLocalPrefs({ necessary: true, statistics: false, marketing: false });
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            aria-hidden="true"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={subtitleId}
              className="bg-[#12121a]/95 backdrop-blur-xl border border-white/10 w-full max-w-[500px] rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-white/10">
                <div>
                  <h2 id={titleId} className="text-xl font-bold text-white mb-1">{t('cookieModal.title')}</h2>
                  <p id={subtitleId} className="text-gray-400 text-sm">{t('cookieModal.subtitle')}</p>
                </div>
                <button 
                  type="button"
                  onClick={closeModal}
                  aria-label={t('header.close')}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12121a]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Essential */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-1">
                    <Shield size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 id="cookie-essential-title" className="font-semibold text-white">{t('cookieModal.essential.title')}</h3>
                      <ToggleSwitch checked={true} disabled={true} labelledBy="cookie-essential-title" />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('cookieModal.essential.description')}
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-400 mt-1">
                    <BarChart size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 id="cookie-statistics-title" className="font-semibold text-white">{t('cookieModal.analytics.title')}</h3>
                      <ToggleSwitch 
                        checked={localPrefs.statistics}
                        onChange={() => handleToggle('statistics')}
                        labelledBy="cookie-statistics-title"
                      />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('cookieModal.analytics.description')}
                    </p>
                  </div>
                </div>

                {/* Ads */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mt-1">
                    <MonitorPlay size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 id="cookie-marketing-title" className="font-semibold text-white">{t('cookieModal.ads.title')}</h3>
                      <ToggleSwitch 
                        checked={localPrefs.marketing}
                        onChange={() => handleToggle('marketing')}
                        labelledBy="cookie-marketing-title"
                      />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('cookieModal.ads.description')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer Buttons */}
              <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0a0a0f]/50 rounded-b-2xl">
                <button 
                  type="button"
                  onClick={handleRejectAll}
                  className="text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline order-3 sm:order-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12121a]"
                >
                  {t('cookieModal.rejectAll')}
                </button>
                <div className="flex w-full sm:w-auto gap-3 order-1 sm:order-2">
                   <Button 
                    variant="secondary" 
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white border-0"
                  >
                    {t('cookieModal.acceptAll')}
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="flex-1 sm:flex-none bg-cyan-500 hover:bg-cyan-600 text-white border-0"
                  >
                    {t('cookieModal.save')}
                  </Button>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieSettingsModal;
