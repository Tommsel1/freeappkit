import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Copy, PenTool, UploadCloud, 
  ArrowRight, Code2, Layers, Smartphone 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const StepCard = ({ number, icon, title, description, tips, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 md:pl-0"
    >
      {/* Connector Line for Desktop */}
      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/30 to-transparent -z-10" />
      
      <div className="flex flex-col h-full bg-[#12121a] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group">
        <div className="absolute -left-3 md:-top-3 md:left-6 w-8 h-8 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center z-10 shadow-lg shadow-cyan-500/20">
          {number}
        </div>
        
        <div className="mb-6 mt-2">
          <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
        
        <div className="bg-white/5 rounded-lg p-4 mt-auto">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Pro Tip</p>
          <p className="text-xs text-gray-500">{tips}</p>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorksPage = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Search size={28} />,
      title: t('howItWorksPage.steps.0.title'),
      description: t('howItWorksPage.steps.0.desc'),
      tips: t('howItWorksPage.steps.0.tip')
    },
    {
      icon: <Copy size={28} />,
      title: t('howItWorksPage.steps.1.title'),
      description: t('howItWorksPage.steps.1.desc'),
      tips: t('howItWorksPage.steps.1.tip')
    },
    {
      icon: <PenTool size={28} />,
      title: t('howItWorksPage.steps.2.title'),
      description: t('howItWorksPage.steps.2.desc'),
      tips: t('howItWorksPage.steps.2.tip')
    },
    {
      icon: <UploadCloud size={28} />,
      title: t('howItWorksPage.steps.3.title'),
      description: t('howItWorksPage.steps.3.desc'),
      tips: t('howItWorksPage.steps.3.tip')
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-cyan-500/30">
      <SeoHead
        title={t('meta.howItWorks.title')}
        description={t('meta.howItWorks.description')}
        path="/how-it-works"
      />
      
      <Header />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {t('howItWorksPage.title')} <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">{t('howItWorksPage.highlight')}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('howItWorksPage.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 relative">
          {/* Connecting Line Container (Background) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-0 w-[80%] h-0.5 bg-white/5 z-0" />
          
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              number={index + 1}
              {...step}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Customization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">{t('howItWorksPage.customizableTitle')}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t('howItWorksPage.customizableDesc')}
            </p>
            
            <div className="space-y-6">
              {[
                { title: t('howItWorksPage.features.0.title'), desc: t('howItWorksPage.features.0.desc'), icon: <Code2 className="text-blue-400" /> },
                { title: t('howItWorksPage.features.1.title'), desc: t('howItWorksPage.features.1.desc'), icon: <Smartphone className="text-cyan-400" /> },
                { title: t('howItWorksPage.features.2.title'), desc: t('howItWorksPage.features.2.desc'), icon: <Layers className="text-purple-400" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-lg h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-2xl blur-3xl -z-10" />
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 md:p-8 font-mono text-sm relative overflow-hidden">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2 text-gray-400">
                <p><span className="text-purple-400">const</span> <span className="text-yellow-400">App</span> = () <span className="text-purple-400">=&gt;</span> {'{'}</p>
                <p className="pl-4"><span className="text-gray-500">// Your customization starts here</span></p>
                <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                <p className="pl-8">&lt;<span className="text-red-400">div</span> <span className="text-cyan-400">className</span>="<span className="text-green-400">bg-white dark:bg-black</span>"&gt;</p>
                <p className="pl-12">&lt;<span className="text-yellow-400">Header</span> /&gt;</p>
                <p className="pl-12">&lt;<span className="text-yellow-400">MainContent</span> /&gt;</p>
                <p className="pl-8">&lt;/<span className="text-red-400">div</span>&gt;</p>
                <p className="pl-4">);</p>
                <p>{'}'};</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
          >
            {t('howItWorksPage.cta')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
