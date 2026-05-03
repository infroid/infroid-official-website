# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing site for Infroid Technologies, a deep-tech studio. Hosted on GitHub Pages at the custom domain `infroid.in`. The site is a brief/metadata hub for three products; the live products live on their own domains:

- ContextHub — https://contexthub.one
- EaseMyDisease — closed beta, contact-only
- MyFoodCraving — https://myfoodcraving.com

## Technology Stack

- **Frontend**: HTML5, CSS3, vanilla JavaScript (ES6+)
- **Hosting**: GitHub Pages (deployed from `master`)
- **No build step, no package manager.** Only external dependency is Google Fonts.

## Architecture

### Directory Structure

```
/
├── index.html        # Home
├── products.html     # Product overviews (each links out to its own site)
├── about.html        # Studio / thesis / timeline
├── robots.txt
├── sitemap.xml
├── CNAME             # infroid.in
└── assets/
    ├── css/styles.css   # Single stylesheet, mobile-first, theme tokens
    ├── js/script.js     # Nav, theme toggle, copyright year
    └── images/          # Logo, etc.
```

### Theme System

CSS custom properties on `:root`, overridden under `[data-theme="light"]`. Initial theme is set by an inline `<script>` in each `<head>` before stylesheets parse, to avoid FOUC:

1. If `localStorage.theme` is set, use it.
2. Otherwise honor `prefers-color-scheme`.
3. Default to dark.

The toggle button in the nav contains both `.icon-sun` and `.icon-moon` SVGs; CSS in `styles.css` shows the appropriate one for the active theme.

### JavaScript

Everything lives in `assets/js/script.js`. It is small on purpose:

- Sets the footer copyright year.
- Toggles a `.scrolled` class on the nav past 12 px scroll (passive listener).
- Mobile nav: open/close on toggle click; close on link click, outside click, or `Escape`.
- Theme switcher: flips `data-theme` and persists to `localStorage`.

There is no scroll-triggered animation system, no preloader, no typing effect. If you find docs or code that imply otherwise, treat them as stale.

## Development

```bash
# Serve locally:
python3 -m http.server 8000
# then http://localhost:8000

# Deploy:
git push origin master   # GitHub Pages auto-deploys
```

## Common Tasks

### Adding a section

Sections use the `.wrap` container and the `.eyebrow` / heading pattern visible across the existing files:

```html
<section class="section" id="section-id">
    <div class="wrap">
        <div class="eyebrow accent"><span class="dot"></span>Label</div>
        <h2 class="display-md">Section title</h2>
        <!-- content -->
    </div>
</section>
```

### Theme colors

Edit CSS variables in `assets/css/styles.css`:

1. Define base palette tokens in `:root` (e.g. `--ink-*`, `--brand-signal`).
2. Map to semantic tokens (`--bg`, `--fg`, `--accent`).
3. Override in `[data-theme="light"]` if needed.

Also update the two `<meta name="theme-color">` tags in each HTML file if the base bg colors change.

### Adding a page

When adding a new `.html` file:

- Mirror the `<head>` of an existing page: description, theme-color metas, canonical, OG/Twitter tags, fonts, stylesheet, inline theme init.
- Add the skip link, nav, `<main id="main">`, and footer.
- Add a `<url>` entry to `sitemap.xml`.

### Updating a product link

Product CTAs on `products.html` link to the product's own domain with `target="_blank" rel="noopener"`. The home page trio cards link to product anchors on `products.html`, not directly to product sites — the products page is the brief/hub.

## Code Conventions

- **CSS**: BEM-ish (`.component`, `.component-element`), mobile-first media queries.
- **JavaScript**: ES6+, `const`/`let`, no transpilation.
- **HTML**: Semantic elements, `aria-*` where it helps, indentation matches the existing files.
- **Git**: Commit to feature branches; merge to `master` for deploy.

## Testing Checklist

Before pushing:

1. Both themes load correctly (toggle, reload, system preference).
2. Mobile menu opens, closes on link/outside-click/Escape.
3. Skip-to-content link appears on first Tab and jumps to `#main`.
4. No console errors; no 404s in the network tab.
5. External product links open in a new tab and are correct.
6. Run a quick Lighthouse pass for SEO/accessibility regressions.
