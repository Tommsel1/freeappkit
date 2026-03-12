# Legal Tech Checklist

Stand: 2026-03-12

## 1) Seitenabdeckung (Legal/Cookie)
- `/privacy` vorhanden
- `/impressum` vorhanden
- `/affiliate-disclosure` vorhanden (vergleichbare Disclosure-Seite)
- `/terms` neu ergänzt (technische Übersichtsseite)
- `/cookie-policy` neu ergänzt (technische Cookie-Übersichtsseite)
- `/cookie-preferences` neu ergänzt (direkter Einstiegsweg für Einstellungen)

## 2) Footer-/Navigation-Verlinkung
- Footer verlinkt jetzt konsistent auf:
  - Impressum
  - Datenschutz
  - Affiliate-Disclosure
  - Terms
  - Cookie-Policy
  - Cookie-Preferences
  - Cookie-Settings (Modal-Aktion)
- Header-Legal-Menü enthält dieselben Kernlinks inkl. Cookie-Settings.

## 3) Indexierbarkeit (technische Entscheidung)
- `index,follow` beibehalten:
  - `/privacy`
  - `/impressum`
  - `/affiliate-disclosure`
- `noindex,nofollow` gesetzt:
  - `/terms` (technischer Index, keine ausformulierten AGB)
  - `/cookie-policy` (Kurz-/Navigationsseite, inhaltlich nahe an Privacy)
  - `/cookie-preferences` (Funktionsseite zur Consent-Verwaltung)

## 4) Canonical/Sitemap-Konsistenz
- Canonical der neuen Seiten zeigt auf ihre eigene URL.
- `noindex`-Seiten sind nicht in `public/sitemap.xml` enthalten.
- Sitemap enthält weiterhin nur indexierbare Kernseiten + Template-Seiten.

## 5) Rechtlicher Inhalt (bewusst nicht erfunden)
- Keine neuen ausformulierten Rechtstexte/AGB erfunden.
- Neue Seiten sind als technische Navigations-/Steuerseiten umgesetzt.
- Für finale juristische Texte (v. a. echte AGB/Terms) bleibt fachliche Prüfung notwendig.

## Lokale Testschritte
1. `npm run build`
2. Prüfen:
   - `dist/terms/index.html` -> `robots: noindex, nofollow`
   - `dist/cookie-policy/index.html` -> `robots: noindex, nofollow`
   - `dist/cookie-preferences/index.html` -> `robots: noindex, nofollow`
3. Footer/Header durchklicken und sicherstellen, dass alle Legal-/Cookie-Ziele erreichbar sind.
