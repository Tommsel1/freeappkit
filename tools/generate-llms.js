#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { templateCatalog } from '../src/data/templateCatalog.js';
import { guideCatalog } from '../src/data/guideCatalog.js';

const SITE_URL = 'https://freeappkit.com';
const outputPath = path.join(process.cwd(), 'public', 'llms.txt');

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

fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`llms.txt generated with ${templateCatalog.length} tools and ${guideCatalog.length} guides.`);
