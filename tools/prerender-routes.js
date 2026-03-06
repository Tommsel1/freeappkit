import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../src/i18n/en.js';
import { templateCatalog } from '../src/data/templateCatalog.js';

const SITE_URL = 'https://freeappkit.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

const staticRoutes = [
  { path: '/', title: en.meta.home.title, description: en.meta.home.description },
  { path: '/about', title: en.meta.about.title, description: en.meta.about.description },
  { path: '/faq', title: en.meta.faq.title, description: en.meta.faq.description },
  { path: '/how-it-works', title: en.meta.howItWorks.title, description: en.meta.howItWorks.description },
  { path: '/affiliate-disclosure', title: en.meta.affiliate.title, description: en.meta.affiliate.description },
  { path: '/impressum', title: en.meta.impressum.title, description: en.meta.impressum.description },
  { path: '/privacy', title: en.meta.privacy.title, description: en.meta.privacy.description },
];

const templateRoutes = templateCatalog.map((template) => ({
  path: `/templates/${template.slug}`,
  title: `${template.name} - Free Template | FreeAppKit`,
  description: template.description,
}));

const routes = [...staticRoutes, ...templateRoutes];

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const upsertMetaByName = (html, name, content) => {
  const escapedName = escapeRegex(name);
  const tag = `<meta data-rh="true" name="${name}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(`<meta[^>]*name=["']${escapedName}["'][^>]*>`, 'i');

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace('</head>', `  ${tag}\n</head>`);
};

const upsertMetaByProperty = (html, property, content) => {
  const escapedProperty = escapeRegex(property);
  const tag = `<meta data-rh="true" property="${property}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(`<meta[^>]*property=["']${escapedProperty}["'][^>]*>`, 'i');

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace('</head>', `  ${tag}\n</head>`);
};

const upsertCanonical = (html, canonicalUrl) => {
  const tag = `<link data-rh="true" rel="canonical" href="${canonicalUrl}" />`;
  const regex = /<link[^>]*rel=["']canonical["'][^>]*>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace('</head>', `  ${tag}\n</head>`);
};

const upsertTitle = (html, title) => {
  const tag = `<title data-rh="true">${escapeHtml(title)}</title>`;
  const regex = /<title[^>]*>[\s\S]*?<\/title>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace('</head>', `  ${tag}\n</head>`);
};

const renderRouteHtml = (baseHtml, { path: routePath, title, description }) => {
  const canonicalUrl = routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
  let html = baseHtml;

  html = upsertTitle(html, title);
  html = upsertMetaByName(html, 'description', description);
  html = upsertMetaByName(html, 'robots', 'index, follow');
  html = upsertCanonical(html, canonicalUrl);
  html = upsertMetaByProperty(html, 'og:title', title);
  html = upsertMetaByProperty(html, 'og:description', description);
  html = upsertMetaByProperty(html, 'og:url', canonicalUrl);
  html = upsertMetaByProperty(html, 'twitter:title', title);
  html = upsertMetaByProperty(html, 'twitter:description', description);
  html = upsertMetaByProperty(html, 'twitter:url', canonicalUrl);

  return html;
};

const writeRouteHtml = (route, html) => {
  if (route.path === '/') {
    writeFileSync(baseHtmlPath, html, 'utf8');
    return;
  }

  const relativePath = route.path.replace(/^\//, '');
  const filePath = path.join(distDir, relativePath, 'index.html');
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf8');
};

const baseHtml = readFileSync(baseHtmlPath, 'utf8');

routes.forEach((route) => {
  const routeHtml = renderRouteHtml(baseHtml, route);
  writeRouteHtml(route, routeHtml);
});

console.log(`Prerendered ${routes.length} route HTML files.`);
