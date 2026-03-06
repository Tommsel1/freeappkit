import React, { useState } from 'react';
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

  const openCookieSettings = () => {
    setIsMenuOpen(false);
    setIsLegalOpen(false);
    openModal();
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
          <Link to="/" className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              FreeAppKit
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-gray-300 hover:text-white hover:text-shadow-glow transition-colors duration-300 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {/* Legal Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsLegalOpen(true)}
              onMouseLeave={() => setIsLegalOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
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
                    <div className="bg-[#12121a] border border-white/10 rounded-lg shadow-xl overflow-hidden backdrop-blur-md">
                      <Link 
                        to="/impressum" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.impressum')}
                      </Link>
                      <Link 
                        to="/privacy" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setIsLegalOpen(false)}
                      >
                        {t('header.privacy')}
                      </Link>
                      <button
                        onClick={openCookieSettings}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
                onClick={() => setLanguage('en')}
                className={`text-sm transition-all duration-200 ${language === 'en' ? 'text-white font-semibold bg-white/10 px-2 py-1 rounded' : 'text-gray-500 hover:text-white px-2 py-1'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('de')}
                className={`text-sm transition-all duration-200 ${language === 'de' ? 'text-white font-semibold bg-white/10 px-2 py-1 rounded' : 'text-gray-500 hover:text-white px-2 py-1'}`}
              >
                DE
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
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
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {t('header.impressum')}
                </Link>
                <Link
                  to="/privacy"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {t('header.privacy')}
                </Link>
                <button
                  onClick={openCookieSettings}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {t('header.cookieSettings')}
                </button>
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-4 px-3 py-4 border-t border-white/10">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2 rounded text-sm text-center ${language === 'en' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('de')}
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