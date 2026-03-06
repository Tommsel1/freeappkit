import React from 'react';
import { Helmet } from 'react-helmet';

const SITE_URL = 'https://freeappkit.com';

const toCanonicalUrl = (path = '/') => {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const SeoHead = ({ title, description, path = '/', noindex = false }) => {
  const canonicalUrl = toCanonicalUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
};

export default SeoHead;
