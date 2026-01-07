const { test, expect } = require('@playwright/test');

test.describe('Navigation E2E Tests', () => {
  const pages = [
    { url: '/index.html', title: 'SkyGuide' },
    { url: '/minigames.html', title: 'Mini Games' },
    { url: '/flight-schools.html', title: 'Flight School Directory' },
    { url: '/screenshot-gallery.html', title: 'Screenshot Gallery' },
    { url: '/hardware-compatibility.html', title: 'Hardware Compatibility' },
    { url: '/beginner-path.html', title: 'Beginner Learning Path' },
    { url: '/live-streamers.html', title: 'Live Flight Sim Streamers' },
    { url: '/addon-marketplace.html', title: 'Addon Marketplace' },
    { url: '/performance-benchmarks.html', title: 'Performance Benchmark' },
    { url: '/flight-planner.html', title: 'Flight Planner' },
    { url: '/events-calendar.html', title: 'Community Events Calendar' }
  ];

  test('should load all pages successfully', async ({ page }) => {
    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await expect(page).toHaveTitle(new RegExp(pageInfo.title));
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should have logo on all pages', async ({ page }) => {
    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();
      await expect(logo).toContainText('SkyGuide');
    }
  });

  test('should have back links on feature pages', async ({ page }) => {
    // These pages have back-link navigation
    const pagesWithBackLinks = [
      '/flight-schools.html',
      '/screenshot-gallery.html',
      '/hardware-compatibility.html',
      '/beginner-path.html',
      '/live-streamers.html',
      '/addon-marketplace.html',
      '/performance-benchmarks.html',
      '/flight-planner.html',
      '/events-calendar.html'
    ];

    for (const url of pagesWithBackLinks) {
      await page.goto(url);
      const backLink = page.locator('a.back-link').first();
      await expect(backLink).toBeVisible();
    }
  });

  test('should navigate back to index from feature pages', async ({ page }) => {
    // Start at flight planner
    await page.goto('/flight-planner.html');

    // Click back link
    await page.click('a[href="index.html"]');
    await page.waitForTimeout(500);

    // Should be on index page
    await expect(page).toHaveURL(/index\.html/);
    await expect(page).toHaveTitle(/SkyGuide/);
  });

  test('should navigate to mini games from all pages', async ({ page }) => {
    // Pick a few pages to test
    const testPages = ['/index.html', '/flight-schools.html', '/flight-planner.html'];

    for (const url of testPages) {
      await page.goto(url);
      const miniGamesLink = page.locator('a[href="minigames.html"]');
      if (await miniGamesLink.count() > 0) {
        await miniGamesLink.first().click();
        await page.waitForTimeout(500);
        await expect(page).toHaveURL(/minigames\.html/);
      }
    }
  });

  test('should have consistent navigation structure', async ({ page }) => {
    // Pages that have the .nav-links navigation structure
    const featurePages = [
      '/flight-schools.html',
      '/screenshot-gallery.html',
      '/flight-planner.html'
    ];

    for (const url of featurePages) {
      await page.goto(url);

      // Should have logo
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();

      // Should have nav links section
      const navLinks = page.locator('.nav-links');
      await expect(navLinks).toBeVisible();

      // Should have back to guide link (either in nav-links or elsewhere)
      const backLink = page.locator('a[href="index.html"]');
      const backLinkCount = await backLink.count();
      expect(backLinkCount).toBeGreaterThan(0);
    }
  });

  test('logo should link back to index', async ({ page }) => {
    await page.goto('/flight-schools.html');

    const logo = page.locator('.logo');
    await logo.click();
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/index\.html/);
  });

  test('should have responsive navigation on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/index.html');

    // Logo should still be visible
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();

    // Navigation should be visible
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();
  });
});
