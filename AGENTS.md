# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Overview

This repository is the static marketing site for **Infroid**, an independent product company. It is hosted on GitHub Pages at `infroid.in` and deploys from `master`.

The primary company line is:

> Everyday problems. Solved all the way through.

The core Infroid product doctrine is:

> Build products that solve everyday problems as comprehensively as possible. Use modern tools and technologies where they create meaningful leverage. Select new products for both their standalone value and the compounding effect they can have on the existing Infroid system.

Current product surfaces include:

- **ContextHub** — living project context for teams using AI coding agents.
- **EDP Assist** — governed, read-only, plan-driven analytics in Jupyter.
- **EaseMyDisease** — user-controlled personal health information and care continuity.
- **MyFoodCraving** — explainable personalized nutrition, guided cooking and local chefs.

Do not frame the company around a fixed number of products. Do not describe the portfolio as `context → evidence → care → action` or imply that every product exists to illustrate ContextHub's philosophy.

Each product must receive comparable narrative seriousness and retain its own user, problem and complete value loop.

## Portfolio Compounding

The compounding narrative lives in `systems.html`.

The key rule is:

> Products stay themselves. Capabilities compound.

ContextHub is an important shared capability for Infroid's software-development process and can support current project knowledge across the portfolio. It is **not** the parent product or the company metaphor.

The other products also contribute reusable capabilities:

- EDP Assist contributes governed, inspectable analytical patterns.
- EaseMyDisease contributes longitudinal health continuity and user-controlled sharing patterns.
- MyFoodCraving contributes explainable recommendation-to-execution and routine patterns.

A product earns its place twice:

1. it solves a practical everyday problem deeply on its own;
2. building it leaves Infroid more capable of solving future problems.

Do not force cross-product integrations. Combinations should preserve clear purpose, product independence and user control.

## Company Direction

Infroid is being structured around steward-ownership and perpetual-purpose principles.

Do not state that Infroid is already legally constituted as a Perpetual Purpose Trust. The public site explicitly says the jurisdiction-specific binding legal structure is still being formalised.

The stewardship story exists to protect Infroid's ability to follow its product doctrine over a long horizon. It should not overpower the product story.

## Site Architecture

```text
/
├── index.html              # Home / product doctrine
├── products.html           # Product portfolio
├── systems.html            # Compounding capabilities and product combinations
├── contexthub.html         # ContextHub product page
├── edp-assist.html         # EDP Assist product page
├── easemydisease.html      # EaseMyDisease product page
├── myfoodcraving.html      # MyFoodCraving product page
├── about.html              # Purpose / product doctrine / stewardship
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

Lead with the everyday problem and the complete product loop.

Avoid generic terms such as:

- modern IT solutions
- AI-powered solutions
- digital transformation
- affordable solutions
- development/customization services

Also avoid company-level language that over-indexes on ContextHub concepts such as `complex context`, `canonical context`, `one truth`, `context layer`, or `context → evidence → action`, unless discussing ContextHub itself or a technically relevant system interaction.

Modern technology is leverage, not Infroid's identity. The problem and outcome should remain primary.

### Product balance

- Do not lead with a product count such as `four products` or `four systems`.
- Do not number product hero labels to imply a hierarchy.
- Use equal card structure and comparable copy depth across products on company-level pages.
- Do not describe any product as a prerequisite, module, add-on or backend for another.
- ContextHub may be described as a shared software-development capability, but not as the parent of EDP Assist, EaseMyDisease or MyFoodCraving.

### Claims

Do not invent user counts, hospital adoption, clinical outcomes, regulatory approvals or product availability.

For EaseMyDisease:

- do not claim diagnosis or disease prediction;
- do not say it replaces doctors or emergency services;
- do not publish regulatory/compliance claims without separately verified evidence.

For MyFoodCraving:

- preserve the general-wellness / not-medical-advice boundary;
- dietary identity, allergies and intolerances are hard eligibility constraints;
- optional health markers may prioritize nutritional goals.

For cross-product systems:

- describe sharing as selective, purposeful and user-controlled;
- do not imply unrestricted shared databases or automatic vault access;
- do not force ContextHub vocabulary onto health or food products.

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

Deploy by updating `master`; GitHub Pages handles public deployment.

## Testing Checklist

Before publishing:

1. Parse all HTML without structural errors.
2. Check duplicate IDs.
3. Verify local `.html` links and anchors resolve.
4. Validate `sitemap.xml` as XML.
5. Parse `assets/css/portfolio.css` for CSS syntax errors.
6. Test light and dark themes.
7. Test mobile navigation.
8. Check the company pages and all product pages at mobile and desktop widths.
9. Confirm external product links use `target="_blank" rel="noopener"`.
10. Run a browser/Lighthouse pass when the environment provides a usable browser runtime.
