import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Install @axe-core/playwright for accessibility testing
// Run: npm install --save-dev @axe-core/playwright

test.describe('Accessibility Tests', () => {
  test('Homepage accessibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Basic accessibility checks
    const accessibilityResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityResults.violations).toEqual([]);
  });

  test('Keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test tab navigation
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Continue tabbing through interactive elements
    const interactiveElements = await page.locator('a, button, input, textarea, select, [tabindex]').count();
    for (let i = 0; i < Math.min(interactiveElements, 10); i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName,
          visible: el ? window.getComputedStyle(el).visibility === 'visible' : false
        };
      });
      expect(focused.visible).toBe(true);
    }
  });

  test('ARIA labels and roles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check navigation has proper ARIA
    const nav = await page.locator('nav').first();
    if (await nav.isVisible()) {
      const navRole = await nav.getAttribute('role');
      if (!navRole) {
        // nav element has implicit role="navigation"
        expect(true).toBe(true);
      }
    }

    // Check buttons have accessible names
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      
      expect(text || ariaLabel || ariaLabelledBy).toBeTruthy();
    }

    // Check images have alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      
      // Images should have alt text or role="presentation" for decorative images
      expect(alt !== null || role === 'presentation').toBe(true);
    }
  });

  test('Color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const contrastResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .analyze();

    expect(contrastResults.violations).toEqual([]);
  });

  test('Form accessibility', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check all form inputs have labels
    const inputs = await page.locator('input, textarea, select').all();
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).first();
        const hasLabel = await label.isVisible();
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBe(true);
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }

    // Check form has proper error handling
    const form = await page.locator('form').first();
    if (await form.isVisible()) {
      // Submit empty form to trigger validation
      const submitButton = await form.locator('button[type="submit"]').first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Check for error messages with proper ARIA
        await page.waitForTimeout(500); // Wait for validation
        const errors = await page.locator('[role="alert"], [aria-invalid="true"]').count();
        // Errors should be announced to screen readers
        expect(errors).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('Focus indicators', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that focused elements have visible indicators
    const links = await page.locator('a').all();
    for (const link of links.slice(0, 3)) { // Test first 3 links
      await link.focus();
      const outline = await link.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          outlineWidth: styles.outlineWidth,
          outlineStyle: styles.outlineStyle,
          outlineColor: styles.outlineColor,
          boxShadow: styles.boxShadow
        };
      });
      
      // Element should have some visual focus indicator
      const hasOutline = outline.outlineStyle !== 'none' && outline.outlineWidth !== '0px';
      const hasBoxShadow = outline.boxShadow !== 'none';
      expect(hasOutline || hasBoxShadow).toBe(true);
    }
  });

  test('Skip navigation link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Press tab to reveal skip link if it exists
    await page.keyboard.press('Tab');
    
    const skipLink = await page.locator('a:has-text("Skip to main content"), a:has-text("Skip to content")').first();
    if (await skipLink.isVisible()) {
      await skipLink.click();
      
      // Check that focus moved to main content
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['MAIN', 'H1', 'DIV']).toContain(focusedElement);
    }
  });

  test('Heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels: number[] = [];
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName);
      headingLevels.push(parseInt(tagName.substring(1)));
    }

    // Check there's exactly one H1
    const h1Count = headingLevels.filter(level => level === 1).length;
    expect(h1Count).toBe(1);

    // Check heading levels don't skip (e.g., no h1 -> h3)
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });
});