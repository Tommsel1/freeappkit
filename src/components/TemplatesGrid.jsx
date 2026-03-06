import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TemplateCard from './TemplateCard';
import { useLanguage } from '@/context/LanguageContext';
import { templateCatalog } from '@/data/templateCatalog';

const TemplatesGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const { t } = useLanguage();
  const templates = templateCatalog;

  const categoryCounts = templates.reduce((accumulator, template) => {
    accumulator[template.category] = (accumulator[template.category] || 0) + 1;
    return accumulator;
  }, {});

  const filters = [
    { id: 'All', label: `🔥 ${t('templatesGrid.filters.all')}`, count: templates.length },
    { id: 'Productivity', label: `⚡ ${t('templatesGrid.filters.productivity')}`, count: categoryCounts['Productivity'] || 0 },
    { id: 'Health & Wellness', label: `💚 ${t('templatesGrid.filters.healthWellness')}`, count: categoryCounts['Health & Wellness'] || 0 },
    { id: 'Finance', label: `💰 ${t('templatesGrid.filters.finance')}`, count: categoryCounts['Finance'] || 0 },
    { id: 'Fun & Games', label: `🎮 ${t('templatesGrid.filters.funGames')}`, count: categoryCounts['Fun & Games'] || 0 },
    { id: 'Design & Dev', label: `🎨 ${t('templatesGrid.filters.designDev')}`, count: categoryCounts['Design & Dev'] || 0 },
    { id: 'Tools & Utilities', label: `🔧 ${t('templatesGrid.filters.toolsUtilities')}`, count: categoryCounts['Tools & Utilities'] || 0 },
  ];

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    if (activeCategory === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', activeCategory);
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeCategory, searchParams, setSearchParams]);

  const filteredTemplates =
    activeCategory === 'All'
      ? templates
      : templates.filter((template) => template.category === activeCategory);

  return (
    <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              {t('templatesGrid.title')}
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            {t('templatesGrid.subtitle')}
          </p>

          <div className="bg-[#12121a] border border-white/10 rounded-xl p-4 mb-8 text-center max-w-4xl mx-auto">
            <p className="text-gray-400 text-sm">
              {t('templatesGrid.affiliateNotice')}{' '}
              <Link to="/affiliate-disclosure" className="text-cyan-400 hover:text-cyan-300 underline">
                {t('templatesGrid.learnMore')}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="flex overflow-x-auto gap-2 pb-4 w-full max-w-5xl md:justify-center px-4 no-scrollbar touch-pan-x snap-x">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === filter.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter.label} <span className="opacity-60 ml-1">({filter.count})</span>
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {t('templatesGrid.showing', { count: filteredTemplates.length, total: templates.length })}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TemplateCard {...template} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesGrid;
