# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (Spanish/English) interactive educational website for teaching version control with Git, specifically designed for neurodivergent university students. The project is a single-file static HTML application with embedded CSS and JavaScript.

## Technology Stack

- **HTML5**: Single-file structure with semantic markup
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)
- **Vanilla JavaScript**: All interactivity and state management
- **External Dependencies**:
  - Tailwind CSS (CDN)
  - Google Fonts (Poppins, Space Mono)
  - Phosphor Icons

## Development Workflow

Since this is a static HTML project with no build process:

1. **Local Development**: Open `index.html` directly in a web browser
2. **No build commands**: No package.json, npm scripts, or build tools required
3. **No dependencies to install**: Everything is loaded via CDN

## Project Structure

```
/
├── README.md           # Comprehensive project documentation (Spanish)
├── RESEARCH.md         # Detailed pedagogical guide and research
├── index.html          # Main application file (all-in-one)
└── CLAUDE.md          # This file
```

## Key Features and Architecture

### Bilingual Support
- Language switching via toggle in header
- All text uses `data-lang-es` and `data-lang-en` attributes
- Language preference stored in localStorage

### Theme System
- Three themes: Light, Dark, Auto (follows system preference)
- CSS custom properties for consistent theming
- Theme preference stored in localStorage

### Interactive Components
The application includes several educational interactive components:
- Drag-and-drop terminology matching
- Git workflow simulators
- Branch visualization tools
- CI/CD pipeline animations
- Collaboration workflow demonstrations

### Accessibility Considerations
- Neuroaffirmative design with collapsible sections (accordion pattern)
- High-contrast colors and readable typography
- Semantic HTML structure
- Responsive design for all screen sizes

## Code Style and Conventions

### CSS
- Uses CSS custom properties for theming
- BEM-like naming for component styles
- Utility-first approach with Tailwind classes

### JavaScript
- Modern ES6+ syntax
- Event-driven architecture
- Local storage for persistence
- Modular functions for different features

### HTML
- Semantic structure with proper heading hierarchy
- Accessibility attributes where needed
- Bilingual content using data attributes

## Making Changes

When editing this project:

1. **Content Changes**: Modify the HTML directly in `index.html`
2. **Styling**: Either add Tailwind classes or extend the `<style>` section
3. **Interactivity**: Add JavaScript in the `<script>` section at the bottom
4. **Testing**: Open `index.html` in multiple browsers to verify changes

## Special Considerations

- This is an educational project with Spanish as the primary language
- Interactive components are designed for pedagogical purposes
- The single-file architecture makes deployment simple but requires careful organization of code within that file
- All external dependencies are loaded via CDN, ensuring the project remains portable