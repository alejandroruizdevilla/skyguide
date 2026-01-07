# 🚀 Quick Start Guide - SkyGuide Testing

Simple step-by-step guide to get testing up and running.

## ⚡ 3-Minute Setup

### Step 1: Install Node.js

Download and install from: **https://nodejs.org/**

Choose the LTS (Long Term Support) version.

### Step 2: Install Dependencies

Open Terminal and navigate to your project:

```bash
cd /Users/alejandroruizdevillamas/Documents/Projecto
```

Install everything:

```bash
npm install
```

This will take 1-2 minutes.

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

This downloads test browsers (Chromium, Firefox, WebKit).

## ✅ You're Ready! Run Tests

### Run Unit Tests (Jest)

```bash
npm test
```

Expected output:
```
PASS  tests/flight-planner.test.js
PASS  tests/dark-mode.test.js
PASS  tests/filters.test.js
PASS  tests/beginner-path.test.js

Test Suites: 4 passed, 4 total
Tests:       45 passed, 45 total
```

### Run E2E Tests (Playwright)

```bash
npm run test:e2e
```

Expected output:
```
Running 30 tests using 5 workers

  30 passed (25.3s)
```

### Run All Tests

```bash
npm run test:all
```

## 📊 View Test Results

### Coverage Report

```bash
npm run test:coverage
```

Then open: `coverage/index.html` in your browser

### Playwright HTML Report

After running E2E tests:

```bash
npx playwright show-report
```

## 🎯 Common Commands

| Command | What It Does |
|---------|-------------|
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode (auto-rerun) |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run E2E tests (headless) |
| `npm run test:e2e:headed` | Run E2E tests (see browser) |
| `npm run test:e2e:ui` | Run E2E tests (interactive UI) |
| `npm run test:all` | Run all tests |

## 🐛 Troubleshooting

### "npm: command not found"

Node.js isn't installed. Download from https://nodejs.org/

### "Cannot find module"

Run: `npm install`

### "Playwright browsers not found"

Run: `npx playwright install`

### "Port 8080 already in use"

Change port in `playwright.config.js` line 9:
```javascript
command: 'python3 -m http.server 8081',
url: 'http://localhost:8081',
```

### Tests are slow

- Close other applications
- Run fewer tests: `npm test -- flight-planner.test.js`
- Use headless mode: `npm run test:e2e` (default)

## 📚 Next Steps

1. ✅ Read [TESTING.md](TESTING.md) for detailed documentation
2. ✅ Read [README.md](README.md) for project overview
3. ✅ Write your own tests using examples
4. ✅ Set up CI/CD pipeline

## 💡 Pro Tips

### Watch Mode for Development

```bash
npm run test:watch
```

Tests automatically rerun when you save files. Perfect for TDD!

### Debug a Specific Test

```bash
npm test -- -t "should calculate flight time"
```

### Run E2E Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Headed Mode for Debugging

```bash
npm run test:e2e:headed
```

Watch the browser execute tests in real-time!

### UI Mode for Interactive Debugging

```bash
npm run test:e2e:ui
```

Step through tests, see traces, screenshots, and more!

## 📝 Test File Locations

**Unit Tests (Jest):**
- `tests/flight-planner.test.js`
- `tests/dark-mode.test.js`
- `tests/filters.test.js`
- `tests/beginner-path.test.js`

**E2E Tests (Playwright):**
- `e2e-tests/dark-mode.spec.js`
- `e2e-tests/flight-planner.spec.js`
- `e2e-tests/filters.spec.js`
- `e2e-tests/beginner-path.spec.js`
- `e2e-tests/navigation.spec.js`

## ⏱️ Expected Test Times

- **Unit Tests:** ~5 seconds
- **E2E Tests:** ~25 seconds
- **All Tests:** ~30 seconds

## 🎉 Success!

If you see green checkmarks ✅, everything is working!

Need help? Check [TESTING.md](TESTING.md) for detailed troubleshooting.

---

**Happy Testing!** 🧪
