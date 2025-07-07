# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for Infroid, a static website built with traditional web technologies. The site is deployed via GitHub Pages to the domain infroid.in.

## Technology Stack

- **Frontend**: HTML5, CSS3 (Bootstrap 3.4.0), JavaScript (jQuery 2.2.4/3.3.1)
- **Deployment**: GitHub Pages with custom domain (CNAME file)
- **No Build Process**: Direct static files, no compilation or bundling required
- **Analytics**: Google Analytics (multiple tracking IDs configured)

## Key Libraries and Frameworks

- Bootstrap 3.4.0 - CSS framework
- jQuery 2.2.4 and 3.3.1 - JavaScript library
- Font Awesome - Icon library
- Owl Carousel - Image/content slider
- Magnific Popup - Lightbox functionality
- Nice Select - Form styling
- Superfish - Navigation menu enhancement
- Animate.css - CSS animations

## Project Structure

- `/css/` - All stylesheets including Bootstrap, plugins, and main.css
- `/js/` - JavaScript files including jQuery, plugins, and main.js
- `/img/` - Image assets including logos and project screenshots
- `/fonts/` - Web fonts (Font Awesome, Linearicons)
- `/people/` - Individual portfolio pages for team members
- `index.html` - Main homepage
- `CNAME` - GitHub Pages custom domain configuration (infroid.in)

## Development Workflow

Since this is a static website without a build process:

1. **Edit files directly** - Make changes to HTML, CSS, or JavaScript files
2. **Test locally** - Open index.html in a web browser or use a local web server
3. **Deploy** - Commit and push to the master branch; GitHub Pages will automatically deploy

### Local Development Server Options

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed globally)
http-server

# PHP
php -S localhost:8000
```

## Key Files to Edit

- `index.html` - Main website content and structure
- `css/main.css` - Custom styles (avoid editing vendor CSS files)
- `js/main.js` - Custom JavaScript functionality
- `img/` - Add new images here, maintain consistent naming

## Code Patterns

### JavaScript Pattern
The site uses jQuery for DOM manipulation and event handling. All custom JavaScript is wrapped in:
```javascript
$(document).ready(function(){
    "use strict";
    // Code here
});
```

### CSS Organization
- Vendor CSS files are kept separate in `/css/`
- Custom styles are in `main.css`
- Use existing Bootstrap classes where possible

### Navigation
The site uses smooth scrolling for anchor links. Navigation menu items should link to section IDs (e.g., `#home`, `#offer`, `#about`).

## SEO and Meta Tags

Important meta tags are configured in the `<head>` section of index.html:
- Meta description and keywords for SEO
- Open Graph image for social sharing
- Google site verification
- Multiple Google Analytics tracking codes

## Deployment Notes

- Changes pushed to the master branch are automatically deployed via GitHub Pages
- The CNAME file must remain in the root directory for the custom domain to work
- Allow a few minutes for changes to propagate after pushing

## Common Tasks

### Adding a New Section
1. Add the HTML section in index.html with a unique ID
2. Add corresponding navigation menu item linking to #section-id
3. Style in main.css following existing patterns

### Adding Team Member Portfolio
1. Create a new directory under `/people/[name]/`
2. Follow the structure of existing portfolio directories
3. Include necessary CSS/JS files specific to the portfolio

### Updating Images
1. Optimize images before adding (use web-friendly formats and sizes)
2. Place in appropriate `/img/` subdirectory
3. Use descriptive filenames