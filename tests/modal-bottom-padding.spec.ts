import { test, expect } from '@playwright/test';

test.describe('Modal Bottom Padding Tests - 30px Fix Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Privacy Policy Modal Bottom Padding', () => {
    test('desktop: privacy modal has 30px bottom padding', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Measure the actual bottom padding
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      console.log(`Desktop Privacy Modal - Actual padding-bottom: ${paddingBottom}`);
      
      // Verify the 30px padding is applied
      expect(paddingBottom).toBe('30px');
      
      // Scroll to the bottom to test spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      
      // Wait a moment for scroll to complete
      await page.waitForTimeout(500);
      
      // Verify we can see the last content section (heading)
      await expect(page.locator('h2:has-text("6. Contact Us")')).toBeInViewport();
      
      // Measure the distance between last content and bottom of scroll area
      const spacingMeasurement = await scrollableArea.evaluate(el => {
        const lastElement = el.querySelector('section:last-child');
        if (!lastElement) return null;
        
        const scrollAreaRect = el.getBoundingClientRect();
        const lastElementRect = lastElement.getBoundingClientRect();
        
        // Calculate the space from bottom of last element to bottom of scroll area
        const bottomSpace = scrollAreaRect.bottom - lastElementRect.bottom;
        
        return {
          scrollAreaBottom: scrollAreaRect.bottom,
          lastElementBottom: lastElementRect.bottom,
          bottomSpace: bottomSpace,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          scrollTop: el.scrollTop
        };
      });
      
      console.log('Desktop Privacy Modal Spacing:', spacingMeasurement);
      
      // Take screenshot for visual verification
      await expect(page).toHaveScreenshot('privacy-modal-bottom-padding-desktop.png');
    });

    test('mobile iPhone 12: privacy modal has 30px bottom padding', async ({ page }) => {
      // Set iPhone 12 viewport
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Measure the actual bottom padding
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      console.log(`iPhone 12 Privacy Modal - Actual padding-bottom: ${paddingBottom}`);
      
      // Verify the 30px padding is applied
      expect(paddingBottom).toBe('30px');
      
      // Scroll to the bottom to test spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      
      // Wait for scroll to complete
      await page.waitForTimeout(500);
      
      // Verify content doesn't touch the bottom
      const spacingCheck = await scrollableArea.evaluate(el => {
        const lastElement = el.querySelector('section:last-child');
        if (!lastElement) return { hasSpacing: false, spacing: 0 };
        
        const scrollAreaRect = el.getBoundingClientRect();
        const lastElementRect = lastElement.getBoundingClientRect();
        const bottomSpace = scrollAreaRect.bottom - lastElementRect.bottom;
        
        return {
          hasSpacing: bottomSpace >= 25, // Account for rounding, should be close to 30px
          spacing: bottomSpace,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight
        };
      });
      
      console.log('iPhone 12 Privacy Modal Spacing Check:', spacingCheck);
      
      // Verify adequate spacing exists
      expect(spacingCheck.hasSpacing).toBe(true);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('privacy-modal-bottom-padding-iphone12.png');
    });

    test('mobile Pixel 5: privacy modal has 30px bottom padding', async ({ page }) => {
      // Set Pixel 5 viewport
      await page.setViewportSize({ width: 393, height: 851 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Verify padding is applied
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      expect(paddingBottom).toBe('30px');
      
      // Scroll to bottom and verify spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('privacy-modal-bottom-padding-pixel5.png');
    });

    test('tablet: privacy modal has 30px bottom padding', async ({ page }) => {
      // Set tablet viewport (iPad gen 7)
      await page.setViewportSize({ width: 810, height: 1080 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Verify padding is applied
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      expect(paddingBottom).toBe('30px');
      
      // Scroll to bottom and verify spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('privacy-modal-bottom-padding-tablet.png');
    });
  });

  test.describe('Terms of Service Modal Bottom Padding', () => {
    test('desktop: terms modal has 30px bottom padding', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Measure the actual bottom padding
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      console.log(`Desktop Terms Modal - Actual padding-bottom: ${paddingBottom}`);
      
      // Verify the 30px padding is applied
      expect(paddingBottom).toBe('30px');
      
      // Scroll to the bottom to test spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      
      // Wait a moment for scroll to complete
      await page.waitForTimeout(500);
      
      // Verify we can see the last content section (heading)
      await expect(page.locator('h2:has-text("6. Contact Information")')).toBeInViewport();
      
      // Measure the spacing
      const spacingMeasurement = await scrollableArea.evaluate(el => {
        const lastElement = el.querySelector('section:last-child');
        if (!lastElement) return null;
        
        const scrollAreaRect = el.getBoundingClientRect();
        const lastElementRect = lastElement.getBoundingClientRect();
        
        const bottomSpace = scrollAreaRect.bottom - lastElementRect.bottom;
        
        return {
          scrollAreaBottom: scrollAreaRect.bottom,
          lastElementBottom: lastElementRect.bottom,
          bottomSpace: bottomSpace,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          scrollTop: el.scrollTop
        };
      });
      
      console.log('Desktop Terms Modal Spacing:', spacingMeasurement);
      
      // Take screenshot for visual verification
      await expect(page).toHaveScreenshot('terms-modal-bottom-padding-desktop.png');
    });

    test('mobile iPhone 12: terms modal has 30px bottom padding', async ({ page }) => {
      // Set iPhone 12 viewport
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Measure the actual bottom padding
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      console.log(`iPhone 12 Terms Modal - Actual padding-bottom: ${paddingBottom}`);
      
      // Verify the 30px padding is applied
      expect(paddingBottom).toBe('30px');
      
      // Scroll to the bottom to test spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      
      // Wait for scroll to complete
      await page.waitForTimeout(500);
      
      // Verify content doesn't touch the bottom
      const spacingCheck = await scrollableArea.evaluate(el => {
        const lastElement = el.querySelector('section:last-child');
        if (!lastElement) return { hasSpacing: false, spacing: 0 };
        
        const scrollAreaRect = el.getBoundingClientRect();
        const lastElementRect = lastElement.getBoundingClientRect();
        const bottomSpace = scrollAreaRect.bottom - lastElementRect.bottom;
        
        return {
          hasSpacing: bottomSpace >= 25, // Account for rounding, should be close to 30px
          spacing: bottomSpace,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight
        };
      });
      
      console.log('iPhone 12 Terms Modal Spacing Check:', spacingCheck);
      
      // Verify adequate spacing exists
      expect(spacingCheck.hasSpacing).toBe(true);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('terms-modal-bottom-padding-iphone12.png');
    });

    test('mobile Pixel 5: terms modal has 30px bottom padding', async ({ page }) => {
      // Set Pixel 5 viewport
      await page.setViewportSize({ width: 393, height: 851 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Verify padding is applied
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      expect(paddingBottom).toBe('30px');
      
      // Scroll to bottom and verify spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('terms-modal-bottom-padding-pixel5.png');
    });

    test('tablet: terms modal has 30px bottom padding', async ({ page }) => {
      // Set tablet viewport (iPad gen 7)
      await page.setViewportSize({ width: 810, height: 1080 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Verify padding is applied
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      expect(paddingBottom).toBe('30px');
      
      // Scroll to bottom and verify spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('terms-modal-bottom-padding-tablet.png');
    });
  });

  test.describe('Contact Modal Bottom Padding (for comparison)', () => {
    test('mobile iPhone 12: contact modal has 30px bottom padding', async ({ page }) => {
      // Set iPhone 12 viewport
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open contact modal
      await page.click('button:has-text("Contact")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      
      // Get the scrollable content area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Verify padding is applied
      const paddingBottom = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.paddingBottom;
      });
      
      console.log(`iPhone 12 Contact Modal - Actual padding-bottom: ${paddingBottom}`);
      expect(paddingBottom).toBe('30px');
      
      // Scroll to bottom to ensure send button has adequate spacing
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Verify send button is visible and has space below
      await expect(page.locator('button:has-text("Send Message")')).toBeInViewport();
      
      // Take screenshot
      await expect(page).toHaveScreenshot('contact-modal-bottom-padding-iphone12.png');
    });
  });

  test.describe('Cross-Modal Consistency Tests', () => {
    test('all modals have consistent 30px bottom padding', async ({ page }) => {
      const viewports = [
        { name: 'desktop', width: 1920, height: 1080 },
        { name: 'iphone12', width: 390, height: 844 },
        { name: 'pixel5', width: 393, height: 851 },
        { name: 'tablet', width: 810, height: 1080 }
      ];

      const modals = [
        { button: 'Contact', title: 'Get in Touch' },
        { button: 'Privacy Policy', title: 'Privacy Policy' },
        { button: 'Terms of Service', title: 'Terms of Service' }
      ];

      for (const viewport of viewports) {
        for (const modal of modals) {
          // Set viewport
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          
          // Open modal
          await page.click(`button:has-text("${modal.button}")`);
          
          // Verify modal is visible
          await expect(page.locator(`h1:has-text("${modal.title}")`)).toBeVisible();
          
          // Get the scrollable content area
          const scrollableArea = page.locator('#modal-content-scroll');
          await expect(scrollableArea).toBeVisible();
          
          // Verify padding is applied
          const paddingBottom = await scrollableArea.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return styles.paddingBottom;
          });
          
          console.log(`${viewport.name} ${modal.button} Modal - padding-bottom: ${paddingBottom}`);
          expect(paddingBottom).toBe('30px');
          
          // Close modal
          await page.click('button:has-text("×")');
          await expect(page.locator(`h1:has-text("${modal.title}")`)).not.toBeVisible();
        }
      }
    });
  });

  test.describe('Bottom Spacing Visual Tests', () => {
    test('before and after scroll position comparison', async ({ page }) => {
      // Test on mobile where scrolling issues are most apparent
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Test Privacy Policy modal
      await page.click('button:has-text("Privacy Policy")');
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      const scrollableArea = page.locator('#modal-content-scroll');
      
      // Get scroll measurements at top
      const topMeasurements = await scrollableArea.evaluate(el => ({
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight
      }));
      
      // Scroll to bottom
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Get scroll measurements at bottom
      const bottomMeasurements = await scrollableArea.evaluate(el => ({
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        maxScrollTop: el.scrollHeight - el.clientHeight
      }));
      
      console.log('Top measurements:', topMeasurements);
      console.log('Bottom measurements:', bottomMeasurements);
      
      // Verify we can actually scroll
      expect(bottomMeasurements.scrollTop).toBeGreaterThan(topMeasurements.scrollTop);
      
      // Verify we reached the bottom (within reasonable tolerance)
      expect(bottomMeasurements.scrollTop).toBeGreaterThanOrEqual(bottomMeasurements.maxScrollTop - 5);
      
      // Take final screenshot
      await expect(page).toHaveScreenshot('privacy-modal-bottom-scroll-position.png');
      
      // Close and test Terms modal
      await page.click('button:has-text("×")');
      await page.click('button:has-text("Terms of Service")');
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      const termsScrollableArea = page.locator('#modal-content-scroll');
      await termsScrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(500);
      
      // Take terms screenshot
      await expect(page).toHaveScreenshot('terms-modal-bottom-scroll-position.png');
    });
  });
});