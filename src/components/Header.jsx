import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookie } from '@/context/CookieContext';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useCookie();
  const { language, setLanguage, t } = useLanguage();
  const legalMenuRef = useRef(null);

  useEffect(() => {
    if (!isLegalOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (legalMenuRef.current && !legalMenuRef.current.contains(event.target)) {
        setIsLegalOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLegalOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isLegalOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    setIsLegalOpen(false);
    
    if (href.startsWith('/') && !href.startsWith('/#')) {
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        window.location.href = '/' + href;
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const openCookieSettings = (event) => {
    setIsMenuOpen(false);
    setIsLegalOpen(false);
    openModal(event?.currentTarget);
  };

  const navLinks = [
    { name: t('header.templates'), href: "#templates" },
    { name: t('header.about'), href: "/about" },
    { name: t('header.faq'), href: "/faq" },
    { name: t('header.howItWorks'), href: "/how-it-works" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            aria-label="FreeAppKit Home"
            className="flex-shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-sm"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              FreeAppKit
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label={t('header.primaryNavigation')} className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-gray-300 hover:text-white hover:text-shadow-glow transition-colors duration-300 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-sm"
              >
                {link.name}
              </a>
            ))}
            
            {/* Legal Dropdown */}
            <div className="relative" ref={legalMenuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isLegalOpen}
                aria-controls="desktop-legal-menu"
                onClick={() => setIsLegalOpen((previous) => !previous)}
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-sm"
              >
                {t('header.legal')}
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLegalOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLegalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full pt-2 w-48"
                  >
                    <div
                      id="desktop-legal-menu"
                      role="menu"
                      aria-label={t('header.legal')}
                      className="bg-[#12121a] border border-white/10 rounded-lg shadow-xl overflow-hidden backdrop-blur-md"
                    >
                      <Link 
                        to="/impressum" 
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.impressum')}
                      </Link>
                      <Link 
                        to="/privacy" 
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.privacy')}
                      </Link>
                      <Link
                        to="/terms"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.terms')}
                      </Link>
                      <Link
                        to="/cookie-policy"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.cookiePolicy')}
                      </Link>
                      <Link
                        to="/cookie-preferences"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.cookiePreferences')}
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={openCookieSettings}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
                      >
                        {t('header.cookieSettings')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-4">
              <button 
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`text-sm transition-all duration-200 ${language === 'en' ? 'text-white font-semibold bg-white/10 px-2 py-1 rounded' : 'text-gray-500 hover:text-white px-2 py-1'}`}
              >
                EN
              </button>
              <button 
                type="button"
                onClick={() => setLanguage('de')}
                aria-pressed={language === 'de'}
                className={`text-sm transition-all duration-200 ${language === 'de' ? 'text-white font-semibold bg-white/10 px-2 py-1 rounded' : 'text-gray-500 hover:text-white px-2 py-1'}`}
              >
                DE
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={isMenuOpen ? t('header.close') : t('header.menu')}
              className="text-gray-300 hover:text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-md"
            >
              {isMenuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation-panel"
            aria-label={t('header.primaryNavigation')}
            className="md:hidden bg-[#0a0a0f] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="border-t border-white/10 my-2 pt-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('header.legal')}
                </p>
                <Link
                  to="/impressum"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {t('header.impressum')}
                </Link>
                <Link
                  to="/privacy"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {t('header.privacy')}
                </Link>
                <Link
                  to="/terms"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {t('header.terms')}
                </Link>
                <Link
                  to="/cookie-policy"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {t('header.cookiePolicy')}
                </Link>
                <Link
                  to="/cookie-preferences"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {t('header.cookiePreferences')}
                </Link>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  {t('header.cookieSettings')}
                </button>
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-4 px-3 py-4 border-t border-white/10">
                <button 
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                  className={`flex-1 py-2 rounded text-sm text-center ${language === 'en' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  English
                </button>
                <button 
                  type="button"
                  onClick={() => setLanguage('de')}
                  aria-pressed={language === 'de'}
                  className={`flex-1 py-2 rounded text-sm text-center ${language === 'de' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  Deutsch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
