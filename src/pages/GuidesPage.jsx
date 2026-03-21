import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { guideCatalog } from '@/data/guideCatalog';

const GuidesPage = () => (
  <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
    <SeoHead
      title="Free 2026 Guides For Web Tools | FreeAppKit"
      description="Browse free 2026 guides for productivity, health, finance, security, and sustainability tools with practical how-to steps and FAQs."
      path="/guides"
    />

    <Header />

    <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Free 2026 Tool Guides
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-3xl">
          Explore step-by-step guides designed to help you get practical results from FreeAppKit tools. Each guide
          includes a clear workflow, concept explanations, FAQs, and related tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideCatalog.map((guide) => (
            <article key={guide.slug} className="bg-[#12121a] border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-3">{guide.title}</h2>
              <p className="text-gray-400 mb-6">{guide.metaDescription}</p>
              <Link
                to={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Read guide <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default GuidesPage;
