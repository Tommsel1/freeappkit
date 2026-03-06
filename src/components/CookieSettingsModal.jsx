import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart, MonitorPlay } from 'lucide-react';
import { useCookie } from '@/context/CookieContext';
import ToggleSwitch from '@/components/ToggleSwitch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const CookieSettingsModal = () => {
  const { isModalOpen, closeModal, preferences, savePreferences, acceptAll, rejectAll } = useCookie();
  const [localPrefs, setLocalPrefs] = useState(preferences);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Sync local state when modal opens or preferences change
  useEffect(() => {
    if (isModalOpen) {
      setLocalPrefs(preferences);
    }
  }, [isModalOpen, preferences]);

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
    setLocalPrefs({ essential: true, analytics: true, ads: true });
  };

  const handleRejectAll = () => {
    setLocalPrefs({ essential: true, analytics: false, ads: false });
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#12121a]/95 backdrop-blur-xl border border-white/10 w-full max-w-[500px] rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{t('cookieModal.title')}</h2>
                  <p className="text-gray-400 text-sm">{t('cookieModal.subtitle')}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
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
                      <h3 className="font-semibold text-white">{t('cookieModal.essential.title')}</h3>
                      <ToggleSwitch checked={true} disabled={true} />
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
                      <h3 className="font-semibold text-white">{t('cookieModal.analytics.title')}</h3>
                      <ToggleSwitch 
                        checked={localPrefs.analytics} 
                        onChange={() => handleToggle('analytics')} 
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
                      <h3 className="font-semibold text-white">{t('cookieModal.ads.title')}</h3>
                      <ToggleSwitch 
                        checked={localPrefs.ads} 
                        onChange={() => handleToggle('ads')} 
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
                  onClick={handleRejectAll}
                  className="text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline order-3 sm:order-1"
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