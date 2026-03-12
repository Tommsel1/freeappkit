# CHECKLIST_FREEAPPKIT_GSC

## Zielbild nach Deploy
- Kanonische Domain ist `https://freeappkit.com`.
- `https://www.freeappkit.com/*` leitet per `301` auf `https://freeappkit.com/*`.
- `http://freeappkit.com/*` leitet per `301` auf `https://freeappkit.com/*`.
- `http://www.freeappkit.com/*` leitet per `301` auf `https://freeappkit.com/*`.
- `robots.txt` blockiert nicht pauschal und verweist auf `https://freeappkit.com/sitemap.xml`.
- Entscheidung für `https://freeappkit.com/templates/event-countdown-timer`: eigenständig indexierbar (self-canonical, in Sitemap, intern verlinkt).

## URLs nach Deploy in GSC prüfen
- `https://freeappkit.com/`
- `https://freeappkit.com/robots.txt`
- `https://freeappkit.com/sitemap.xml`
- `https://freeappkit.com/templates/event-countdown-timer`
- `https://www.freeappkit.com/`
- `http://freeappkit.com/`
- `http://www.freeappkit.com/`

## URLs bewusst nicht indexieren
- Diese Host-Varianten nur per Redirect, nicht indexieren:
- `https://www.freeappkit.com/*`
- `http://freeappkit.com/*`
- `http://www.freeappkit.com/*`
- Nicht existierende Template-Slugs, z. B. `https://freeappkit.com/templates/does-not-exist` (liefert `noindex` in der Template-Notfound-Variante).

## Curl-Tests (nach Deploy)
- `curl -I https://www.freeappkit.com/`
- Erwartung: `301` + `Location: https://freeappkit.com/`
- `curl -I http://freeappkit.com/`
- Erwartung: `301` + `Location: https://freeappkit.com/`
- `curl -I http://www.freeappkit.com/`
- Erwartung: `301` + `Location: https://freeappkit.com/`
- `curl -i https://freeappkit.com/robots.txt`
- Erwartung: kein pauschales `Disallow: /` und `Sitemap: https://freeappkit.com/sitemap.xml`
- `curl -s https://freeappkit.com/templates/event-countdown-timer | grep -i canonical`
- Erwartung: `https://freeappkit.com/templates/event-countdown-timer`
- `curl -s https://freeappkit.com/sitemap.xml | grep event-countdown-timer`
- Erwartung: URL ist enthalten
- `curl -s https://freeappkit.com/sitemap.xml | grep -E "http://|www\\.freeappkit\\.com"`
- Erwartung: keine Ausgabe

## Browser-Tests (nach Deploy)
- `https://www.freeappkit.com/templates/event-countdown-timer` aufrufen und Redirect zu `https://freeappkit.com/templates/event-countdown-timer` prüfen.
- In der finalen Zielseite im HTML-Quelltext den Canonical prüfen.
- In GSC URL-Prüfung für `https://freeappkit.com/templates/event-countdown-timer` starten und "Vom Googlebot gecrawlt" sowie "Kanonische URL" kontrollieren.
