const { test, expect } = require('@playwright/test');

test.describe('Beginner Learning Path E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/beginner-path.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Beginner Learning Path/);
    await expect(page.locator('h1')).toContainText('Beginner Learning Path');
  });

  test('should have 4 week sections', async ({ page }) => {
    // There are 5 .week-section elements (4 weeks + "What's Next" section)
    const weekSections = page.locator('.week-section');
    const count = await weekSections.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should have progress tracker', async ({ page }) => {
    const progressTracker = page.locator('.progress-tracker');
    await expect(progressTracker).toBeVisible();

    // Progress bar container should be visible (the bar itself has 0 width initially)
    const progressBarContainer = page.locator('.progress-bar-container');
    await expect(progressBarContainer).toBeVisible();

    // Progress bar element should exist (even if 0 width)
    const progressBar = page.locator('#progressBar');
    await expect(progressBar).toHaveCount(1);

    const progressText = page.locator('#progressText');
    await expect(progressText).toBeVisible();
  });

  test('should start with 0% progress', async ({ page }) => {
    const progressText = await page.textContent('#progressText');
    expect(progressText).toContain('0%');
  });

  test('should mark week as completed on click', async ({ page }) => {
    // Click first week checkbox
    const firstWeek = page.locator('.checklist li').first();
    await firstWeek.click();
    await page.waitForTimeout(300);

    // Check if it has completed class
    const hasCompleted = await firstWeek.evaluate(el => el.classList.contains('completed'));
    expect(hasCompleted).toBe(true);
  });

  test('should update progress percentage when week is completed', async ({ page }) => {
    // Complete first week
    await page.click('.checklist li[data-week="1"]');
    await page.waitForTimeout(300);

    // Check progress text
    const progressText = await page.textContent('#progressText');
    expect(progressText).toContain('25%'); // 1 out of 4 weeks
  });

  test('should save progress to localStorage', async ({ page }) => {
    // Complete week 1 and 2
    await page.click('.checklist li[data-week="1"]');
    await page.waitForTimeout(200);
    await page.click('.checklist li[data-week="2"]');
    await page.waitForTimeout(300);

    // Check localStorage
    const savedProgress = await page.evaluate(() =>
      localStorage.getItem('learningPathProgress')
    );

    expect(savedProgress).toBeTruthy();
    const progress = JSON.parse(savedProgress);
    expect(progress).toContain('1');
    expect(progress).toContain('2');
  });

  test('should load saved progress on page reload', async ({ page }) => {
    // Complete week 1
    await page.click('.checklist li[data-week="1"]');
    await page.waitForTimeout(300);

    // Reload page
    await page.reload();
    await page.waitForTimeout(500);

    // Check if week 1 is still marked as completed
    const firstWeek = page.locator('.checklist li[data-week="1"]');
    const hasCompleted = await firstWeek.evaluate(el => el.classList.contains('completed'));
    expect(hasCompleted).toBe(true);

    // Check progress
    const progressText = await page.textContent('#progressText');
    expect(progressText).toContain('25%');
  });

  test('should toggle week completion status', async ({ page }) => {
    const week1 = page.locator('.checklist li[data-week="1"]');

    // Complete it
    await week1.click();
    await page.waitForTimeout(200);
    let hasCompleted = await week1.evaluate(el => el.classList.contains('completed'));
    expect(hasCompleted).toBe(true);

    // Uncomplete it
    await week1.click();
    await page.waitForTimeout(200);
    hasCompleted = await week1.evaluate(el => el.classList.contains('completed'));
    expect(hasCompleted).toBe(false);
  });

  test('should show 100% when all weeks completed', async ({ page }) => {
    // Complete all weeks
    await page.click('.checklist li[data-week="1"]');
    await page.waitForTimeout(100);
    await page.click('.checklist li[data-week="2"]');
    await page.waitForTimeout(100);
    await page.click('.checklist li[data-week="3"]');
    await page.waitForTimeout(100);
    await page.click('.checklist li[data-week="4"]');
    await page.waitForTimeout(300);

    // Check progress
    const progressText = await page.textContent('#progressText');
    expect(progressText).toContain('100%');

    // Check progress bar width
    const progressBar = page.locator('#progressBar');
    const width = await progressBar.evaluate(el => el.style.width);
    expect(width).toBe('100%');
  });

  test('should have objectives for each week', async ({ page }) => {
    // Only check the first 4 week sections (not "What's Next")
    const weekSections = page.locator('.timeline .week-section');
    const count = Math.min(await weekSections.count(), 4);

    for (let i = 0; i < count; i++) {
      const section = weekSections.nth(i);
      const objectives = section.locator('.objectives');
      await expect(objectives).toBeVisible();
    }
  });

  test('should have activities for each week', async ({ page }) => {
    // Only check the first 4 week sections (not "What's Next")
    const weekSections = page.locator('.timeline .week-section');
    const count = Math.min(await weekSections.count(), 4);

    for (let i = 0; i < count; i++) {
      const section = weekSections.nth(i);
      const activities = section.locator('.activities');
      await expect(activities).toBeVisible();
    }
  });

  test('should have resource links for each week', async ({ page }) => {
    // Only check the first 4 week sections (not "What's Next")
    const weekSections = page.locator('.timeline .week-section');
    const count = Math.min(await weekSections.count(), 4);

    for (let i = 0; i < count; i++) {
      const section = weekSections.nth(i);
      const resources = section.locator('.resources');
      await expect(resources).toBeVisible();
    }
  });
});
