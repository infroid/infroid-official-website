# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for Infroid Technologies - a static website focused on healthcare technology and digital transformation solutions. The site is hosted on GitHub Pages with a custom domain (infroid.in).

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Hosting**: GitHub Pages
- **No Build Tools**: Direct file serving, no compilation needed
- **No Package Manager**: No dependencies beyond Google Fonts

## Architecture

### Directory Structure
```
/
├── index.html                      # Single-page application
└── assets/
    ├── css/styles.css             # Main stylesheet (mobile-first, theme system)
    ├── js/script.js               # Core functionality (theme, animations, navigation)
    └── js/typing.js               # TypeWriter animation class
```

### Key Architectural Patterns

1. **Theme System**: CSS custom properties with `data-theme` attribute on `<html>`
   - Variables defined in `:root` and overridden in `[data-theme="light"]`
   - Theme preference stored in localStorage as 'theme'
   - Respects system color scheme preferences

2. **Animation Strategy**: 
   - Intersection Observer for scroll-triggered animations
   - `.fade-in` class with `.visible` state
   - GPU-accelerated transforms only
   - Preloader with minimum 1.5s display time

3. **JavaScript Organization**:
   - Theme initialization before DOM load (prevents flash)
   - All DOM operations wrapped in DOMContentLoaded
   - Event listeners use passive option where applicable
   - Throttled scroll events with requestAnimationFrame

## Development Commands

Since this is a static site with no build process:

```bash
# Local development - choose one:
python -m http.server 8000              # Python 3
python -m SimpleHTTPServer 8000         # Python 2
npx http-server                         # Node.js
open index.html                         # Direct browser (limited functionality)

# Deploy changes:
git add .
git commit -m "Your commit message"
git push origin master                  # Auto-deploys via GitHub Pages

# View live site:
open https://infroid.in
```

## Common Development Tasks

### Adding New Sections
Sections follow this pattern in index.html:
```html
<section id="section-id" class="section">
    <div class="container">
        <span class="section-label">LABEL TEXT</span>
        <h2 class="section-title">Section Title</h2>
        <!-- Content -->
    </div>
</section>
```

### Adding Scroll Animations
In script.js, add selectors to the `elementsToAnimate` array:
```javascript
const elementsToAnimate = [
    '.hero-content',
    '.section-label',
    '.section-title',
    '.your-new-selector'  // Add here
];
```

### Modifying Theme Colors
Edit CSS variables in styles.css:
1. Define base color in `:root` (e.g., `--palette-new: #hexcode`)
2. Create semantic mapping (e.g., `--color-accent: var(--palette-new)`)
3. Override in `[data-theme="light"]` if needed
4. Use in components: `color: var(--color-accent)`

### Updating Typing Animation Messages
In typing.js, modify the `textArray`:
```javascript
this.textArray = [
    'Excellence Driven Results',
    'Your New Message Here'
];
```

## Code Conventions

- **CSS**: BEM-like naming (.component, .component-element), mobile-first media queries
- **JavaScript**: ES6+ features, const/let preferred, meaningful variable names
- **HTML**: Semantic elements, consistent indentation, accessibility attributes
- **Git**: Commit directly to master branch for deployment

## Performance Considerations

- Images should be optimized before adding (use WebP where possible)
- Animations use transform/opacity only (no layout properties)
- Lazy load images and content below the fold
- Keep JavaScript execution lightweight
- Test on mobile devices and slow connections

## Testing Checklist

Before pushing changes:
1. Test in both light and dark themes
2. Check responsive behavior (mobile, tablet, desktop)
3. Verify animations work smoothly
4. Test in multiple browsers (Chrome, Firefox, Safari)
5. Ensure no console errors
6. Check that theme preference persists after reload