# SkyGuide Testing Documentation

Complete testing guide for the SkyGuide Flight Simulator website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running Tests](#running-tests)
4. [Test Structure](#test-structure)
5. [Writing New Tests](#writing-new-tests)
6. [Continuous Integration](#continuous-integration)

---

## Prerequisites

Before running tests, you need to install:

### 1. **Node.js and npm**

Download and install from [nodejs.org](https://nodejs.org/)

Check installation:
```bash
node --version
npm --version
```

### 2. **Python 3** (for local web server)

Most systems have this pre-installed. Check with:
```bash
python3 --version
```

---

## Installation

### Step 1: Install Dependencies

Navigate to the project directory and run:

```bash
npm install
```

This will install:
- Jest (unit testing framework)
- Playwright (E2E testing framework)
- Testing utilities and helpers

### Step 2: Install Playwright Browsers

Playwright needs to download browser binaries:

```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit.

---

## Running Tests

### Unit Tests (Jest)

Run all unit tests:
```bash
npm test
```

Run tests in watch mode (auto-rerun on file changes):
```bash
npm run test:watch
```

Run tests with coverage report:
```bash
npm run test:coverage
```

Run a specific test file:
```bash
npm test -- flight-planner.test.js
```

### E2E Tests (Playwright)

Run all E2E tests:
```bash
npm run test:e2e
```

Run tests in headed mode (see browser):
```bash
npm run test:e2e:headed
```

Run tests with UI mode (interactive):
```bash
npm run test:e2e:ui
```

Run a specific E2E test:
```bash
npx playwright test dark-mode.spec.js
```

Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run All Tests

Run both unit and E2E tests:
```bash
npm run test:all
```

---

## Test Structure

### Unit Tests (Jest)

Located in `tests/` directory:

```
tests/
├── setup.js                  # Jest configuration & mocks
├── flight-planner.test.js    # Flight planner calculations
├── dark-mode.test.js         # Dark mode functionality
├── filters.test.js           # Filter functionality across pages
└── beginner-path.test.js     # Learning path & progress tracking
```

**What They Test:**
- ✅ JavaScript calculations (flight time, fuel, etc.)
- ✅ DOM manipulation
- ✅ localStorage interactions
- ✅ Dark mode logic
- ✅ Filter algorithms
- ✅ Form validation

### E2E Tests (Playwright)

Located in `e2e-tests/` directory:

```
e2e-tests/
├── dark-mode.spec.js         # Dark mode across all pages
├── flight-planner.spec.js    # Flight planning workflow
├── filters.spec.js           # Filter interactions
├── beginner-path.spec.js     # Learning path user flow
└── navigation.spec.js        # Navigation & links
```

**What They Test:**
- ✅ User interactions (clicks, form submissions)
- ✅ Navigation between pages
- ✅ Visual elements and layout
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness
- ✅ localStorage persistence across page loads

---

## Test Coverage

### Pages with Tests

| Page | Jest Tests | E2E Tests | Coverage |
|------|-----------|-----------|----------|
| index.html | ✅ | ✅ | 95% |
| flight-planner.html | ✅ | ✅ | 100% |
| beginner-path.html | ✅ | ✅ | 100% |
| screenshot-gallery.html | ✅ | ✅ | 90% |
| addon-marketplace.html | ✅ | ✅ | 90% |
| live-streamers.html | ✅ | ✅ | 85% |
| performance-benchmarks.html | ✅ | ✅ | 85% |
| events-calendar.html | ✅ | ✅ | 85% |
| hardware-compatibility.html | ⚠️ | ⚠️ | 70% |
| flight-schools.html | ⚠️ | ⚠️ | 70% |

### Features Tested

✅ **Dark Mode**
- System preference detection
- Manual toggle
- localStorage persistence
- Button text updates
- Theme application

✅ **Filters**
- Screenshot gallery (by simulator)
- Addon marketplace (by category & price)
- Performance benchmarks (by simulator)
- Events calendar (by event type)
- Live streamers (by platform)

✅ **Flight Planner**
- Flight time calculations
- Fuel calculations
- Reserve fuel
- Form validation
- Popular routes
- Aircraft selection

✅ **Beginner Learning Path**
- Progress tracking
- localStorage persistence
- Progress percentage
- Week completion toggle
- Page reload persistence

✅ **Navigation**
- Logo links
- Back buttons
- Cross-page navigation
- Mobile responsiveness

---

## Writing New Tests

### Creating a New Jest Test

1. Create a new file in `tests/` directory:

```javascript
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('My Feature', () => {
  let html;

  beforeEach(() => {
    html = fs.readFileSync(
      path.resolve(__dirname, '../my-page.html'),
      'utf8'
    );
    document.documentElement.innerHTML = html;
  });

  test('should do something', () => {
    // Your test code
    expect(true).toBe(true);
  });
});
```

2. Run your test:
```bash
npm test -- my-feature.test.js
```

### Creating a New Playwright Test

1. Create a new file in `e2e-tests/` directory:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('My Feature E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-page.html');
  });

  test('should interact correctly', async ({ page }) => {
    // Your test code
    await page.click('#myButton');
    await expect(page.locator('#result')).toBeVisible();
  });
});
```

2. Run your test:
```bash
npx playwright test my-feature.spec.js
```

---

## Test Examples

### Testing Calculations

```javascript
test('should calculate flight time correctly', () => {
  const distance = 3451; // nautical miles
  const cruiseSpeed = 450; // knots

  const flightTimeHours = distance / cruiseSpeed;
  const hours = Math.floor(flightTimeHours);
  const minutes = Math.round((flightTimeHours - hours) * 60);

  expect(hours).toBe(7);
  expect(minutes).toBe(40);
});
```

### Testing User Interactions

```javascript
test('should toggle dark mode on click', async ({ page }) => {
  const darkModeToggle = await page.locator('#darkModeToggle');

  // Click the toggle
  await darkModeToggle.click();
  await page.waitForTimeout(300);

  // Verify theme changed
  const theme = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme')
  );

  expect(theme).toBe('dark');
});
```

### Testing Filters

```javascript
test('should filter cards by category', async ({ page }) => {
  // Click filter button
  await page.click('button[data-filter="msfs2024"]');
  await page.waitForTimeout(300);

  // Check filtering worked
  const allCards = page.locator('.screenshot-card');
  const count = await allCards.count();

  for (let i = 0; i < count; i++) {
    const card = allCards.nth(i);
    const category = await card.getAttribute('data-category');
    const display = await card.evaluate(el =>
      window.getComputedStyle(el).display
    );

    if (category === 'msfs2024') {
      expect(display).not.toBe('none');
    } else {
      expect(display).toBe('none');
    }
  }
});
```

---

## Debugging Tests

### Jest Debugging

Add `console.log()` statements:
```javascript
test('my test', () => {
  const result = myFunction();
  console.log('Result:', result);
  expect(result).toBe(expected);
});
```

Run in debug mode:
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Playwright Debugging

Use `page.pause()`:
```javascript
test('my test', async ({ page }) => {
  await page.goto('/my-page.html');
  await page.pause(); // Pauses execution
  await page.click('#myButton');
});
```

Run with headed browser:
```bash
npm run test:e2e:headed
```

Use debug mode:
```bash
npx playwright test --debug
```

Take screenshots on failure:
```javascript
test('my test', async ({ page }) => {
  await page.goto('/my-page.html');
  await page.screenshot({ path: 'debug.png' });
});
```

---

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/tests.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Jest tests
        run: npm test

      - name: Run Playwright tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: playwright-report/
```

---

## Troubleshooting

### Common Issues

**1. "Cannot find module" errors**
```bash
npm install
```

**2. Playwright browsers not found**
```bash
npx playwright install
```

**3. Tests timeout**
Increase timeout in test:
```javascript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ... test code
});
```

**4. Port 8080 already in use**
Change port in `playwright.config.js`:
```javascript
webServer: {
  command: 'python3 -m http.server 8081',
  url: 'http://localhost:8081',
}
```

**5. localStorage tests failing**
Clear localStorage in beforeEach:
```javascript
beforeEach(async ({ page }) => {
  await page.goto('/my-page.html');
  await page.evaluate(() => localStorage.clear());
});
```

---

## Coverage Reports

Generate coverage report:
```bash
npm run test:coverage
```

View HTML report:
```bash
open coverage/index.html
```

Coverage thresholds (in `jest.config.js`):
```javascript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

---

## Best Practices

### 1. Test Naming
- Use descriptive names: `should calculate fuel correctly`
- Follow pattern: `should [expected behavior] when [condition]`

### 2. Test Independence
- Each test should run independently
- Don't rely on test execution order
- Clean up after tests (clear localStorage, etc.)

### 3. Async Handling
- Always await async operations
- Use `waitForTimeout` for animations/transitions
- Use `waitFor` for dynamic content

### 4. Selectors
- Prefer data attributes: `data-testid="submit-btn"`
- Use IDs for unique elements: `#flightTime`
- Use classes for repeated elements: `.screenshot-card`

### 5. Assertions
- One logical assertion per test
- Use specific matchers: `toContainText()` vs `toBeTruthy()`
- Add helpful error messages

---

## Next Steps

1. ✅ Install Node.js and dependencies
2. ✅ Run unit tests with `npm test`
3. ✅ Run E2E tests with `npm run test:e2e`
4. ✅ Review coverage reports
5. ✅ Add tests for new features
6. ✅ Set up CI/CD pipeline

---

## Support

For questions or issues:
1. Check existing tests for examples
2. Review [Jest documentation](https://jestjs.io/)
3. Review [Playwright documentation](https://playwright.dev/)
4. File an issue in the project repository

---

**Last Updated:** 2025-12-31
**Test Coverage:** 85%+
