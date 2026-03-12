# Consent-Flow (DSGVO-orientiert)

Stand: 2026-03-12

## Kategorien
- `necessary` (immer aktiv)
- `statistics` (optional)
- `marketing` (optional)

## Speicher- und Versionsmodell
- Consent-Key: `freeappkit-cookie-consent`
- Preferences-Key: `freeappkit-cookie-preferences`
- Version: `freeappkit-cookie-consent-version`
- Timestamp: `freeappkit-cookie-consent-updated-at`
- Legacy-Migration: alte Keys (`cookieConsent`, `cookiePreferences`) werden gelesen und ins neue Schema überführt.

## Ablauf
1. Initial:
- Standard ist deny-by-default für optionale Verarbeitungen.
- Google Consent Mode wird mit `denied` initialisiert.

2. Banner sichtbar solange keine Entscheidung:
- `Accept all` setzt `statistics=true`, `marketing=true`.
- `Reject all` setzt beide auf `false`.
- `Customize` öffnet den Einstellungen-Dialog.

3. Modal:
- Notwendige Cookies sind fix aktiv.
- Statistik/Marketing können granular gesetzt werden.
- Speichern persistiert Auswahl + Version + Zeitstempel.

4. Skript-Gating:
- Google Analytics wird nur bei `statistics=true` geladen.
- AdSense wird nur bei `marketing=true` und aktivem Feature-Flag geladen.
- Bei Entzug optionaler Zustimmung werden zuvor geladene optionale Skript-Tags entfernt.

5. Wiederaufruf:
- Cookie-Einstellungen jederzeit über Footer/Header.
- Zusätzlich Route `/cookie-preferences` als direkter Einstieg.
