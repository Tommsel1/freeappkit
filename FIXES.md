# freeappkit.com Fixes (2026-03-06)

## Projektstatus
- Das vorliegende Projekt ist ein **Vite/React SPA** (kein Next.js-Projekt).
- SEO-, Security- und Routing-Fixes wurden daher für Vite + Vercel umgesetzt.

## 1) SEO / Indexing Fixes

### 1.1 robots.txt
- Neue Datei: `public/robots.txt`
- Inhalt:
  - `User-agent: *`
  - `Allow: /`
  - `Sitemap: https://freeappkit.com/sitemap.xml`
- Es gibt keine blockierende `Disallow: /`-Regel im Projekt.

### 1.2 Sitemap
- Neu: `tools/generate-sitemap.js`
- Build generiert automatisch `public/sitemap.xml` mit:
  - Core-Seiten (`/`, `/about`, `/faq`, `/how-it-works`, `/affiliate-disclosure`, `/impressum`, `/privacy`)
  - allen Template-Detailseiten (`/templates/<slug>`)
- Build-Script erweitert:
  - `node tools/generate-sitemap.js`

### 1.3 Canonical-Fix für Template-Seiten
- Harte globale Canonical aus `index.html` entfernt (hatte alle Routen auf `/` gezogen).
- Neue SEO-Komponente: `src/components/SeoHead.jsx`
- Neue Template-Routen:
  - `src/pages/TemplateDetailPage.jsx`
  - Route in `src/App.jsx`: `/templates/:slug`
- Template-Daten zentralisiert:
  - `src/data/templateCatalog.js` (inkl. Slugs)
- Karten verlinken jetzt crawlbar auf interne Detailseiten:
  - `src/components/TemplateCard.jsx`
  - `src/components/TemplatesGrid.jsx`

### 1.4 Statische SEO-HTML-Dateien pro Route (wichtig für Search Console/curl)
- Neu: `tools/prerender-routes.js`
- Nach `vite build` werden für alle SEO-Routen eigene HTML-Dateien in `dist/.../index.html` erzeugt, inkl.:
  - route-spezifischer `<title>`
  - route-spezifischer `<meta name="description">`
  - route-spezifischer `<link rel="canonical">`
  - `og:url`, `twitter:url`
- Build-Script erweitert:
  - `node tools/prerender-routes.js`

## 2) Redirects + Security Headers (Vercel)

### 2.1 Redirects
- Neu: `vercel.json`
- Enthält:
  - `www.freeappkit.com` -> `https://freeappkit.com/:path*` (301)
  - HTTP -> HTTPS via `x-forwarded-proto` (301)

### 2.2 Security Headers
- In `vercel.json` gesetzt:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Content-Security-Policy` mit Freigaben für:
    - GTM/GA/AdSense
    - eingebettete Template-iframes (`*.hostingersite.com`)
    - Standard-Härtungen (`object-src 'none'`, `frame-ancestors 'self'`, etc.)

## 3) Template Security / Consent / DSGVO

### 3.1 iframe-Härtung
- In `TemplateCard` und `TemplateDetailPage`:
  - `sandbox="allow-scripts allow-same-origin"`
  - `referrerPolicy="no-referrer"`
  - `loading="lazy"` (wo sinnvoll)

### 3.2 Consent Mode v2
- `src/components/GoogleScripts.jsx` überarbeitet:
  - `gtag('consent', 'default', ...)` wird vor optionalem Script-Load gesetzt
  - danach `consent update` nach Nutzerpräferenz
  - GA-Script lädt nur bei Analytics-Opt-in
  - AdSense-Script lädt nur bei Ads-Opt-in

### 3.3 Google Fonts DSGVO
- Externe Google-Font-Requests entfernt:
  - kein `@import fonts.googleapis.com`
  - keine `preconnect`-Tags zu Google Fonts
- Lokal gehostete Inter-Schrift via `@fontsource/inter`:
  - Importe in `src/main.jsx`

## 4) Dependency Audit

### Durchgeführt
- `npm audit --audit-level=moderate`
- `npm audit fix`

### Ergebnis
- Viele Findings wurden automatisch behoben.
- Verbleibend: 2 moderate Vulnerabilities im `esbuild`/`vite`-Pfad, nur per Breaking Update lösbar:
  - `npm audit fix --force` würde auf `vite@7` heben.

## 5) Verifikation (lokal)

### Build + Lint
- `npm run build` -> erfolgreich
- `npm run lint` -> erfolgreich

### robots/sitemap/canonical
- `robots.txt` liefert:
  - `Allow: /`
  - `Sitemap: https://freeappkit.com/sitemap.xml`
- `sitemap.xml` enthält:
  - `https://freeappkit.com/templates/event-countdown-timer`
- `curl http://127.0.0.1:4173/templates/event-countdown-timer | grep canonical` liefert:
  - `https://freeappkit.com/templates/event-countdown-timer`

### Template-Routen
- Alle Template-Detailseiten liefern lokal HTTP 200.

## 6) Wichtige manuelle Schritte (nicht per Code möglich)

1. Vercel Deployment Protection prüfen:
   - Project Settings -> Deployment Protection
   - Für Production deaktivieren.
2. Cloudflare WAF prüfen:
   - Regel `cf.client.bot` muss auf `Skip` stehen (nicht `Block`).
3. Deployment auf Vercel ausführen:
   - `vercel --prod` (CLI war in der aktuellen Umgebung nicht installiert).

## 7) Post-Deploy Checkliste

Nach dem Deploy direkt ausführen:

```bash
curl -I https://freeappkit.com/
curl -I https://www.freeappkit.com/
curl -I http://freeappkit.com/
curl -s https://freeappkit.com/robots.txt
curl -s https://freeappkit.com/sitemap.xml | grep event-countdown-timer
curl -s https://freeappkit.com/templates/event-countdown-timer | grep -i canonical
```

Erwartung:
- `www` und `http` leiten per 301 auf `https://freeappkit.com/...`
- `robots.txt` enthält `Allow: /`
- Canonical für Event-Template zeigt auf:
  - `https://freeappkit.com/templates/event-countdown-timer`
