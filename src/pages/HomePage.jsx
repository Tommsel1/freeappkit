import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TemplatesGrid from '@/components/TemplatesGrid';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import CallToAction from '@/components/CallToAction';
import GuidesSection from '@/components/GuidesSection';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';
import { templateCatalog } from '@/data/templateCatalog';

const HomePage = () => {
  const { t } = useLanguage();

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FreeAppKit',
    url: 'https://freeappkit.com/',
    inLanguage: ['en', 'de'],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://freeappkit.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const homeItemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FreeAppKit Tools Directory',
    numberOfItems: templateCatalog.length,
    itemListElement: templateCatalog.map((template, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://freeappkit.com/templates/${template.slug}`,
      name: template.name,
    })),
  };

  return (
    <>
      <SeoHead
        title={t('meta.home.title')}
        description={t('meta.home.description')}
        path="/"
        keywords="free online tools,free web tools,calculator templates,pomodoro timer,bmi calculator,password generator,habit tracker,productivity tools,finance calculators,health tools,design tools"
        structuredData={[websiteStructuredData, homeItemListStructuredData]}
        breadcrumbLabel="Home"
      />
      
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          <HeroSection />
          <TemplatesGrid />
          <GuidesSection />
          <FeaturesSection />
          <HowItWorks />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
