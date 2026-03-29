import puppeteer from 'puppeteer-core';
import { templateCatalog } from '../src/data/templateCatalog.js';

const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const calculators = templateCatalog.filter((t) =>
  (t.tags || []).some((tag) => /calculator/i.test(tag)) || /calculator/i.test(t.slug) || /calculator/i.test(t.name)
);

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const results = [];

for (const calc of calculators) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    const response = await page.goto(calc.iframeUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('body', { timeout: 15000 });

    const snapshot = await page.evaluate(() => {
      const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
      const title = document.title;
      const h1 = clean(document.querySelector('h1')?.textContent || '');
      const labels = Array.from(document.querySelectorAll('label'))
        .map((el) => clean(el.textContent))
        .filter(Boolean)
        .slice(0, 12);
      const placeholders = Array.from(document.querySelectorAll('input[placeholder], textarea[placeholder]'))
        .map((el) => clean(el.getAttribute('placeholder') || ''))
        .filter(Boolean)
        .slice(0, 12);
      const inputNames = Array.from(document.querySelectorAll('input,select,textarea'))
        .map((el) => clean(el.getAttribute('name') || el.getAttribute('id') || el.getAttribute('aria-label') || ''))
        .filter(Boolean)
        .slice(0, 12);
      const buttons = Array.from(document.querySelectorAll('button,input[type="submit"]'))
        .map((el) => clean(el.textContent || el.value || ''))
        .filter(Boolean)
        .slice(0, 12);

      return {
        title,
        h1,
        labels,
        placeholders,
        inputNames,
        buttons,
        inputCount: document.querySelectorAll('input,select,textarea').length,
      };
    });

    results.push({
      slug: calc.slug,
      name: calc.name,
      url: calc.iframeUrl,
      status: response?.status() ?? null,
      consoleErrors,
      ...snapshot,
    });
  } catch (error) {
    results.push({
      slug: calc.slug,
      name: calc.name,
      url: calc.iframeUrl,
      error: String(error),
      consoleErrors,
    });
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
