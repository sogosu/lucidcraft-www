import { test, expect } from '@playwright/test';

test.describe('Design Comparison', () => {
  test('Full page with white padding', async ({ page }) => {
    // Set a larger viewport to see the white padding
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for background image to load
    await page.waitForTimeout(2000);
    
    // Take screenshot of the entire page including white padding
    const screenshot = await page.screenshot({
      fullPage: true,
      animations: 'disabled'
    });
    
    // Save the screenshot
    await expect(screenshot).toMatchSnapshot('full-page-with-padding.png');
  });

  test('Visual comparison with Figma design', async ({ page }) => {
    // Match Figma desktop dimensions
    await page.setViewportSize({ width: 1728, height: 1117 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for all assets to load
    await page.waitForTimeout(2000);
    
    const screenshot = await page.screenshot({
      fullPage: false, // Just the viewport to match Figma frame
      animations: 'disabled'
    });
    
    await expect(screenshot).toMatchSnapshot('figma-comparison.png');
  });
});