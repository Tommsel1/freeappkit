import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { templateCatalog } from '../src/data/templateCatalog.js';
import { guideCatalog } from '../src/data/guideCatalog.js';

const SITE_URL = 'https://freeappkit.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');

const now = new Date().toISOString();

const staticEntries = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'weekly' },
  { path: '/how-it-works', priority: '0.7', changefreq: 'weekly' },
  { path: '/guides', priority: '0.7', changefreq: 'weekly' },
  { path: '/affiliate-disclosure', priority: '0.3', changefreq: 'monthly' },
  { path: '/impressum', priority: '0.3', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'monthly' },
  { path: '/cookie-preferences', priority: '0.3', changefreq: 'monthly' },
  { path: '/llms.txt', priority: '0.2', changefreq: 'monthly' },
  { path: '/llms-full.txt', priority: '0.2', changefreq: 'monthly' },
];

const templateEntries = templateCatalog.map((template) => ({
  path: `/templates/${template.slug}`,
  priority: '0.9',
  changefreq: 'weekly',
}));

const guideEntries = guideCatalog.map((guide) => ({
  path: `/guides/${guide.slug}`,
  priority: '0.7',
  changefreq: 'weekly',
}));

const entries = [
  ...staticEntries,
  ...templateEntries,
  ...guideEntries,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

writeFileSync(outputPath, `${xml}\n`, 'utf8');
console.log(`Sitemap generated with ${entries.length} URLs.`);
