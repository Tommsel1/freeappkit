#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { templateCatalog } from '../src/data/templateCatalog.js';
import { guideCatalog } from '../src/data/guideCatalog.js';

const SITE_URL = 'https://freeappkit.com';
const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
const fullOutputPath = path.join(process.cwd(), 'public', 'llms-full.txt');
const generatedDate = new Date().toISOString().slice(0, 10);

const categories = templateCatalog.reduce((accumulator, template) => {
  if (!accumulator[template.category]) {
    accumulator[template.category] = [];
  }
  accumulator[template.category].push(template);
  return accumulator;
}, {});

const mainPages = [
  { path: '/', label: 'Home', description: 'Overview of all free tools and templates.' },
  { path: '/guides', label: 'Guides', description: 'Collection of practical how-to guides.' },
  { path: '/about', label: 'About', description: 'Project mission and background.' },
  { path: '/faq', label: 'FAQ', description: 'Frequently asked questions and support info.' },
  { path: '/how-it-works', label: 'How It Works', description: 'Step-by-step usage workflow.' },
  { path: '/affiliate-disclosure', label: 'Affiliate Disclosure', description: 'Transparency about partner links.' },
  { path: '/impressum', label: 'Impressum', description: 'Legal notice and operator details.' },
  { path: '/privacy', label: 'Privacy Policy', description: 'Privacy and data processing details.' },
  { path: '/terms', label: 'Terms', description: 'Legal document index page.' },
  { path: '/cookie-policy', label: 'Cookie Policy', description: 'Cookie categories and consent model.' },
  { path: '/cookie-preferences', label: 'Cookie Preferences', description: 'Direct entry point to consent settings.' },
];

const lines = [];

lines.push('# FreeAppKit - Free 2026 Online Tools, Templates, and Guides');
lines.push('');
lines.push('> FreeAppKit is a free collection of online tools and template-based web apps for productivity, health, finance, design, and utility workflows.');
lines.push('');
lines.push('## About');
lines.push('FreeAppKit publishes no-signup tools, practical guides, and template pages with legal/privacy transparency, consent controls, and SEO-friendly static route output.');
lines.push('');
lines.push('## Main Pages');
mainPages.forEach((page) => {
  lines.push(`- [${page.label}](${SITE_URL}${page.path}): ${page.description}`);
});
lines.push('');
lines.push('## Tool Categories');

Object.entries(categories).forEach(([categoryName, templates]) => {
  lines.push('');
  lines.push(`### ${categoryName} (${templates.length})`);
  templates.forEach((template) => {
    lines.push(`- [${template.name}](${SITE_URL}/templates/${template.slug}): ${template.description}`);
  });
});

lines.push('');
lines.push(`## Guides (${guideCatalog.length})`);
guideCatalog.forEach((guide) => {
  lines.push(`- [${guide.title}](${SITE_URL}/guides/${guide.slug}): ${guide.metaDescription}`);
});

lines.push('');
lines.push('## Contact');
lines.push('Operator: Tom Silas Helmke, c/o Online-Impressum #4746, Europaring 90, 53757 Sankt Augustin, Germany');
lines.push('Email: tshfm78@gmail.com');
lines.push('');
lines.push('## AI Index');
lines.push(`- [Full AI Index](${SITE_URL}/llms-full.txt): Extended machine-readable listing of all tools, tags, guides, and URLs.`);

fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');

const fullLines = [];
fullLines.push('# FreeAppKit - llms-full');
fullLines.push('');
fullLines.push(`Generated: ${generatedDate}`);
fullLines.push(`Canonical: ${SITE_URL}/llms-full.txt`);
fullLines.push(`Main Index: ${SITE_URL}/llms.txt`);
fullLines.push('');
fullLines.push('## Site');
fullLines.push('- Name: FreeAppKit');
fullLines.push('- URL: https://freeappkit.com/');
fullLines.push('- Description: Free online tools, calculators, trackers, and practical guides.');
fullLines.push('- Language support: English, German');
fullLines.push('- Access: Free, no signup required');
fullLines.push('');
fullLines.push('## Tools');
templateCatalog.forEach((template) => {
  fullLines.push(`### ${template.slug}`);
  fullLines.push(`- Name: ${template.name}`);
  fullLines.push(`- URL: ${SITE_URL}/templates/${template.slug}`);
  fullLines.push(`- Category: ${template.category}`);
  fullLines.push(`- Tags: ${(template.tags || []).join(', ')}`);
  fullLines.push(`- Description: ${template.description}`);
  fullLines.push(`- External runtime: ${template.iframeUrl}`);
  fullLines.push('');
});

fullLines.push('## Guides');
guideCatalog.forEach((guide) => {
  fullLines.push(`### ${guide.slug}`);
  fullLines.push(`- Title: ${guide.title}`);
  fullLines.push(`- URL: ${SITE_URL}/guides/${guide.slug}`);
  fullLines.push(`- Focus keyword: ${guide.keyword}`);
  fullLines.push(`- Meta description: ${guide.metaDescription}`);
  fullLines.push(`- Related tools: ${(guide.relatedTemplates || []).join(', ')}`);
  fullLines.push('');
});

fullLines.push('## Legal and Policy');
fullLines.push(`- Privacy Policy: ${SITE_URL}/privacy`);
fullLines.push(`- Terms Overview: ${SITE_URL}/terms`);
fullLines.push(`- Cookie Policy: ${SITE_URL}/cookie-policy`);
fullLines.push(`- Affiliate Disclosure: ${SITE_URL}/affiliate-disclosure`);
fullLines.push(`- Impressum: ${SITE_URL}/impressum`);

fs.writeFileSync(fullOutputPath, `${fullLines.join('\n')}\n`, 'utf8');
console.log(`llms.txt and llms-full.txt generated with ${templateCatalog.length} tools and ${guideCatalog.length} guides.`);
