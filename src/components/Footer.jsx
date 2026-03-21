import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCookie } from '@/context/CookieContext';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { openModal } = useCookie();
  const { t } = useLanguage();

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCookieSettings = (event) => {
    openModal(event.currentTarget);
  };

  const handleSubmitTemplate = (e) => {
    e.preventDefault();
    toast({
      title: t('toast.comingSoon.title'),
      description: t('toast.comingSoon.description'),
      duration: 3000,
    });
  };

  return (
    <footer className="bg-[#05050a] border-t border-white/[0.08] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMN 1 - Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent inline-block">
              FreeAppKit
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* COLUMN 2 - Templates */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">{t('footer.columns.templates')}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#templates" 
                  onClick={(e) => handleSmoothScroll(e, '#templates')}
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.allTemplates')}
                </a>
              </li>
              <li>
                <Link 
                  to="/about"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.faq')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/how-it-works"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.howItWorks')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleSubmitTemplate}
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm text-left"
                >
                  {t('footer.links.submitTemplate')}
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 - Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">{t('footer.columns.legal')}</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/impressum" 
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.impressum')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/affiliate-disclosure" 
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.affiliateDisclosure')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.cookiePolicy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-preferences"
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.cookiePreferences')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCookieSettings}
                  className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a] rounded-sm"
                >
                  {t('footer.links.cookieSettings')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Text Block */}
        <p className="text-center text-gray-500 text-xs max-w-2xl mx-auto mb-8">
          {t('footer.seoText')}
        </p>

        {/* Footer Bottom */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{t('footer.madeWith')}</span>
            <Heart aria-hidden="true" className="text-red-500 fill-red-500" size={14} />
            <span>{t('footer.inGermany')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
