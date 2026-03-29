import puppeteer from 'puppeteer-core';
import { templateCatalog } from '../src/data/templateCatalog.js';

const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const results = [];

for (const template of templateCatalog) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    const response = await page.goto(template.iframeUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('body', { timeout: 15000 });

    const snapshot = await page.evaluate(() => {
      const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
      const title = clean(document.title);
      const h1 = clean(document.querySelector('h1')?.textContent || '');
      const h2 = clean(document.querySelector('h2')?.textContent || '');
      const buttons = Array.from(document.querySelectorAll('button,input[type="submit"]'))
        .map((el) => clean(el.textContent || el.value || ''))
        .filter(Boolean)
        .slice(0, 8);
      return {
        title,
        h1,
        h2,
        buttonPreview: buttons,
        inputCount: document.querySelectorAll('input,select,textarea').length,
      };
    });

    results.push({
      slug: template.slug,
      name: template.name,
      status: response?.status() ?? null,
      url: template.iframeUrl,
      consoleErrors,
      ...snapshot,
    });
  } catch (error) {
    results.push({
      slug: template.slug,
      name: template.name,
      status: null,
      url: template.iframeUrl,
      error: String(error),
      consoleErrors,
    });
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
