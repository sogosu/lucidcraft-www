import { test, expect } from '@playwright/test';

test.describe('Responsive Headline Tests', () => {
  test('desktop headline should have large font size', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Wait for the page to fully load
    await page.waitForTimeout(1000);
    
    // Get the headline element
    const headline = await page.locator('text=Unlocking human potential').first();
    
    // Check if headline is visible
    await expect(headline).toBeVisible();
    
    // Get computed styles
    const fontSize = await headline.evaluate(el => 
      window.getComputedStyle(el.parentElement!).fontSize
    );
    
    console.log('Desktop font size:', fontSize);
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/desktop-headline.png',
      fullPage: true 
    });
    
    // Verify font size is approximately 61px
    expect(parseFloat(fontSize)).toBeGreaterThan(60);
  });

  test('mobile headline should have smaller font size', async ({ page }) => {
    // Set mobile viewport (iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000');
    
    // Wait for the page to fully load
    await page.waitForTimeout(1000);
    
    // Get the headline element
    const headline = await page.locator('text=Unlocking human potential').first();
    
    // Check if headline is visible
    await expect(headline).toBeVisible();
    
    // Get computed styles
    const fontSize = await headline.evaluate(el => 
      window.getComputedStyle(el.parentElement!).fontSize
    );
    
    console.log('Mobile font size:', fontSize);
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/mobile-headline.png',
      fullPage: true 
    });
    
    // Verify font size is approximately 36px
    expect(parseFloat(fontSize)).toBeLessThan(40);
    expect(parseFloat(fontSize)).toBeGreaterThan(30);
  });

  test('tablet headline should transition correctly', async ({ page }) => {
    // Set tablet viewport (iPad)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    
    // Wait for the page to fully load
    await page.waitForTimeout(1000);
    
    // Get the headline element
    const headline = await page.locator('text=Unlocking human potential').first();
    
    // Check if headline is visible
    await expect(headline).toBeVisible();
    
    // Get computed styles
    const fontSize = await headline.evaluate(el => 
      window.getComputedStyle(el.parentElement!).fontSize
    );
    
    console.log('Tablet font size:', fontSize);
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/tablet-headline.png',
      fullPage: true 
    });
    
    // At 768px width, it should show desktop size (>=768px is desktop)
    expect(parseFloat(fontSize)).toBeGreaterThan(60);
  });

  test('verify headline text is fully visible on mobile', async ({ page }) => {
    // Set small mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    await page.waitForTimeout(1000);
    
    // Check both lines of text are visible
    await expect(page.locator('text=Unlocking human potential')).toBeVisible();
    await expect(page.locator('text=Smart Apps')).toBeVisible();
    
    // Verify no text overflow
    const container = await page.locator('text=Unlocking human potential').first().locator('..');
    const boundingBox = await container.boundingBox();
    
    expect(boundingBox).not.toBeNull();
    if (boundingBox) {
      // Check that text container fits within viewport
      expect(boundingBox.width).toBeLessThanOrEqual(375);
    }
  });
});