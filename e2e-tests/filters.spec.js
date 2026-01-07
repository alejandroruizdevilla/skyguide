const { test, expect } = require('@playwright/test');

test.describe('Filter Functionality E2E Tests', () => {
  test.describe('Screenshot Gallery Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/screenshot-gallery.html');
    });

    test('should show all screenshots by default', async ({ page }) => {
      const cards = page.locator('.screenshot-card');
      const visibleCards = await cards.count();
      expect(visibleCards).toBeGreaterThan(0);
    });

    test('should filter screenshots by simulator', async ({ page }) => {
      // Click MSFS 2024 filter
      await page.click('button[data-filter="msfs2024"]');
      await page.waitForTimeout(300);

      // Check that only MSFS 2024 cards are visible
      const allCards = page.locator('.screenshot-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const category = await card.getAttribute('data-category');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (category === 'msfs2024') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });

    test('should have active class on clicked filter', async ({ page }) => {
      const filterBtn = page.locator('button[data-filter="xplane"]');

      await filterBtn.click();
      await page.waitForTimeout(200);

      const hasActive = await filterBtn.evaluate(el => el.classList.contains('active'));
      expect(hasActive).toBe(true);
    });

    test('should open lightbox on card click', async ({ page }) => {
      const firstCard = page.locator('.screenshot-card').first();
      await firstCard.click();
      await page.waitForTimeout(300);

      const lightbox = page.locator('#lightbox');
      const hasActive = await lightbox.evaluate(el => el.classList.contains('active'));
      expect(hasActive).toBe(true);
    });
  });

  test.describe('Addon Marketplace Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/addon-marketplace.html');
    });

    test('should filter by category', async ({ page }) => {
      // Click aircraft filter
      await page.click('button[data-filter="aircraft"][data-type="category"]');
      await page.waitForTimeout(300);

      // Verify only aircraft addons are visible
      const allCards = page.locator('.addon-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const category = await card.getAttribute('data-category');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (category === 'aircraft') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });

    test('should filter by price', async ({ page }) => {
      // Click free filter
      await page.click('button[data-filter="free"][data-type="price"]');
      await page.waitForTimeout(300);

      // Verify only free addons are visible
      const allCards = page.locator('.addon-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const price = await card.getAttribute('data-price');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (price === 'free') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });

    test('should combine category and price filters', async ({ page }) => {
      // Filter by aircraft
      await page.click('button[data-filter="aircraft"][data-type="category"]');
      await page.waitForTimeout(200);

      // Filter by free
      await page.click('button[data-filter="free"][data-type="price"]');
      await page.waitForTimeout(300);

      // Check that only free aircraft addons are visible
      const allCards = page.locator('.addon-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const category = await card.getAttribute('data-category');
        const price = await card.getAttribute('data-price');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (category === 'aircraft' && price === 'free') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });
  });

  test.describe('Performance Benchmarks Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/performance-benchmarks.html');
    });

    test('should filter benchmarks by simulator', async ({ page }) => {
      // Click MSFS 2024 filter
      await page.click('button[data-filter="msfs2024"]');
      await page.waitForTimeout(300);

      // Verify filtering worked
      const allCards = page.locator('.benchmark-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const category = await card.getAttribute('data-category');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (category === 'msfs2024') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });
  });

  test.describe('Events Calendar Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/events-calendar.html');
    });

    test('should filter events by type', async ({ page }) => {
      // Click VATSIM filter
      await page.click('button[data-filter="vatsim"]');
      await page.waitForTimeout(300);

      // Verify only VATSIM events are visible
      const allCards = page.locator('.event-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const category = await card.getAttribute('data-category');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (category === 'vatsim') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });

    test('should show all events when "All Events" is clicked', async ({ page }) => {
      // First filter by something specific
      await page.click('button[data-filter="race"]');
      await page.waitForTimeout(200);

      // Then click "All Events"
      await page.click('button[data-filter="all"]');
      await page.waitForTimeout(300);

      // All cards should be visible
      const allCards = page.locator('.event-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const display = await card.evaluate(el => window.getComputedStyle(el).display);
        expect(display).not.toBe('none');
      }
    });
  });

  test.describe('Live Streamers Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/live-streamers.html');
    });

    test('should filter streamers by simulator', async ({ page }) => {
      // Click DCS filter
      await page.click('button[data-filter="dcs"]');
      await page.waitForTimeout(300);

      // Verify filtering
      const allCards = page.locator('.streamer-card');
      const count = await allCards.count();

      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const category = await card.getAttribute('data-category');
        const display = await card.evaluate(el => window.getComputedStyle(el).display);

        if (category === 'dcs') {
          expect(display).not.toBe('none');
        } else {
          expect(display).toBe('none');
        }
      }
    });
  });
});
