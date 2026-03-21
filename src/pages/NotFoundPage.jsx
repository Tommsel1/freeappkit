import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
    <SeoHead
      title="Page not found | FreeAppKit"
      description="The requested page could not be found."
      path="/not-found"
      noindex
    />
    <Header />
    <main id="main-content" tabIndex={-1} className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page you requested does not exist. Use one of the links below to continue.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">Home</Link>
          <Link to="/guides" className="text-cyan-400 hover:text-cyan-300">Guides</Link>
          <Link to="/faq" className="text-cyan-400 hover:text-cyan-300">FAQ</Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage;
