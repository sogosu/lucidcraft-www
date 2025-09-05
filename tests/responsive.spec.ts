import { test, expect, devices } from '@playwright/test';

// Responsive design testing across different devices
test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Desktop HD', width: 1920, height: 1080 },
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Small', width: 320, height: 568 }
  ];

  for (const viewport of viewports) {
    test(`Homepage responsive at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check that page loads without horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width);

      // Check navigation is accessible
      const nav = await page.locator('nav').first();
      if (await nav.isVisible()) {
        const navBox = await nav.boundingBox();
        expect(navBox?.width).toBeLessThanOrEqual(viewport.width);
      }

      // Check main content is visible
      const main = await page.locator('main').first();
      await expect(main).toBeVisible();

      // Take screenshot for manual review
      await page.screenshot({
        path: `tests/screenshots/responsive-home-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: false
      });
    });
  }
});

// Device-specific tests using Playwright's device emulation
test.describe('Device Emulation Tests', () => {
  const devices_to_test = [
    { name: 'iPhone 12', device: devices['iPhone 12'] },
    { name: 'iPhone SE', device: devices['iPhone SE'] },
    { name: 'Pixel 5', device: devices['Pixel 5'] },
    { name: 'iPad', device: devices['iPad (gen 7)'] },
    { name: 'iPad Pro', device: devices['iPad Pro 11'] }
  ];

  for (const testDevice of devices_to_test) {
    test(`${testDevice.name} - Full site navigation`, async ({ browser }) => {
      const context = await browser.newContext({
        ...testDevice.device
      });
      const page = await context.newPage();

      // Test homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveTitle(/Lucidcraft/i);

      // Test navigation to contact
      const contactLink = await page.getByRole('link', { name: /contact/i });
      if (await contactLink.isVisible()) {
        await contactLink.click();
        await expect(page).toHaveURL('/contact');
      }

      // Test navigation to privacy
      await page.goto('/privacy');
      await expect(page).toHaveURL('/privacy');

      // Test navigation to terms
      await page.goto('/terms');
      await expect(page).toHaveURL('/terms');

      await context.close();
    });
  }
});

// Touch interaction tests for mobile devices
test.describe('Mobile Touch Interactions', () => {
  test('Mobile menu interaction', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12']
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if mobile menu button exists
    const menuButton = page.locator('[aria-label*="menu"]').first();
    const isMenuVisible = await menuButton.isVisible();
    
    if (isMenuVisible) {
      // Test menu open
      await menuButton.tap();
      
      // Check if menu is expanded
      const menu = page.locator('nav[aria-expanded="true"]').first();
      const isMenuExpanded = await menu.isVisible();
      
      if (isMenuExpanded) {
        await expect(menu).toBeVisible();
        
        // Test menu close
        await menuButton.tap();
        await expect(menu).not.toBeVisible();
      }
    }
    
    await context.close();
  });

  test('Touch scrolling and swipe', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12']
    });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test vertical scrolling
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    const scrollTop = await page.evaluate(() => window.scrollY);
    expect(scrollTop).toBe(0);
    
    await context.close();
  });
});

// Layout integrity tests
test.describe('Layout Integrity', () => {
  test('No content overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('Images scale properly', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check all images fit within viewport
      const images = await page.locator('img').all();
      for (const img of images) {
        const box = await img.boundingBox();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    }
  });

  test('Text remains readable on all devices', async ({ page }) => {
    const minFontSizes = {
      desktop: 14,
      tablet: 14,
      mobile: 12
    };

    const tests = [
      { viewport: { width: 1920, height: 1080 }, minSize: minFontSizes.desktop },
      { viewport: { width: 768, height: 1024 }, minSize: minFontSizes.tablet },
      { viewport: { width: 375, height: 667 }, minSize: minFontSizes.mobile }
    ];

    for (const test of tests) {
      await page.setViewportSize(test.viewport);
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check font sizes of text elements
      const textElements = await page.locator('p, span, a, h1, h2, h3, h4, h5, h6').all();
      for (const element of textElements.slice(0, 10)) { // Check first 10 elements
        const fontSize = await element.evaluate(el => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        expect(fontSize).toBeGreaterThanOrEqual(test.minSize);
      }
    }
  });
});