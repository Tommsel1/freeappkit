import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: "⚡",
      title: t('features.items.0.title'),
      description: t('features.items.0.description')
    },
    {
      icon: "🎨",
      title: t('features.items.1.title'),
      description: t('features.items.1.description')
    },
    {
      icon: "🚀",
      title: t('features.items.2.title'),
      description: t('features.items.2.description')
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-[#1a1a2e]/50 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/20"
            >
              <div className="text-5xl mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;