import React from 'react';
import { motion } from 'framer-motion';
import { Search, Copy, Edit3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Search,
      title: t('howItWorks.steps.0.title'),
      description: t('howItWorks.steps.0.description')
    },
    {
      icon: Copy,
      title: t('howItWorks.steps.1.title'),
      description: t('howItWorks.steps.1.description')
    },
    {
      icon: Edit3,
      title: t('howItWorks.steps.2.title'),
      description: t('howItWorks.steps.2.description')
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('howItWorks.title')}</h2>
          <p className="text-gray-400">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-cyan-500/20 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#12121a] border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                <step.icon size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                <span className="text-cyan-500 mr-2">{index + 1}.</span>
                {step.title}
              </h3>
              <p className="text-gray-400 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;