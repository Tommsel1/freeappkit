import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';
import { getTemplateBySlug, templateCatalog } from '@/data/templateCatalog';

const buildMetaTitle = (template) => `Free 2026 ${template.name} Tool | FreeAppKit`;

const buildMetaDescription = (template) =>
  `Free 2026 ${template.name} by FreeAppKit: use this ${template.category.toLowerCase()} tool with practical how-to steps, explanations, FAQs, and related free tools.`;

const buildHowToSteps = (template) => [
  `Open ${template.name} and review the inputs before starting your first run.`,
  'Enter one clear scenario and test with realistic values rather than edge-case noise.',
  'Adjust settings or options step by step so you can see what actually changes the output.',
  'Save your preferred setup and repeat it consistently for comparable future results.',
  'Use the related tools section to combine this workflow with complementary templates.',
];

const buildFaqItems = (template) => [
  {
    question: `What is the fastest way to use ${template.name}?`,
    answer:
      `Start with one practical scenario and run it end to end before testing extras. This gives you a stable baseline and helps you understand which settings are most important for day-to-day usage.`,
  },
  {
    question: `Is ${template.name} free to use in 2026?`,
    answer:
      `Yes. The tool page is provided as a free experience and can be used without signup. You can test the workflow immediately and iterate until the output matches your needs.`,
  },
  {
    question: `How accurate are the results from ${template.name}?`,
    answer:
      'Accuracy depends on your inputs and assumptions. Use realistic values, avoid rushed entries, and compare repeated runs so the result reflects a reliable scenario instead of a one-off guess.',
  },
  {
    question: `Can I combine this tool with other FreeAppKit pages?`,
    answer:
      'Absolutely. This page is designed to be part of a broader toolkit. Use related pages to validate assumptions, track progress, or extend your workflow with adjacent features.',
  },
];

const TemplateDetailPage = () => {
  const { slug = '' } = useParams();
  const { t } = useLanguage();
  const template = getTemplateBySlug(slug);
  const [showInlinePreview, setShowInlinePreview] = useState(false);
  const [embedLoading, setEmbedLoading] = useState(false);
  const [embedReloadToken, setEmbedReloadToken] = useState(0);

  useEffect(() => {
    setShowInlinePreview(false);
    setEmbedLoading(false);
  }, [slug]);

  const handleIframeLoad = () => {
    setEmbedLoading(false);
  };

  const openInlinePreview = () => {
    setShowInlinePreview(true);
    setEmbedLoading(true);
    setEmbedReloadToken((current) => current + 1);
  };

  const retryInlinePreview = () => {
    setEmbedLoading(true);
    setEmbedReloadToken((current) => current + 1);
  };

  const hideInlinePreview = () => {
    setShowInlinePreview(false);
    setEmbedLoading(false);
  };

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
        <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
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

  const seoTitle = buildMetaTitle(template);
  const seoDescription = buildMetaDescription(template);
  const canonicalPath = `/templates/${template.slug}`;
  const howToSteps = buildHowToSteps(template);
  const faqItems = buildFaqItems(template);
  const relatedTemplates = templateCatalog
    .filter((item) => item.slug !== template.slug && item.category === template.category)
    .slice(0, 4);

  const softwareApplicationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: template.name,
    applicationCategory: template.category,
    applicationSubCategory: template.tags.join(', '),
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `https://freeappkit.com${canonicalPath}`,
    description: seoDescription,
    featureList: template.tags,
    author: {
      '@type': 'Organization',
      name: 'FreeAppKit',
      url: 'https://freeappkit.com/',
    },
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${template.name} setup guide`,
    description: seoDescription,
    step: howToSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={canonicalPath}
        ogType="website"
        keywords={`${template.name.toLowerCase()},${template.tags.join(',').toLowerCase()},free ${template.category.toLowerCase()} tool,free online tool,freeappkit`}
        structuredData={[softwareApplicationStructuredData, faqStructuredData, howToStructuredData]}
        breadcrumbLabel={template.name}
      />

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('templatePage.backToTemplates')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
            <div
              className="rounded-2xl overflow-hidden border border-white/10 bg-[#12121a] shadow-xl relative"
              data-embed-state={showInlinePreview ? (embedLoading ? 'loading' : 'preview') : 'direct'}
            >
              {!showInlinePreview ? (
                <div
                  className="min-h-[640px] p-8 flex flex-col items-center justify-center text-center"
                  data-embed-fallback="true"
                >
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {t('templatePage.embedFallbackTitle')}
                  </h2>
                  <p className="text-gray-300 max-w-xl leading-relaxed mb-6">
                    {t('templatePage.embedFallbackDescription')}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={template.iframeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white border-0 text-sm font-semibold transition-colors"
                      data-embed-open-tool="true"
                    >
                      <ExternalLink size={16} />
                      {t('templatePage.openToolDirect')}
                    </a>
                    <button
                      type="button"
                      onClick={openInlinePreview}
                      className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/20 hover:bg-white/5 text-gray-200 text-sm font-medium transition-colors"
                    >
                      {t('templatePage.tryInlinePreview')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0a0f]/70">
                    <p className="text-sm text-gray-300">{t('templatePage.inlinePreviewHint')}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={template.iframeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-semibold transition-colors"
                        data-embed-open-tool="true"
                      >
                        <ExternalLink size={14} />
                        {t('templatePage.openToolDirect')}
                      </a>
                      <button
                        type="button"
                        onClick={retryInlinePreview}
                        className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-gray-200 text-xs font-medium transition-colors"
                      >
                        {t('templatePage.retryEmbed')}
                      </button>
                      <button
                        type="button"
                        onClick={hideInlinePreview}
                        className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-gray-200 text-xs font-medium transition-colors"
                      >
                        {t('templatePage.hideInlinePreview')}
                      </button>
                    </div>
                  </div>
                  <iframe
                    key={`${template.slug}-${embedReloadToken}`}
                    src={template.iframeUrl}
                    title={template.name}
                    className="w-full min-h-[640px] border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
                    allow="clipboard-read; clipboard-write; fullscreen"
                    onLoad={handleIframeLoad}
                  />
                  {embedLoading ? (
                    <div className="absolute inset-0 bg-[#12121a]/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                      <div className="text-center px-6">
                        <p className="text-white font-semibold mb-2">{t('templatePage.embedLoadingTitle')}</p>
                        <p className="text-gray-300 text-sm">{t('templatePage.embedLoadingDescription')}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
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

              <p className="text-xs text-gray-400 mt-4">
                {t('templatePage.affiliateNote')}
              </p>
            </aside>
          </div>

          <article className="mt-12 bg-[#12121a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-10">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How to use {template.name}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {template.name} is designed for fast execution: open, input, run, and compare. The best way to get
                reliable outcomes is to define your scenario before interacting with controls. This avoids random trial
                and helps you detect which settings materially influence the result. If you use this page for recurring
                tasks, keep one baseline setup and adjust one variable at a time. That process improves consistency and
                makes results easier to explain to teammates, clients, or collaborators.
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                {howToSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How this tool works</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The core idea behind {template.name} is to make a useful {template.category.toLowerCase()} workflow
                accessible with almost zero setup overhead. Instead of navigating complex software menus, you interact
                with a focused interface that keeps only the essential controls visible. This reduces cognitive load and
                helps you complete practical tasks without switching apps or breaking concentration.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                For best results, treat this page as part of a system rather than a one-off utility. Run one clean
                scenario, capture the output, then cross-check assumptions with related tools. This approach improves
                confidence, especially for repetitive decisions where small errors can compound over time. If your use
                case evolves, return to the baseline workflow and update one assumption per iteration so changes remain
                traceable.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Because the tool is web-based, it is fast to share and easy to revisit from any modern browser. That
                makes it practical for distributed teams, asynchronous planning, and personal routines that require
                repeatable structure. The combination of immediate access and clear output is what makes this template
                useful in daily work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <details key={item.question} className="bg-[#0f0f16] border border-white/10 rounded-lg p-4">
                    <summary className="cursor-pointer font-medium text-white">{item.question}</summary>
                    <p className="text-gray-300 mt-3 leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Related tools and guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {relatedTemplates.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/templates/${item.slug}`}
                    className="bg-[#0f0f16] border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 transition-colors"
                  >
                    <span className="font-medium text-white">{item.name}</span>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/guides" className="text-cyan-400 hover:text-cyan-300">Browse all guides</Link>
                <Link to="/faq" className="text-cyan-400 hover:text-cyan-300">Read FAQs</Link>
                <Link to="/how-it-works" className="text-cyan-400 hover:text-cyan-300">See workflow</Link>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateDetailPage;
