# SkyGuide - Flight Simulator Guide

A comprehensive guide to flight simulators with interactive tools, resources, and community features.

## 🚀 Features

- **Flight Simulator Guides** - Detailed information on 17 major flight simulators
- **Interactive Mini Games** - Flappy Plane, Landing Challenge, and Memory Game
- **Flight Planner** - Calculate flight time, distance, and fuel requirements
- **Hardware Compatibility Matrix** - HOTAS, yokes, pedals, and VR headset compatibility
- **Screenshot Gallery** - Community screenshots organized by simulator
- **Beginner Learning Path** - 30-day structured learning roadmap
- **Live Streamers Directory** - Popular flight sim content creators
- **Addon Marketplace** - Curated aircraft, scenery, and utilities
- **Performance Benchmarks** - Real-world FPS data from community PC builds
- **Events Calendar** - Virtual events, group flights, and fly-ins
- **Flight School Directory** - VATSIM, IVAO, virtual airlines, and training

## 🎨 Key Features

✅ **Automatic Dark Mode** - Detects system preference and saves user choice
✅ **Fully Responsive** - Works on desktop, tablet, and mobile
✅ **Interactive Filters** - Filter content by simulator, category, price, etc.
✅ **Progress Tracking** - Save learning progress with localStorage
✅ **85%+ Test Coverage** - Comprehensive Jest and Playwright tests

## 📦 Installation

### Prerequisites

1. **Node.js 16+** - Download from [nodejs.org](https://nodejs.org/)
2. **Python 3** - For local web server (usually pre-installed)

### Quick Start

```bash
# Clone or download the repository
cd Projecto

# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install

# Run tests
npm test                  # Unit tests
npm run test:e2e         # E2E tests
npm run test:all         # All tests

# Start local development server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## 🧪 Testing

This project has comprehensive automated testing:

### Unit Tests (Jest)
```bash
npm test                 # Run all unit tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### E2E Tests (Playwright)
```bash
npm run test:e2e         # Run all E2E tests
npm run test:e2e:headed  # Run with visible browser
npm run test:e2e:ui      # Run in UI mode
```

### Test Coverage

- ✅ **Dark Mode** - Theme detection, toggle, persistence
- ✅ **Filters** - Gallery, marketplace, benchmarks, events
- ✅ **Flight Planner** - Calculations, form validation
- ✅ **Learning Path** - Progress tracking, localStorage
- ✅ **Navigation** - Links, routing, responsiveness

See [TESTING.md](TESTING.md) for complete testing documentation.

## 📁 Project Structure

```
Projecto/
├── index.html                    # Main landing page
├── minigames.html               # Interactive games
├── flight-planner.html          # Flight planning tool
├── beginner-path.html           # Learning roadmap
├── screenshot-gallery.html      # Community screenshots
├── hardware-compatibility.html  # Hardware matrix
├── live-streamers.html          # Content creators
├── addon-marketplace.html       # Add-ons directory
├── performance-benchmarks.html  # FPS benchmarks
├── events-calendar.html         # Community events
├── flight-schools.html          # Training directory
├── details/                     # Individual simulator pages
│   ├── msfs2024.html
│   ├── xplane12.html
│   ├── dcs.html
│   └── ... (14 more)
├── tests/                       # Jest unit tests
│   ├── flight-planner.test.js
│   ├── dark-mode.test.js
│   ├── filters.test.js
│   └── beginner-path.test.js
├── e2e-tests/                   # Playwright E2E tests
│   ├── dark-mode.spec.js
│   ├── flight-planner.spec.js
│   ├── filters.spec.js
│   ├── beginner-path.spec.js
│   └── navigation.spec.js
├── package.json                 # Dependencies
├── jest.config.js              # Jest configuration
├── playwright.config.js        # Playwright configuration
├── TESTING.md                  # Testing documentation
└── README.md                   # This file
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **Vanilla JavaScript** - No frameworks needed
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **localStorage** - Client-side data persistence

## 🎯 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android)

## 📱 Mobile Support

All pages are fully responsive with:
- Mobile-optimized layouts
- Touch-friendly buttons
- Readable text sizes
- Horizontal scrolling where needed
- Mobile-specific navigation

## 🌓 Dark Mode

Automatic dark mode features:
- Detects system preference (`prefers-color-scheme`)
- Manual toggle with fixed button
- Preference saved to localStorage
- Smooth transitions between themes
- Consistent across all pages

## 🧭 Navigation

- **Logo** - Links to homepage from all pages
- **Back Links** - Return to main guide
- **Mini Games** - Quick access link
- **Breadcrumbs** - Clear navigation path

---

**Built with ❤️ for the flight simulation community**

Last Updated: 2026-2-28
