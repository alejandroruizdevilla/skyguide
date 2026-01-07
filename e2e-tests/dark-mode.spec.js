const { test, expect } = require('@playwright/test');

test.describe('Dark Mode E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should have dark mode toggle button', async ({ page }) => {
    const darkModeToggle = await page.locator('#darkModeToggle');
    await expect(darkModeToggle).toBeVisible();
    await expect(darkModeToggle).toHaveText(/Dark Mode|Light Mode/);
  });

  test('should toggle dark mode on click', async ({ page }) => {
    const darkModeToggle = await page.locator('#darkModeToggle');
    const initialText = await darkModeToggle.textContent();

    // Click the toggle
    await darkModeToggle.click();

    // Wait for the theme to change
    await page.waitForTimeout(300);

    // Check the button text changed
    const newText = await darkModeToggle.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('should apply dark theme to document', async ({ page }) => {
    const darkModeToggle = await page.locator('#darkModeToggle');

    // Click to enable dark mode
    await darkModeToggle.click();
    await page.waitForTimeout(300);

    // Check the data-theme attribute
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    expect(theme).toBe('dark');
  });

  test('should persist dark mode preference in localStorage', async ({ page }) => {
    const darkModeToggle = await page.locator('#darkModeToggle');

    // Toggle dark mode
    await darkModeToggle.click();
    await page.waitForTimeout(300);

    // Check localStorage
    const savedTheme = await page.evaluate(() =>
      localStorage.getItem('theme')
    );

    expect(savedTheme).toBe('dark');
  });

  test('should remember theme preference after page reload', async ({ page }) => {
    const darkModeToggle = await page.locator('#darkModeToggle');

    // Set dark mode
    await darkModeToggle.click();
    await page.waitForTimeout(300);

    // Reload the page
    await page.reload();
    await page.waitForTimeout(500);

    // Check if dark mode is still active
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    expect(theme).toBe('dark');
  });

  test('should work on all major pages', async ({ page }) => {
    const pages = [
      '/index.html',
      '/minigames.html',
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

    for (const url of pages) {
      await page.goto(url);
      const darkModeToggle = await page.locator('#darkModeToggle');
      await expect(darkModeToggle).toBeVisible();

      // Toggle dark mode
      await darkModeToggle.click();
      await page.waitForTimeout(200);

      // Verify theme changed
      const theme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );
      expect(theme).toBeTruthy();
    }
  });
});
