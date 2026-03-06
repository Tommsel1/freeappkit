import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';
import { getTemplateBySlug } from '@/data/templateCatalog';

const TemplateDetailPage = () => {
  const { slug = '' } = useParams();
  const { t } = useLanguage();
  const template = getTemplateBySlug(slug);

  if (!template) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <SeoHead
          title={t('templatePage.notFoundTitle')}
          description={t('templatePage.notFoundDescription')}
          path={`/templates/${slug}`}
          noindex
        />
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('templatePage.notFoundHeading')}</h1>
            <p className="text-gray-400 mb-8">{t('templatePage.notFoundDescription')}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              {t('templatePage.backToTemplates')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const seoTitle = `${template.name} - ${t('templatePage.metaSuffix')}`;
  const canonicalPath = `/templates/${template.slug}`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <SeoHead
        title={seoTitle}
        description={template.description}
        path={canonicalPath}
      />

      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('templatePage.backToTemplates')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#12121a] shadow-xl">
              <iframe
                src={template.iframeUrl}
                title={template.name}
                className="w-full min-h-[640px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            <aside className="bg-[#12121a] border border-white/10 rounded-2xl p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-400 mb-3">{t('templatePage.templateLabel')}</p>
              <h1 className="text-3xl font-bold mb-4">{template.name}</h1>
              <p className="text-gray-400 mb-6">{template.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded text-xs border border-white/10 bg-white/5 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={template.iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/20 hover:bg-white/5 text-gray-200 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  {t('templatePage.liveDemo')}
                </a>
                <a
                  href={template.iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  {t('templatePage.copyTemplate')}
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                {t('templatePage.affiliateNote')}
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateDetailPage;
