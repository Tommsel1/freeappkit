# Accessibility Report (WCAG 2.2 AA)

Stand: 2026-03-12  
Scope: Header, Footer, Navigation, Template-Galerie, Filter, Buttons, Cookie-Banner/Modal, FAQ-Akkordeon, Seiten-Landmarks.

## Prüfmethodik
- Code-Review gegen WCAG-2.2-AA-relevante Kriterien (Semantik, Tastatur, Fokus, Name/Role/Value, Dialogverhalten).
- Build-/Render-Validierung (`npm run build` erfolgreich).
- Hinweis: `npx axe` war lokal nicht ausführbar (CLI im Projekt nicht vorhanden), daher keine automatische Axe-Ausgabe.

## Umgesetzte Verbesserungen
- Skip-to-content ergänzt (`.skip-link`) und `main`-Landmarken konsistent adressierbar/fokussierbar gemacht:
  - `id="main-content"` + `tabIndex={-1}` auf allen Hauptseiten.
- Globale sichtbare Fokuszustände verbessert (`:focus-visible` für Links/Buttons/Inputs/Switches).
- Header-Navigation keyboard-fest gemacht:
  - Mobile-Menü mit `aria-expanded`, `aria-controls`, `aria-label`.
  - Legal-Dropdown mit `aria-haspopup="menu"`, `aria-expanded`, Escape/Outside-Close, `role="menu"`/`role="menuitem"`.
- FAQ-Akkordeon semantisch ergänzt:
  - `aria-expanded`, `aria-controls`, panel `role="region"` + `aria-labelledby`.
- Template-Filter verbessert:
  - Toolbar-Rolle + Label, Buttons mit `aria-pressed`.
- Icon-only Controls beschriftet:
  - Cookie-Modal Close-Button mit `aria-label`.
- Cookie-Modal als zugänglicher Dialog gehärtet:
  - `role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-describedby`.
  - Fokus beim Öffnen in Dialog.
  - Tab-Fokusfalle und Escape-Schließen.
  - Fokus-Rückgabe an auslösendes Element.
- Toggle-Switches mit eindeutiger Beschriftung (`aria-labelledby`) statt generischem SR-Text.
- Dekorative Icons als `aria-hidden` markiert (z. B. Herz im Footer).
- Problematische Pseudo-Links (`href="#"`) im Footer in echte Buttons umgestellt.

## Offene Risiken / Restpunkte
- Kontrast einzelner sekundärer Grautöne auf dunklem Hintergrund (insb. kleine Schrift) kann je nach Messpunkt knapp sein; visuelle Nachmessung empfohlen.
- Viele Motion-Effekte (Framer Motion) nutzen noch kein globales `prefers-reduced-motion`-Fallback.
- Eingebettete `iframe`-Inhalte stammen von Drittseiten (`*.hostingersite.com`) und liegen außerhalb dieses Repos; deren A11y ist nicht vollständig steuerbar.

## Lokale Testschritte
1. `npm run dev` starten.
2. Nur per Tastatur testen:
   - `Tab` auf Seite: Skip-Link sichtbar, Sprung zu `main`.
   - Header-Menüs vollständig ohne Maus bedienbar.
   - Cookie-Modal: Fokus bleibt im Dialog, `Escape` schließt.
   - FAQ-Akkordeon: Auf-/Zuklappen per Tastatur.
3. Screenreader-Smoke-Test:
   - Menü-Zustände (`expanded/collapsed`) und Akkordeon-Zustände ansagen lassen.
4. Optional: externes Axe/Lighthouse gegen laufende URL ausführen.
