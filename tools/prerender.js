import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import puppeteer from 'puppeteer-core';
import { templateCatalog } from '../src/data/templateCatalog.js';
import { guideCatalog } from '../src/data/guideCatalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

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

const mimeTypeByExtension = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const resolveRequestPath = (urlPathname) => {
  const cleanPath = decodeURIComponent(urlPathname.split('?')[0]);
  const directPath = path.join(distDir, cleanPath);

  if (existsSync(directPath) && path.extname(directPath)) {
    return directPath;
  }

  const indexPath = path.join(distDir, cleanPath, 'index.html');
  if (existsSync(indexPath)) {
    return indexPath;
  }

  const htmlPath = path.join(distDir, cleanPath);
  if (existsSync(htmlPath)) {
    return htmlPath;
  }

  return path.join(distDir, 'index.html');
};

const createStaticServer = (port) =>
  createServer((req, res) => {
    try {
      const reqPath = req.url || '/';
      const filePath = resolveRequestPath(reqPath);
      const ext = path.extname(filePath);
      const contentType = mimeTypeByExtension[ext] || 'text/html; charset=utf-8';
      const file = readFileSync(filePath);

      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(file);
    } catch (error) {
      res.statusCode = 500;
      res.end(`Static server error: ${error.message}`);
    }
  }).listen(port, '127.0.0.1');

const writeRouteHtml = (routePath, html) => {
  if (routePath === '/') {
    writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const relativePath = routePath.replace(/^\//, '');
  const targetFile = path.join(distDir, relativePath, 'index.html');
  mkdirSync(path.dirname(targetFile), { recursive: true });
  writeFileSync(targetFile, html, 'utf8');
};

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

async function prerender() {
  const port = Number(process.env.PRERENDER_PORT || 4173);
  const origin = `http://127.0.0.1:${port}`;
  const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';

  if (!existsSync(path.join(distDir, 'index.html'))) {
    console.error('dist/index.html not found. Run `npm run build` first.');
    process.exit(1);
  }

  const server = createStaticServer(port);
  let browser;

  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const routePath of allRoutes) {
      const page = await browser.newPage();
      const url = `${origin}${routePath}`;

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForSelector('#main-content, main, h1', { timeout: 20000 }).catch(() => null);
      await wait(450);

      const html = await page.content();
      writeRouteHtml(routePath, html);
      await page.close();
      console.log(`Prerendered ${routePath}`);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    await new Promise((resolve) => server.close(resolve));
  }

  console.log(`Finished prerendering ${allRoutes.length} routes.`);
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
