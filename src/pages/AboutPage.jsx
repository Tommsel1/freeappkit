import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Globe, Heart, Rocket, Sparkles, 
  CheckCircle2, Zap, Activity, DollarSign, 
  Smile, Palette, Calculator 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { useLanguage } from '@/context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const missionCards = [
    {
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: t('aboutPage.mission.title'),
      description: t('aboutPage.mission.description')
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: t('aboutPage.love.title'),
      description: t('aboutPage.love.description')
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      title: t('aboutPage.deploy.title'),
      description: t('aboutPage.deploy.description')
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      title: t('aboutPage.everyone.title'),
      description: t('aboutPage.everyone.description')
    }
  ];

  const categories = [
    { icon: <Zap size={24} className="text-yellow-400" />, name: t('aboutPage.categories.productivity') },
    { icon: <Activity size={24} className="text-red-400" />, name: t('aboutPage.categories.health') },
    { icon: <DollarSign size={24} className="text-green-400" />, name: t('aboutPage.categories.finance') },
    { icon: <Smile size={24} className="text-orange-400" />, name: t('aboutPage.categories.fun') },
    { icon: <Palette size={24} className="text-purple-400" />, name: t('aboutPage.categories.design') },
    { icon: <Calculator size={24} className="text-blue-400" />, name: t('aboutPage.categories.utilities') }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-cyan-500/30">
      <SeoHead
        title={t('meta.about.title')}
        description={t('meta.about.description')}
        path="/about"
      />
      
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('aboutPage.back')}
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {t('aboutPage.title')} <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">FreeAppKit</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('aboutPage.subtitle')}
          </p>
        </motion.div>

        {/* Mission Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {missionCards.map((card, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-[#12121a] border border-white/10 p-6 rounded-xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 group"
            >
              <div className="bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* What We Offer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full"></span>
              {t('aboutPage.whatWeOffer.title')}
            </h2>
            <div className="space-y-4">
              {[
                t('aboutPage.whatWeOffer.items.0'),
                t('aboutPage.whatWeOffer.items.1'),
                t('aboutPage.whatWeOffer.items.2'),
                t('aboutPage.whatWeOffer.items.3'),
                t('aboutPage.whatWeOffer.items.4')
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#12121a] border border-white/5 rounded-xl hover:bg-[#1a1a24] transition-colors">
                  <CheckCircle2 className="text-green-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Template Categories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
              {t('aboutPage.categories.title')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#12121a] border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-3 hover:border-white/20 transition-all cursor-default"
                >
                  {cat.icon}
                  <span className="text-sm font-medium text-gray-300">{cat.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
