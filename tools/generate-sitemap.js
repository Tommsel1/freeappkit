import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { templateCatalog } from '../src/data/templateCatalog.js';

const SITE_URL = 'https://freeappkit.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');

const staticPaths = [
  '/',
  '/about',
  '/faq',
  '/how-it-works',
  '/affiliate-disclosure',
  '/impressum',
  '/privacy',
];

const now = new Date().toISOString();

const urls = [
  ...staticPaths.map((pathName) => `${SITE_URL}${pathName}`),
  ...templateCatalog.map((template) => `${SITE_URL}/templates/${template.slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === `${SITE_URL}/` ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

writeFileSync(outputPath, `${xml}\n`, 'utf8');
console.log(`Sitemap generated with ${urls.length} URLs.`);
