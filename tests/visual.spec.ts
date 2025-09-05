import { test, expect } from '@playwright/test';
import path from 'path';

// Visual regression testing suite
test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set a consistent viewport for visual tests
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Homepage visual test', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    const screenshot = await page.screenshot({ 
      fullPage: true,
      animations: 'disabled'
    });
    
    // Compare with baseline
    expect(screenshot).toMatchSnapshot('homepage-desktop.png', {
      maxDiffPixels: 100,
      threshold: 0.2
    });
  });

  test('Contact page visual test', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    const screenshot = await page.screenshot({ 
      fullPage: true,
      animations: 'disabled'
    });
    
    expect(screenshot).toMatchSnapshot('contact-desktop.png', {
      maxDiffPixels: 100,
      threshold: 0.2
    });
  });

  test('Privacy policy page visual test', async ({ page }) => {
    await page.goto('/privacy');
    await page.waitForLoadState('networkidle');
    
    const screenshot = await page.screenshot({ 
      fullPage: true,
      animations: 'disabled'
    });
    
    expect(screenshot).toMatchSnapshot('privacy-desktop.png', {
      maxDiffPixels: 100,
      threshold: 0.2
    });
  });

  test('Terms of service page visual test', async ({ page }) => {
    await page.goto('/terms');
    await page.waitForLoadState('networkidle');
    
    const screenshot = await page.screenshot({ 
      fullPage: true,
      animations: 'disabled'
    });
    
    expect(screenshot).toMatchSnapshot('terms-desktop.png', {
      maxDiffPixels: 100,
      threshold: 0.2
    });
  });
});

// Component-level visual tests
test.describe('Component Visual Tests', () => {
  test('Navigation component', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const nav = await page.locator('nav').first();
    if (await nav.isVisible()) {
      const screenshot = await nav.screenshot();
      expect(screenshot).toMatchSnapshot('navigation.png', {
        maxDiffPixels: 50,
        threshold: 0.2
      });
    }
  });

  test('Footer component', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const footer = await page.locator('footer').first();
    if (await footer.isVisible()) {
      const screenshot = await footer.screenshot();
      expect(screenshot).toMatchSnapshot('footer.png', {
        maxDiffPixels: 50,
        threshold: 0.2
      });
    }
  });
});

// Helper function to capture and save screenshots for documentation
test.describe('Screenshot Documentation', () => {
  test('Generate screenshots for all pages', async ({ page }) => {
    const pages = ['/', '/contact', '/privacy', '/terms'];
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];

    for (const pageUrl of pages) {
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(pageUrl);
        await page.waitForLoadState('networkidle');
        
        const pageName = pageUrl === '/' ? 'home' : pageUrl.substring(1);
        const filename = `${pageName}-${viewport.name}.png`;
        
        await page.screenshot({
          path: path.join('tests', 'screenshots', filename),
          fullPage: true
        });
      }
    }
  });
});