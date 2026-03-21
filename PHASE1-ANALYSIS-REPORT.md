# Phase 1 Analysis Report (Pre-Fix Snapshot)

Date: 2026-03-21
Repository: freeappkit.com (Vite + React SPA)

## Executive Summary
- The app is a React 18 + Vite SPA with 10 static pages, one dynamic template detail route, and 24 tool slugs.
- Core compliance basics already present: `ads.txt`, publisher ID, `www -> non-www` redirect, `<html lang>`, and no external Google Fonts.
- Critical gaps before fixes: legal details in Impressum/Privacy, Consent Mode v2 region list, Hostinger artifacts, lack of true content pre-rendering.

## Phase 0 Mandatory Checks (Before Fix)
- `ads.txt`: PASS (`public/ads.txt` contains `google.com, pub-4653533937550770, DIRECT, f08c47fec0942fa0`)
- Publisher ID consistency: PASS (`ca-pub-4653533937550770` in source)
- Impressum mandatory items: FAIL (missing required authority + hosting details and exact operator formatting)
- Privacy mandatory items: FAIL (missing explicit AdSense legal basis with Pub-ID, hosting legal basis, localStorage disclosure clarity, authority details)
- `www -> non-www` in `vercel.json`: PASS
- Consent Mode v2 region list in default object: FAIL (missing `region` array)
- `<html lang>`: PASS (`lang="en"` + dynamic language switching)
- No external Google Fonts: PASS
- Accessibility basics: PARTIAL (skip-link + focus-visible present; reduced-motion CSS missing)
- Hostinger references removed: FAIL (generator meta, `.htaccess` header, content references)

## Project Structure
- Routing and app shell: `src/App.jsx`, `src/main.jsx`, `index.html`
- Pages: `src/pages/*`
- Components: `src/components/*`
- I18n dictionaries: `src/i18n/en.js`, `src/i18n/de.js`
- Tool catalog (24 templates): `src/data/templateCatalog.js`
- Consent/ads policy: `src/context/CookieContext.jsx`, `src/components/GoogleScripts.jsx`, `src/lib/sitePolicy.js`
- Build/SEO scripts: `tools/generate-sitemap.js`, `tools/generate-llms.js`, `tools/prerender-routes.js`
- Deployment config: `vercel.json`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`

## Routes (from `src/App.jsx`)
- `/` -> `HomePage`
- `/about` -> `AboutPage`
- `/faq` -> `FAQPage`
- `/how-it-works` -> `HowItWorksPage`
- `/affiliate-disclosure` -> `AffiliateDisclosurePage`
- `/impressum` -> `ImpressumPage`
- `/privacy` -> `PrivacyPage`
- `/terms` -> `TermsPage`
- `/cookie-policy` -> `CookiePolicyPage`
- `/cookie-preferences` -> `CookiePreferencesPage`
- `/templates/:slug` -> `TemplateDetailPage`

Additional route instances: 24 template slugs in `templateCatalog`.

## Content Audit (Estimated, pre-fix)
- `/`: substantial; includes tool catalog overview and category filtering.
- `/about`, `/faq`, `/how-it-works`, `/affiliate-disclosure`, `/privacy`: substantial.
- `/impressum`: moderate.
- `/terms`, `/cookie-policy`, `/cookie-preferences`: thin-to-moderate.
- `/templates/:slug`: thin textual depth (tool rendered mainly via external iframe).

## Technical Audit
- Libraries: React, React Router, Framer Motion, Tailwind, Helmet, Lucide.
- External services/scripts: Google Analytics and AdSense loaded post-consent; 24 external iframe URLs; Unsplash hero image.
- Current prerender script (`tools/prerender-routes.js`) duplicates route HTML and updates meta, but does not inject fully rendered page body content.

## SEO & Meta Audit (Pre-fix)
- Canonicals and basic title/description are present through `SeoHead`.
- robots/sitemap/llms artifacts exist.
- JSON-LD exists globally in `index.html` only.
- Missing/weak: route-level structured data strategy, AI crawler directives, and true SSR-like pre-rendered body content.

## AdSense & Consent Audit (Pre-fix)
- `ads.txt`: correct.
- Consent UI: present (banner + modal, localStorage persistence).
- Consent Mode v2: default/update calls present, but missing required regional configuration in the default object.
- No explicit ad slot markup (`adsbygoogle`) detected in app pages.

## Known Issues (Pre-fix)
- Hostinger references in source/meta/config content.
- Placeholder lorem strings in unused legal translation keys.
- No catch-all route (`*`) for unknown paths.
- `tools/generate-llms.js` route Map check uses `routes.length` instead of `routes.size`.
- No reduced-motion CSS override.

## Notes
- Tool functionality inside external iframes cannot be fully validated from this repo alone.
- This file is intentionally a pre-fix snapshot and will be superseded by `AUDIT-REPORT.md` after implementation.
