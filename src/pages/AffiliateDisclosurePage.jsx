import React from 'react';
import { motion } from 'framer-motion';
import { Info, Link as LinkIcon, ShieldCheck, Heart, Scale, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const AffiliateDisclosurePage = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-cyan-500/30">
      <SeoHead
        title={t('meta.affiliate.title')}
        description={t('meta.affiliate.description')}
        path="/affiliate-disclosure"
      />
      
      <Header />
      
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <Info size={16} />
            <span>{t('affiliatePage.transparency')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t('affiliatePage.title')} <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">{t('affiliatePage.highlight')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('affiliatePage.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Section 1: What are Affiliate Links */}
          <motion.div variants={itemVariants} className="bg-[#12121a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg text-cyan-400">
                <LinkIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('affiliatePage.whatAreLinks.title')}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {t('affiliatePage.whatAreLinks.desc')}
                  <br /><br />
                  <span className="text-white font-medium">{t('affiliatePage.whatAreLinks.important')}</span> <span className="text-cyan-400 font-bold">{t('affiliatePage.whatAreLinks.noCost')}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Which Links are Affiliate Links */}
          <motion.div variants={itemVariants} className="bg-[#12121a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg text-pink-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('affiliatePage.whichLinks.title')}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {t('affiliatePage.whichLinks.desc')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Why We Use Affiliate Links */}
          <motion.div variants={itemVariants} className="bg-[#12121a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg text-purple-400">
                <Heart size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('affiliatePage.whyUse.title')}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {t('affiliatePage.whyUse.desc')}
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400 ml-2">
                  <li>{t('affiliatePage.whyUse.list.0')}</li>
                  <li>{t('affiliatePage.whyUse.list.1')}</li>
                  <li>{t('affiliatePage.whyUse.list.2')}</li>
                  <li>{t('affiliatePage.whyUse.list.3')}</li>
                </ul>
                <p className="text-gray-400 leading-relaxed mt-4">
                  {t('affiliatePage.whyUse.closing')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 4: Our Principles */}
          <motion.div variants={itemVariants} className="bg-[#12121a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg text-yellow-400">
                <Scale size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('affiliatePage.principles.title')}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {t('affiliatePage.principles.desc')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 5: Legal Basis */}
          <motion.div variants={itemVariants} className="bg-[#12121a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-3 rounded-lg text-green-400">
                <Info size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">{t('affiliatePage.legalBasis.title')}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {t('affiliatePage.legalBasis.desc')}
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400 ml-2">
                  <li>{t('affiliatePage.legalBasis.list.0')}</li>
                  <li>{t('affiliatePage.legalBasis.list.1')}</li>
                </ul>
                <p className="text-gray-400 leading-relaxed mt-4">
                  {t('affiliatePage.legalBasis.closing')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center mt-12 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold mb-4 text-white">{t('affiliatePage.contact.title')}</h3>
            <p className="text-gray-400 mb-6">
              {t('affiliatePage.contact.desc')}
            </p>
            <a 
              href="mailto:tshfm78@gmail.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white transition-colors"
            >
              <Mail size={18} />
              {t('affiliatePage.contact.button')}
            </a>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AffiliateDisclosurePage;
