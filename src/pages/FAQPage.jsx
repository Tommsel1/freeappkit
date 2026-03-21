import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Mail, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick, id }) => {
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <motion.div 
      initial={false}
      className={`border border-white/10 rounded-xl overflow-hidden bg-[#12121a] transition-colors duration-300 ${isOpen ? 'border-cyan-500/30' : 'hover:border-white/20'}`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset"
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-gray-200 group-hover:text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          aria-hidden="true"
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'group-hover:text-white'}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faqPage.items.0.q'),
      answer: t('faqPage.items.0.a')
    },
    {
      question: t('faqPage.items.1.q'),
      answer: t('faqPage.items.1.a')
    },
    {
      question: t('faqPage.items.2.q'),
      answer: t('faqPage.items.2.a')
    },
    {
      question: t('faqPage.items.3.q'),
      answer: t('faqPage.items.3.a')
    },
    {
      question: t('faqPage.items.4.q'),
      answer: t('faqPage.items.4.a')
    },
    {
      question: t('faqPage.items.5.q'),
      answer: t('faqPage.items.5.a')
    },
    {
      question: t('faqPage.items.6.q'),
      answer: t('faqPage.items.6.a')
    },
    {
      question: t('faqPage.items.7.q'),
      answer: t('faqPage.items.7.a')
    },
    {
      question: t('faqPage.items.8.q'),
      answer: t('faqPage.items.8.a')
    },
    {
      question: t('faqPage.items.9.q'),
      answer: t('faqPage.items.9.a')
    },
    {
      question: t('faqPage.items.10.q'),
      answer: t('faqPage.items.10.a')
    },
    {
      question: t('faqPage.items.11.q'),
      answer: t('faqPage.items.11.a')
    }
  ];

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-cyan-500/30">
      <SeoHead
        title={t('meta.faq.title')}
        description={t('meta.faq.description')}
        path="/faq"
        structuredData={faqStructuredData}
        breadcrumbLabel="FAQ"
      />
      
      <Header />
      
      <main id="main-content" tabIndex={-1} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              <HelpCircle size={16} />
              <span>{t('faqPage.support')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t('faqPage.title')} <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">{t('faqPage.subtitle')}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('faqPage.description')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              id={`faq-item-${index}`}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-b from-[#12121a] to-[#0a0a0f] border border-white/10 text-center"
        >
          <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{t('faqPage.stillQuestions')}</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {t('faqPage.cantFind')}
          </p>
          <a 
            href="mailto:support@freeappkit.com" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Mail size={18} />
            {t('faqPage.contactSupport')}
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
