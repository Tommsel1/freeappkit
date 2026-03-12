# AdSense Readiness (Vorbereitung, nicht live)

Stand: 2026-03-12

## Implementierter technischer Rahmen
- Feature-Flag eingeführt:
  - `VITE_ENABLE_ADSENSE` (Default in `.env.example`: `false`)
- AdSense-Client konfigurierbar:
  - `VITE_ADSENSE_CLIENT`
- Consent-Gate:
  - AdSense-Skript nur bei `marketing`-Consent.
- Seiten-Gate:
  - Keine Ad-Ausspielung auf Legal-/Cookie-Pfaden:
    - `/privacy`, `/impressum`, `/affiliate-disclosure`, `/terms`, `/cookie-policy`, `/cookie-preferences`

## Skript-Ladebedingungen (GoogleScripts)
- AdSense wird nur geladen, wenn **alle** Bedingungen erfüllt sind:
  1. Consent gegeben
  2. `preferences.marketing === true`
  3. `VITE_ENABLE_ADSENSE === true`
  4. aktuelle Route ist nicht Legal/Cookie
- Bei Entzug von Marketing-Consent oder auf gesperrten Routen:
  - AdSense-Skript wird aus dem DOM entfernt.

## ads.txt
- Datei vorhanden und strukturiert:
  - `public/ads.txt`
- Enthält Publisher-Zeile:
  - `google.com, pub-4653533937550770, DIRECT, f08c47fec0942fa0`
- Kommentar ergänzt, dass Ausspielung zusätzlich technisch per Consent + Feature-Flag gated ist.

## Noch nicht live geschaltet (bewusst)
- Kein globaler Anzeigen-Render in Seitenkomponenten implementiert.
- Ohne `VITE_ENABLE_ADSENSE=true` bleibt Ads-Laden deaktiviert.

## Lokale Testschritte
1. `.env.example` nach `.env` übernehmen und folgende Varianten testen:
   - `VITE_ENABLE_ADSENSE=false`
   - `VITE_ENABLE_ADSENSE=true`
2. Mit Browser-DevTools prüfen:
   - Vor Consent keine Anfrage auf `pagead/js/adsbygoogle.js`.
   - Nach Marketing-Consent + aktivem Flag wird Skript geladen.
   - Bei Widerruf Marketing-Consent wird Skript entfernt.
3. Route-Test:
   - Mit Marketing-Consent auf `/privacy` und `/cookie-policy` wechseln.
   - Sicherstellen, dass AdSense dort nicht aktiv bleibt.
