import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { templateCatalog } from '../src/data/templateCatalog.js';
import { guideCatalog } from '../src/data/guideCatalog.js';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4301';
const CHROME_PATH = process.env.CHROME_PATH || '/usr/bin/google-chrome';

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
const notFoundRoute = '/__audit_missing_route__';
const allRoutes = [...staticRoutes, ...templateRoutes, ...guideRoutes, notFoundRoute];

const slugToTemplate = new Map(templateCatalog.map((template) => [template.slug, template]));

const stopWords = new Set([
  'free', 'tool', 'tools', 'app', 'calculator', 'timer', 'generator', 'tracker', 'visualizer', 'live', 'daily',
  '3d', 'and', 'the', 'for', 'to', 'with', 'kit', 'freeappkit',
]);

const normalize = (value) => (value || '').toLowerCase().replace(/[^a-z0-9\säöüß-]/gi, ' ').replace(/\s+/g, ' ').trim();

const expectedKeywordOverrides = {
  'carbon-footprint-calculator': ['carbon', 'co2', 'footprint', 'fussabdruck', 'fußabdruck'],
  'salary-calculator': ['salary', 'gehalt', 'tax'],
  'tip-calculator': ['tip', 'bill'],
  'sleep-calculator': ['sleep', 'bedtime'],
  'compound-interest-calculator': ['compound', 'interest', 'investment'],
  'mortgage-calculator': ['mortgage', 'loan', 'amortization'],
  'bmi-calculator': ['bmi', 'body mass'],
  'live-age-calculator': ['age', 'birthday'],
  'ambient-sound-mixer': ['ambient', 'sound', 'mixer', 'noise'],
  'water-intake-tracker': ['water', 'hydration'],
};

const computeTextSignature = (text) => {
  const value = (text || '').slice(0, 15000);
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return `${value.length}:${hash}`;
};

const extractKeywords = (template) => {
  if (expectedKeywordOverrides[template.slug]) {
    return expectedKeywordOverrides[template.slug];
  }

  const words = normalize(template.name)
    .split(' ')
    .filter((word) => word && !stopWords.has(word));

  return Array.from(new Set(words));
};

const titleMatchesTemplate = (template, title, h1) => {
  const haystack = normalize(`${title} ${h1}`);
  const keywords = extractKeywords(template);

  if (keywords.length === 0) {
    return true;
  }

  return keywords.some((keyword) => haystack.includes(normalize(keyword)));
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const routeResults = [];
const externalResults = [];
const homeChecks = {};

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const route of allRoutes) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(String(error));
    });

    let status = null;
    let title = '';
    let h1 = '';
    let finalUrl = '';
    let hasMain = false;
    let hasHeader = false;
    let hasFooter = false;
    let routeError = null;
    let templateEmbed = null;

    try {
      const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      status = response?.status() ?? null;
      await page.waitForSelector('main, #main-content, h1', { timeout: 20000 }).catch(() => null);
      await wait(500);

      finalUrl = page.url();
      title = await page.title();
      h1 = await page.$eval('h1', (el) => (el.textContent || '').trim()).catch(() => '');
      hasMain = await page.$('main, #main-content').then(Boolean);
      hasHeader = await page.$('header').then(Boolean);
      hasFooter = await page.$('footer').then(Boolean);

      if (route === '/') {
        const filterButtons = await page.$$('[role="toolbar"] button');
        const filterResults = [];

        for (const [index, button] of filterButtons.entries()) {
          const label = await page.evaluate((element) => (element.textContent || '').replace(/\s+/g, ' ').trim(), button);
          await button.click();
          await wait(450);

          const uniqueTemplateCards = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('#templates a[href^="/templates/"]'));
            const hrefs = links.map((link) => link.getAttribute('href')).filter(Boolean);
            return Array.from(new Set(hrefs)).length;
          });

          filterResults.push({ index, label, uniqueTemplateCards });
        }

        const languageCheck = await page.evaluate(() => {
          const clickByText = (text) => {
            const target = Array.from(document.querySelectorAll('header button')).find(
              (button) => (button.textContent || '').trim() === text
            );
            if (!target) {
              return false;
            }
            target.click();
            return true;
          };

          const switchedToDe = clickByText('DE');
          const langAfterDe = document.documentElement.lang;
          const switchedToEn = clickByText('EN');
          const langAfterEn = document.documentElement.lang;

          return {
            switchedToDe,
            switchedToEn,
            langAfterDe,
            langAfterEn,
          };
        });

        await wait(350);

        const cookieModalOpened = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const customizeButton = buttons.find((button) => /customize|anpassen/i.test((button.textContent || '').trim()));
          if (!customizeButton) {
            return false;
          }
          customizeButton.click();
          return true;
        });

        if (cookieModalOpened) {
          await page.waitForSelector('[role="dialog"]', { timeout: 7000 }).catch(() => null);
        }

        const cookieChecks = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const dialog = document.querySelector('[role="dialog"]');
          const reject = buttons.find((button) => /reject all|alle ablehnen/i.test((button.textContent || '').trim()));
          if (reject) {
            reject.click();
          }

          const bannerStillVisible = Array.from(document.querySelectorAll('button')).some((button) =>
            /accept all|alle akzeptieren/i.test((button.textContent || '').trim())
          );

          const consentStatus = window.localStorage.getItem('freeappkit-cookie-consent');

          return {
            dialogPresent: Boolean(dialog),
            rejectClicked: Boolean(reject),
            bannerStillVisible,
            consentStatus,
          };
        });

        homeChecks.filterResults = filterResults;
        homeChecks.languageCheck = languageCheck;
        homeChecks.cookieChecks = cookieChecks;
      }

      if (route.startsWith('/templates/')) {
        const slug = route.replace('/templates/', '');
        const template = slugToTemplate.get(slug);

        const iframeMeta = await page.evaluate(() => {
          const iframe = document.querySelector('main iframe');
          if (!iframe) {
            return null;
          }

          return {
            src: iframe.getAttribute('src') || '',
            sandbox: iframe.getAttribute('sandbox') || '',
            title: iframe.getAttribute('title') || '',
          };
        });

        let frameUrl = null;
        let frameTitle = '';
        let frameH1 = '';
        let frameReady = false;

        const frameHandle = await page.$('main iframe');
        if (frameHandle) {
          const frame = await frameHandle.contentFrame();
          if (frame) {
            frameUrl = frame.url();
            await frame.waitForSelector('body', { timeout: 15000 }).catch(() => null);
            frameReady = true;
            frameTitle = await frame.title().catch(() => '');
            frameH1 = await frame.$eval('h1', (element) => (element.textContent || '').trim()).catch(() => '');
          }
        }

        const linkTargets = await page.evaluate(() =>
          Array.from(document.querySelectorAll('aside a[target="_blank"]')).map((link) => ({
            href: link.getAttribute('href') || '',
            rel: link.getAttribute('rel') || '',
            text: (link.textContent || '').replace(/\s+/g, ' ').trim(),
          }))
        );

        templateEmbed = {
          expectedUrl: template?.iframeUrl || '',
          iframeMeta,
          frameReady,
          frameUrl,
          frameTitle,
          frameH1,
          titleMatchesTemplate: template ? titleMatchesTemplate(template, frameTitle, frameH1) : false,
          linkTargets,
        };
      }
    } catch (error) {
      routeError = String(error);
    }

    routeResults.push({
      route,
      status,
      finalUrl,
      title,
      h1,
      hasMain,
      hasHeader,
      hasFooter,
      consoleErrors,
      pageErrors,
      routeError,
      templateEmbed,
    });

    await page.close();
  }

  for (const template of templateCatalog) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(String(error));
    });

    let status = null;
    let title = '';
    let h1 = '';
    let inputCount = 0;
    let buttonCount = 0;
    let interactionChanged = false;
    let textSignatureBefore = '';
    let textSignatureAfter = '';
    let externalError = null;

    try {
      const response = await page.goto(template.iframeUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      status = response?.status() ?? null;
      await page.waitForSelector('body', { timeout: 20000 });
      await wait(700);

      const beforeState = await page.evaluate(() => {
        const visibleText = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
        const signatureText = visibleText.slice(0, 15000);

        const controls = Array.from(document.querySelectorAll('input, select, textarea'));
        let modifiedControls = 0;

        controls.slice(0, 5).forEach((control, index) => {
          if (control.disabled || control.readOnly) {
            return;
          }

          if (control.tagName === 'SELECT') {
            const selectControl = control;
            if (selectControl.options.length > 1) {
              selectControl.selectedIndex = 1;
              selectControl.dispatchEvent(new Event('change', { bubbles: true }));
              modifiedControls += 1;
            }
            return;
          }

          if (control.type === 'checkbox' || control.type === 'radio') {
            control.click();
            modifiedControls += 1;
            return;
          }

          if (control.type === 'date') {
            control.value = '2026-12-31';
          } else if (control.type === 'time') {
            control.value = '12:30';
          } else if (control.type === 'email') {
            control.value = `audit${index + 1}@example.com`;
          } else if (control.type === 'number') {
            control.value = String((index + 1) * 10);
          } else {
            control.value = `audit-${index + 1}`;
          }

          control.dispatchEvent(new Event('input', { bubbles: true }));
          control.dispatchEvent(new Event('change', { bubbles: true }));
          modifiedControls += 1;
        });

        const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], [role="button"]'));
        const actionButton = buttons.find((button) =>
          /(calculate|berech|compute|start|run|generate|submit|save|convert|create|spin|track|test)/i.test(
            ((button.textContent || button.value || '') || '').trim()
          )
        ) || buttons[0];

        if (actionButton && !actionButton.disabled) {
          actionButton.click();
        }

        return {
          title: document.title,
          h1: (document.querySelector('h1')?.textContent || '').trim(),
          inputCount: document.querySelectorAll('input, select, textarea').length,
          buttonCount: buttons.length,
          signatureText,
          modifiedControls,
        };
      });

      await wait(900);

      const afterState = await page.evaluate(() => {
        const visibleText = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
        return visibleText.slice(0, 15000);
      });

      title = beforeState.title;
      h1 = beforeState.h1;
      inputCount = beforeState.inputCount;
      buttonCount = beforeState.buttonCount;
      textSignatureBefore = computeTextSignature(beforeState.signatureText);
      textSignatureAfter = computeTextSignature(afterState);
      interactionChanged = textSignatureBefore !== textSignatureAfter;
    } catch (error) {
      externalError = String(error);
    }

    externalResults.push({
      slug: template.slug,
      name: template.name,
      url: template.iframeUrl,
      status,
      title,
      h1,
      inputCount,
      buttonCount,
      interactionChanged,
      textSignatureBefore,
      textSignatureAfter,
      titleMatchesTemplate: titleMatchesTemplate(template, title, h1),
      consoleErrors,
      pageErrors,
      externalError,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

const routeFailures = routeResults.filter((result) =>
  result.status !== 200 || result.routeError || result.pageErrors.length > 0
);

const routeConsoleErrors = routeResults.filter((result) => result.consoleErrors.length > 0);

const templateEmbedIssues = routeResults
  .filter((result) => result.route.startsWith('/templates/'))
  .filter((result) => {
    const embed = result.templateEmbed;
    if (!embed) return true;
    if (!embed.iframeMeta || !embed.frameReady) return true;
    if (embed.expectedUrl && embed.iframeMeta.src !== embed.expectedUrl) return true;
    if (!embed.titleMatchesTemplate) return true;
    return false;
  });

const externalFailures = externalResults.filter((result) =>
  result.status !== 200 || result.externalError
);

const externalMismatch = externalResults.filter((result) => !result.titleMatchesTemplate);
const externalConsoleErrors = externalResults.filter((result) => result.consoleErrors.length > 0 || result.pageErrors.length > 0);
const externalNoInteractionChange = externalResults.filter((result) => !result.interactionChanged);

const summary = {
  scannedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  totals: {
    routes: routeResults.length,
    externalTemplates: externalResults.length,
  },
  findings: {
    routeFailures: routeFailures.length,
    routeConsoleErrors: routeConsoleErrors.length,
    templateEmbedIssues: templateEmbedIssues.length,
    externalFailures: externalFailures.length,
    externalMismatch: externalMismatch.length,
    externalConsoleErrors: externalConsoleErrors.length,
    externalNoInteractionChange: externalNoInteractionChange.length,
  },
};

const report = {
  summary,
  homeChecks,
  routeFailures,
  routeConsoleErrors,
  templateEmbedIssues,
  externalFailures,
  externalMismatch,
  externalConsoleErrors,
  externalNoInteractionChange,
  routeResults,
  externalResults,
};

const outputPath = path.join(process.cwd(), 'tools', 'tmp-full-audit-report.json');
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

console.log(`Audit report written to ${outputPath}`);
console.log(JSON.stringify(summary, null, 2));
