# CLAUDE.md

This file provides guidance to Claude Code and other coding agents working in this repository.

## Project Overview

This repository is the static marketing site for **Infroid**, an independent product studio. It is hosted on GitHub Pages at `infroid.in` and deploys from `master`.

The primary brand line is:

> Complex context. Clear action.

Infroid has four independent product theses:

1. **ContextHub** — AI context infrastructure. One living context layer for coding agents.
2. **EDP Assist** — governed, read-only, plan-driven agentic analytics in Jupyter.
3. **EaseMyDisease** — user-controlled personal health context and care coordination.
4. **MyFoodCraving** — explainable personalized nutrition, guided cooking and local chefs.

The portfolio story is that each product is complete on its own, while scoped context/evidence handoffs can create stronger systems. Do not describe any product as a prerequisite, module, add-on or backend for another.

The compounding portfolio narrative lives in `systems.html`. Its key rule is:

> Products own domains. Handoffs move the minimum context required for a clear purpose.

`systems.html` also presents two proposed Infroid product theses:

- **Infroid Relay** — typed, purpose-scoped Context Capsules and Evidence Cards with provenance, consent and expiry.
- **Infroid Observatory** — read-only longitudinal personal analytics using user-selected EMD and MFC context with EDP Assist-style governed analysis.

These are presented as product theses, not as currently deployed product capabilities.

## Site Architecture

```text
/
├── index.html              # Home / company thesis
├── products.html           # Four-product overview
├── systems.html            # Six product pairings + Relay / Observatory theses
├── contexthub.html         # ContextHub product page
├── edp-assist.html         # EDP Assist product page
├── easemydisease.html      # EaseMyDisease product page
├── myfoodcraving.html      # MyFoodCraving product page
├── about.html              # Studio story / principles / timeline
├── robots.txt
├── sitemap.xml
├── CNAME                   # infroid.in
└── assets/
    ├── css/styles.css      # Original site system
    ├── css/portfolio.css   # Portfolio, product-detail and Systems additions
    ├── js/script.js        # Theme, nav and copyright year
    └── images/
```

## Technology

- HTML5, CSS3, vanilla JavaScript.
- No build step or package manager.
- Google Fonts is the only external front-end dependency.
- GitHub Pages deploys `master`.

## Brand and Content Rules

### Positioning

Lead with the actual product mechanism. Avoid generic terms such as:

- modern IT solutions
- AI-powered solutions
- digital transformation
- affordable solutions
- development/customization services

Do not repeatedly frame Infroid as slow, tiny or anti-growth. The company is independent and focused; the tone should communicate technical seriousness rather than limitation.

### Product status

Do not reintroduce `Closed beta`, `Experimental`, or maturity badges as the primary product-card metadata. Use domain labels such as `AI context infrastructure`, `Agentic analytics`, `Personal health`, and `Personalized nutrition`.

### Claims

Do not invent user counts, hospital adoption, clinical outcomes, regulatory approvals or product availability.

For EaseMyDisease:

- do not claim diagnosis or disease prediction;
- do not say it replaces doctors or emergency services;
- do not publish regulatory/compliance claims without separately verified evidence.

For MyFoodCraving:

- preserve the general-wellness / not-medical-advice boundary;
- dietary identity, allergies and intolerances are described as hard eligibility constraints;
- optional health markers may prioritize nutritional goals.

For cross-product systems:

- describe them as scoped, user-controlled handoffs;
- do not imply unrestricted shared databases or automatic vault access;
- keep purpose, provenance, consent and expiry visible in the narrative.

## Theme System

CSS custom properties are defined in `assets/css/styles.css` and overridden under `[data-theme="light"]`.

Each page performs theme initialization inline in `<head>` before the main scripts load:

1. use `localStorage.theme` when present;
2. otherwise honor `prefers-color-scheme`.

The nav theme toggle is handled by `assets/js/script.js`.

## Development

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Deploy by updating `master`; GitHub Pages handles the public deployment.

## Adding a Page

Mirror the metadata and theme initialization of an existing product detail page. Every public page should include:

- description;
- canonical URL;
- Open Graph metadata;
- Twitter metadata;
- theme-color metadata;
- favicon;
- `styles.css` and `portfolio.css` where portfolio components are used;
- skip link;
- primary nav;
- `<main id="main">`;
- site footer;
- `assets/js/script.js`.

Add the URL to `sitemap.xml`.

## Testing Checklist

Before publishing:

1. Parse all HTML without structural errors.
2. Check duplicate IDs.
3. Verify local `.html` links and anchors resolve.
4. Validate `sitemap.xml` as XML.
5. Parse `assets/css/portfolio.css` for CSS syntax errors.
6. Test light and dark themes.
7. Test mobile navigation.
8. Check the four product pages and Systems page at mobile and desktop widths.
9. Confirm external product links use `target="_blank" rel="noopener"`.
10. Run a browser/Lighthouse pass when the environment provides a usable browser runtime.
