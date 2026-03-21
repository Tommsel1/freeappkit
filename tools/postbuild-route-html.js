import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { templateCatalog } from '../src/data/templateCatalog.js';
import { guideCatalog } from '../src/data/guideCatalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

const staticRoutes = [
  '/',
  '/about',
  '/faq',
  '/how-it-works',
  '/affiliate-disclosure',
  '/impressum',
  '/privacy',
  '/terms',
  '/cookie-policy',
  '/cookie-preferences',
  '/guides',
];

const templateRoutes = templateCatalog.map((template) => `/templates/${template.slug}`);
const guideRoutes = guideCatalog.map((guide) => `/guides/${guide.slug}`);
const allRoutes = Array.from(new Set([...staticRoutes, ...templateRoutes, ...guideRoutes]));

if (!existsSync(baseHtmlPath)) {
  console.error(`Base dist HTML not found: ${baseHtmlPath}`);
  process.exit(1);
}

const baseHtml = readFileSync(baseHtmlPath, 'utf8');

const writeRouteFile = (routePath, html) => {
  if (routePath === '/') {
    writeFileSync(baseHtmlPath, html, 'utf8');
    return;
  }

  const relativePath = routePath.replace(/^\//, '');
  const targetFile = path.join(distDir, relativePath, 'index.html');
  mkdirSync(path.dirname(targetFile), { recursive: true });
  writeFileSync(targetFile, html, 'utf8');
};

allRoutes.forEach((routePath) => {
  writeRouteFile(routePath, baseHtml);
});

console.log(`Created static route HTML shells for ${allRoutes.length} routes.`);
