# Graph Report - .  (2026-04-26)

## Corpus Check
- Corpus is ~9,222 words - fits in a single context window. You may not need a graph.

## Summary
- 58 nodes · 76 edges · 7 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Product Lineup & UI Components|Product Lineup & UI Components]]
- [[_COMMUNITY_Brand Identity & Visual System|Brand Identity & Visual System]]
- [[_COMMUNITY_Studio Thesis & About Page|Studio Thesis & About Page]]
- [[_COMMUNITY_Site Structure & Shared Layout|Site Structure & Shared Layout]]
- [[_COMMUNITY_Project Conventions & Theme System|Project Conventions & Theme System]]
- [[_COMMUNITY_TypeWriter Animation Module|TypeWriter Animation Module]]
- [[_COMMUNITY_Home Hero Section|Home Hero Section]]

## God Nodes (most connected - your core abstractions)
1. `Index (Home) Page` - 7 edges
2. `Contact Page` - 6 edges
3. `Brand Color Palette (Black, White, Red, Yellow, Blue)` - 6 edges
4. `EaseMyDisease Product Entry` - 5 edges
5. `Shared Stylesheet` - 5 edges
6. `Shared Script` - 5 edges
7. `CLAUDE.md Project Guidance` - 5 edges
8. `Theme System (data-theme + localStorage)` - 5 edges
9. `Infroid Logo Brandmark` - 5 edges
10. `TypeWriter` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Three Principles (Deep, Few, Lean)` --semantically_similar_to--> `About Values (Taste, Rigor, Kind)`  [INFERRED] [semantically similar]
  index.html → about.html
- `CLAUDE.md Project Guidance` --references--> `Shared Script`  [EXTRACTED]
  CLAUDE.md → assets/js/script.js
- `AGENTS.md Codex Guidance` --semantically_similar_to--> `CLAUDE.md Project Guidance`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `Index (Home) Page` --references--> `Shared Script`  [EXTRACTED]
  index.html → assets/js/script.js
- `About Page` --references--> `Shared Script`  [EXTRACTED]
  about.html → assets/js/script.js

## Hyperedges (group relationships)
- **Three Products / One Philosophy** — product_contexthub, product_easemydisease, product_myfoodcraving, concept_thesis [EXTRACTED 0.95]
- **Shared Page Chrome (Nav + Footer + Theme Switcher across all pages)** — shared_nav, shared_footer, shared_theme_switcher, index_page, about_page, contact_page, products_page [EXTRACTED 0.95]
- **Agent Guidance Doc Pair (Codex + Claude)** — agentsmd_doc, claudemd_doc, concept_theme_system, concept_animation_strategy [INFERRED 0.85]

## Communities

### Community 0 - "Product Lineup & UI Components"
Cohesion: 0.26
Nodes (13): Company Timeline (2018-2026), ch CLI Tool, Contact Form, Topic Pill Selector, Trio Grid Product Cards, ContextHub (Product Concept), EaseMyDisease (Product Concept), MyFoodCraving (Product Concept) (+5 more)

### Community 1 - "Brand Identity & Visual System"
Cohesion: 0.21
Nodes (12): Scalloped Wavy Badge/Seal Shape, Infroid Technologies Brand Identity, Infroid Logo Brandmark, Black (Primary Background), Blue (Outer Border Ring), Brand Color Palette (Black, White, Red, Yellow, Blue), Red (Inner Border Ring), White (Glyph Foreground) (+4 more)

### Community 2 - "Studio Thesis & About Page"
Cohesion: 0.22
Nodes (9): About Team Section, About Thesis Section, About Values (Taste, Rigor, Kind), Infroid Technologies (Studio), Remote-first India Studio Shape, Few Products / Patience to Be Right Thesis, Three Principles (Deep, Few, Lean), Thesis Manifesto Quote (+1 more)

### Community 3 - "Site Structure & Shared Layout"
Cohesion: 0.44
Nodes (9): About Page, Contact Page, Index Contact Strip, Index (Home) Page, Products Page, Shared Site Footer, Shared Site Navigation, Shared Script (+1 more)

### Community 4 - "Project Conventions & Theme System"
Cohesion: 0.48
Nodes (7): AGENTS.md Codex Guidance, CLAUDE.md Project Guidance, Intersection Observer Animation Strategy, Theme System (data-theme + localStorage), Inline Theme Init Script, Rationale: Theme Init Before DOM Load Prevents Flash, Theme Switcher Button

### Community 5 - "TypeWriter Animation Module"
Cohesion: 0.5
Nodes (1): TypeWriter

### Community 8 - "Home Hero Section"
Cohesion: 1.0
Nodes (1): Home Hero Section

## Knowledge Gaps
- **16 isolated node(s):** `Home Hero Section`, `Thesis Manifesto Quote`, `Index Contact Strip`, `About Thesis Section`, `About Team Section` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `TypeWriter Animation Module`** (5 nodes): `typing.js`, `TypeWriter`, `.constructor()`, `.type()`, `typing.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Hero Section`** (1 nodes): `Home Hero Section`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Infroid Technologies (Studio)` connect `Studio Thesis & About Page` to `Product Lineup & UI Components`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `Company Timeline (2018-2026)` connect `Product Lineup & UI Components` to `Studio Thesis & About Page`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `EaseMyDisease Product Entry` (e.g. with `ContextHub Product Entry` and `MyFoodCraving Product Entry`) actually correct?**
  _`EaseMyDisease Product Entry` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Home Hero Section`, `Thesis Manifesto Quote`, `Index Contact Strip` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._