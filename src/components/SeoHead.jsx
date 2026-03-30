import React from 'react';
import { Helmet } from 'react-helmet';

const SITE_URL = 'https://freeappkit.com';
const DEFAULT_IMAGE = 'https://freeappkit.com/og-image.png';
const SITE_NAME = 'FreeAppKit';

const toCanonicalUrl = (path = '/') => {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const toBreadcrumbLabel = (segment = '') =>
  segment
    .replace(/-/g, ' ')
    .split(' ')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');

const buildBreadcrumbList = (path = '/', finalLabel = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const segments = normalizedPath === '/' ? [] : normalizedPath.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', item: `${SITE_URL}/` }];
  let partial = '';

  segments.forEach((segment, index) => {
    partial += `/${segment}`;
    const isLast = index === segments.length - 1;
    crumbs.push({
      name: isLast && finalLabel ? finalLabel : toBreadcrumbLabel(segment),
      item: toCanonicalUrl(partial),
    });
  });

  return crumbs;
};

const SeoHead = ({
  title,
  description,
  path = '/',
  noindex = false,
  ogType = 'website',
  image = DEFAULT_IMAGE,
  imageAlt = 'FreeAppKit preview image',
  keywords = '',
  structuredData = [],
  breadcrumbLabel = '',
}) => {
  const canonicalUrl = toCanonicalUrl(path);
  const inferredLanguage =
    typeof document !== 'undefined' && document.documentElement?.lang
      ? document.documentElement.lang
      : 'en';
  const breadcrumbItems = buildBreadcrumbList(path, breadcrumbLabel);
  const breadcrumbStructuredData =
    breadcrumbItems.length > 1
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item,
          })),
        }
      : null;

  const webPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: inferredLanguage,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };

  const structuredDataArray = [
    webPageStructuredData,
    ...(
      Array.isArray(structuredData)
        ? structuredData
        : structuredData
          ? [structuredData]
          : []
    ),
    ...(breadcrumbStructuredData ? [breadcrumbStructuredData] : []),
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content={inferredLanguage} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={imageAlt} />
      {structuredDataArray.map((item, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
