import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { guideCatalog, getGuideBySlug } from '@/data/guideCatalog';
import { templateCatalog } from '@/data/templateCatalog';

const GuideDetailPage = () => {
  const { slug = '' } = useParams();
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <SeoHead
          title="Guide not found | FreeAppKit"
          description="The requested guide could not be found."
          path={`/guides/${slug}`}
          noindex
        />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Guide not found</h1>
            <p className="text-gray-400 mb-8">The requested guide does not exist.</p>
            <Link to="/guides" className="text-cyan-400 hover:text-cyan-300">
              Browse all guides
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const path = `/guides/${guide.slug}`;
  const relatedTemplates = templateCatalog.filter((template) =>
    guide.relatedTemplates.includes(template.slug)
  );
  const relatedGuides = guideCatalog
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
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
    name: `${guide.keyword} workflow`,
    description: guide.metaDescription,
    step: guide.howToSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <SeoHead
        title={guide.metaTitle}
        description={guide.metaDescription}
        path={path}
        structuredData={[faqStructuredData, howToStructuredData]}
        breadcrumbLabel={guide.title}
      />

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <Link
            to="/guides"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Guides
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            {guide.title}
          </h1>

          <p className="text-gray-300 leading-relaxed mb-6">{guide.intro[0]}</p>
          <p className="text-gray-300 leading-relaxed mb-10">{guide.intro[1]}</p>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How to use this guide</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-300 leading-relaxed">
              {guide.howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Concept and strategy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">{guide.concept[0]}</p>
            <p className="text-gray-300 leading-relaxed">{guide.concept[1]}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {guide.faq.map((item) => (
                <details key={item.question} className="bg-[#12121a] border border-white/10 rounded-lg p-4">
                  <summary className="cursor-pointer text-white font-medium">{item.question}</summary>
                  <p className="text-gray-300 leading-relaxed mt-3">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Related tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {relatedTemplates.map((template) => (
                <Link
                  key={template.slug}
                  to={`/templates/${template.slug}`}
                  className="bg-[#12121a] border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="font-medium text-white">{template.name}</span>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Related guides</h2>
            <div className="space-y-3">
              {relatedGuides.map((item) => (
                <Link
                  key={item.slug}
                  to={`/guides/${item.slug}`}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                >
                  {item.title} <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default GuideDetailPage;
