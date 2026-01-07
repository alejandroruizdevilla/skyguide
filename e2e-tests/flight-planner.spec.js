const { test, expect } = require('@playwright/test');

test.describe('Flight Planner E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/flight-planner.html');
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Flight Planner/);
    await expect(page.locator('h1')).toContainText('Flight Planner');
  });

  test('should have all form inputs visible', async ({ page }) => {
    await expect(page.locator('#departure')).toBeVisible();
    await expect(page.locator('#arrival')).toBeVisible();
    await expect(page.locator('#distance')).toBeVisible();
    await expect(page.locator('#aircraft')).toBeVisible();
    await expect(page.locator('#cruiseSpeed')).toBeVisible();
    await expect(page.locator('#fuelBurn')).toBeVisible();
  });

  test('should calculate flight plan correctly', async ({ page }) => {
    // Fill in the form
    await page.fill('#departure', 'KJFK');
    await page.fill('#arrival', 'EGLL');
    await page.fill('#distance', '3451');
    await page.selectOption('#aircraft', '450'); // A320
    await page.fill('#cruiseSpeed', '450');
    await page.fill('#fuelBurn', '4500');

    // Submit the form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);

    // Check results are displayed
    const flightTime = await page.textContent('#flightTime');
    const totalDistance = await page.textContent('#totalDistance');
    const fuelRequired = await page.textContent('#fuelRequired');

    expect(flightTime).toContain('h');
    expect(totalDistance).toBe('3,451');
    expect(fuelRequired).toBeTruthy();
  });

  test('should show route summary after calculation', async ({ page }) => {
    // Fill in the form
    await page.fill('#departure', 'KJFK');
    await page.fill('#arrival', 'EGLL');
    await page.fill('#distance', '3451');
    await page.fill('#cruiseSpeed', '450');
    await page.fill('#fuelBurn', '4500');

    // Submit
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);

    // Check route summary is visible
    const routeSummary = await page.locator('#routeSummary');
    await expect(routeSummary).toBeVisible();

    // Check summary contains route info
    const summaryRoute = await page.textContent('#summaryRoute');
    expect(summaryRoute).toContain('KJFK');
    expect(summaryRoute).toContain('EGLL');
  });

  test('should load popular route on click', async ({ page }) => {
    // Click a popular route card
    const routeCard = page.locator('.route-card').first();
    await routeCard.click();
    await page.waitForTimeout(200);

    // Check that departure and arrival are filled
    const departure = await page.inputValue('#departure');
    const arrival = await page.inputValue('#arrival');
    const distance = await page.inputValue('#distance');

    expect(departure).toBeTruthy();
    expect(arrival).toBeTruthy();
    expect(distance).toBeTruthy();
  });

  test('should update cruise speed when aircraft changes', async ({ page }) => {
    // Select different aircraft
    await page.selectOption('#aircraft', '150'); // Cessna 172
    await page.waitForTimeout(100);

    let cruiseSpeed = await page.inputValue('#cruiseSpeed');
    expect(cruiseSpeed).toBe('150');

    // Change to faster aircraft
    await page.selectOption('#aircraft', '500'); // Boeing 787
    await page.waitForTimeout(100);

    cruiseSpeed = await page.inputValue('#cruiseSpeed');
    expect(cruiseSpeed).toBe('500');
  });

  test('should show validation for empty fields', async ({ page }) => {
    // Check that departure and arrival fields have required attribute
    const departure = page.locator('#departure');
    const arrival = page.locator('#arrival');

    const departureRequired = await departure.getAttribute('required');
    const arrivalRequired = await arrival.getAttribute('required');

    expect(departureRequired).not.toBeNull();
    expect(arrivalRequired).not.toBeNull();
  });

  test('should have external planning tool links', async ({ page }) => {
    const links = page.locator('a[href*="simbrief"], a[href*="skyvector"], a[href*="littlenavmap"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
