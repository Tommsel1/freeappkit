import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TemplatesGrid from '@/components/TemplatesGrid';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  return (
    <>
      <SeoHead
        title={t('meta.home.title')}
        description={t('meta.home.description')}
        path="/"
      />
      
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <TemplatesGrid />
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
