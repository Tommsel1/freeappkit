import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Link2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TemplateCard = ({ slug, name, description, tags, iframeUrl, badge }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    window.open(iframeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-[#12121a] rounded-[16px] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 overflow-hidden backdrop-blur-md"
    >
      {badge && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white shadow-lg">
          {badge}
        </div>
      )}

      <div className="relative h-[400px] w-full bg-[#0a0a0f] border-b border-white/5 overflow-hidden">
        <iframe
          src={iframeUrl}
          title={`${name} preview`}
          className="w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="absolute inset-0 bg-transparent" />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <Link
          to={`/templates/${slug}`}
          aria-label={`${name} details`}
          className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 underline-offset-4 hover:underline"
        >
          {name}
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/[0.05] border border-white/[0.05] rounded text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {description && (
          <p className="text-sm text-gray-400 mb-6 flex-grow">{description}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link
            to={`/templates/${slug}`}
            aria-label={`${name} template details`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium"
          >
            <Link2 size={16} />
            {t('templateCard.details')}
          </Link>
          <button
            onClick={handleCopy}
            aria-label={`${name} copy template`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold shadow-lg shadow-cyan-900/20 transition-all duration-300 text-sm hover:shadow-cyan-500/40"
          >
            <ExternalLink size={16} />
            {t('templateCard.copyTemplate')}
          </button>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 text-center">
          * Werbung – Affiliate-Link. Bei Nutzung erhalten wir eine Provision.
        </p>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
