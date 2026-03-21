import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { guideCatalog } from '@/data/guideCatalog';

const GuidesSection = () => {
  const featuredGuides = guideCatalog.slice(0, 3);

  return (
    <section id="guides" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d14]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                Free 2026 Guides
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Learn how to get more value from the tools with practical, search-focused guides and FAQ-style
              explanations.
            </p>
          </div>
          <Link to="/guides" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-2">
            View all guides <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <article key={guide.slug} className="bg-[#12121a] border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{guide.title}</h3>
              <p className="text-gray-400 text-sm mb-5">{guide.metaDescription}</p>
              <Link to={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                Read guide <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
