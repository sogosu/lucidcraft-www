import { test, expect, devices } from '@playwright/test';

test.describe('Modal Scrollbar Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Contact Modal Scrollbar Tests', () => {
    test('desktop: contact modal opens and has proper scrollbar behavior', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Open contact modal
      await page.click('button:has-text("Contact")');
      
      // Verify modal is visible
      const modal = page.locator('div.fixed.inset-0.z-50');
      await expect(modal).toBeVisible();
      
      // Wait for modal content to load
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      
      // Check that the scrollable content area exists
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Verify all form fields are visible without scrolling initially
      await expect(page.locator('#name')).toBeInViewport();
      await expect(page.locator('#email')).toBeInViewport();
      await expect(page.locator('#message')).toBeInViewport();
      await expect(page.locator('button:has-text("Send Message")')).toBeInViewport();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      
      // For desktop, content should fit or have minimal overflow
      console.log(`Desktop Contact Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}`);
      
      // Take screenshot for visual verification
      await expect(page).toHaveScreenshot('modal-contact-desktop.png');
    });

    test('mobile iPhone 12: contact modal scrollbar behavior', async ({ page }) => {
      // Set iPhone 12 viewport
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open contact modal
      await page.click('button:has-text("Contact")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`iPhone 12 Contact Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Verify that the Send Message button is accessible
      // First scroll to the bottom to ensure button is reachable
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      await expect(page.locator('button:has-text("Send Message")')).toBeInViewport();
      
      // Scroll back to top and verify form fields are accessible
      await scrollableArea.evaluate(el => el.scrollTop = 0);
      await expect(page.locator('#name')).toBeInViewport();
      
      // Test scrolling functionality
      if (hasVerticalScrollbar) {
        // Scroll through the form to verify all elements are accessible
        await page.locator('#name').scrollIntoViewIfNeeded();
        await expect(page.locator('#name')).toBeInViewport();
        
        await page.locator('#email').scrollIntoViewIfNeeded();
        await expect(page.locator('#email')).toBeInViewport();
        
        await page.locator('#message').scrollIntoViewIfNeeded();
        await expect(page.locator('#message')).toBeInViewport();
        
        await page.locator('button:has-text("Send Message")').scrollIntoViewIfNeeded();
        await expect(page.locator('button:has-text("Send Message")')).toBeInViewport();
      }
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-contact-iphone12.png');
    });

    test('mobile Pixel 5: contact modal scrollbar behavior', async ({ page }) => {
      // Set Pixel 5 viewport
      await page.setViewportSize({ width: 393, height: 851 });
      
      // Open contact modal
      await page.click('button:has-text("Contact")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`Pixel 5 Contact Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Test form field accessibility
      await page.locator('#name').fill('Test User');
      await expect(page.locator('#name')).toHaveValue('Test User');
      
      await page.locator('#email').fill('test@example.com');
      await expect(page.locator('#email')).toHaveValue('test@example.com');
      
      await page.locator('#message').fill('This is a test message to verify that the form works properly on mobile devices with scrolling.');
      await expect(page.locator('#message')).toHaveValue('This is a test message to verify that the form works properly on mobile devices with scrolling.');
      
      // Verify Send Message button is accessible
      await page.locator('button:has-text("Send Message")').scrollIntoViewIfNeeded();
      await expect(page.locator('button:has-text("Send Message")')).toBeVisible();
      await expect(page.locator('button:has-text("Send Message")')).toBeEnabled();
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-contact-pixel5.png');
    });

    test('tablet: contact modal scrollbar behavior', async ({ page }) => {
      // Set tablet viewport (iPad gen 7)
      await page.setViewportSize({ width: 810, height: 1080 });
      
      // Open contact modal
      await page.click('button:has-text("Contact")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      
      console.log(`Tablet Contact Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}`);
      
      // Verify all elements are accessible
      await expect(page.locator('#name')).toBeInViewport();
      await expect(page.locator('#email')).toBeInViewport();
      await expect(page.locator('#message')).toBeInViewport();
      await expect(page.locator('button:has-text("Send Message")')).toBeInViewport();
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-contact-tablet.png');
    });
  });

  test.describe('Privacy Policy Modal Scrollbar Tests', () => {
    test('desktop: privacy modal has proper scrollbar for long content', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties for long content
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`Desktop Privacy Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Test scrolling functionality
      if (hasVerticalScrollbar) {
        // Scroll to bottom
        await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
        
        // Verify we can see the contact section at bottom
        await expect(page.locator('text=Contact Us')).toBeInViewport();
        
        // Scroll back to top
        await scrollableArea.evaluate(el => el.scrollTop = 0);
        await expect(page.locator('text=Information We Collect')).toBeInViewport();
      }
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-privacy-desktop.png');
    });

    test('mobile iPhone 12: privacy modal scrollbar with long content', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties - should definitely have scrollbar on mobile for long content
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`iPhone 12 Privacy Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Verify scrollbar exists for long content
      expect(hasVerticalScrollbar).toBe(true);
      
      // Test scrolling through all sections
      const sections = [
        'Information We Collect',
        'How We Use Your Information',
        'Information Sharing',
        'Data Security',
        'Your Rights',
        'Contact Us'
      ];
      
      for (const section of sections) {
        await page.locator(`text=${section}`).scrollIntoViewIfNeeded();
        await expect(page.locator(`text=${section}`)).toBeInViewport();
      }
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-privacy-iphone12.png');
    });

    test('mobile Pixel 5: privacy modal scrollbar with long content', async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 851 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`Pixel 5 Privacy Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Verify scrollbar exists for long content
      expect(hasVerticalScrollbar).toBe(true);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-privacy-pixel5.png');
    });
  });

  test.describe('Terms of Service Modal Scrollbar Tests', () => {
    test('desktop: terms modal has proper scrollbar for long content', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`Desktop Terms Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Test scrolling functionality if scrollbar exists
      if (hasVerticalScrollbar) {
        // Scroll to bottom
        await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
        
        // Verify we can see the contact section at bottom
        await expect(page.locator('text=Contact Information')).toBeInViewport();
        
        // Scroll back to top
        await scrollableArea.evaluate(el => el.scrollTop = 0);
        await expect(page.locator('text=Acceptance of Terms')).toBeInViewport();
      }
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-terms-desktop.png');
    });

    test('mobile iPhone 12: terms modal scrollbar with long content', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties - should definitely have scrollbar on mobile
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`iPhone 12 Terms Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Verify scrollbar exists for long content
      expect(hasVerticalScrollbar).toBe(true);
      
      // Test scrolling through all sections
      const sections = [
        'Acceptance of Terms',
        'Use of Services',
        'Intellectual Property',
        'User Content',
        'Limitation of Liability',
        'Contact Information'
      ];
      
      for (const section of sections) {
        await page.locator(`text=${section}`).scrollIntoViewIfNeeded();
        await expect(page.locator(`text=${section}`)).toBeInViewport();
      }
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-terms-iphone12.png');
    });

    test('mobile Pixel 5: terms modal scrollbar with long content', async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 851 });
      
      // Open terms modal
      await page.click('button:has-text("Terms of Service")');
      
      // Verify modal is visible
      await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
      
      // Get the scrollable area
      const scrollableArea = page.locator('#modal-content-scroll');
      await expect(scrollableArea).toBeVisible();
      
      // Check scrollbar properties
      const scrollHeight = await scrollableArea.evaluate(el => el.scrollHeight);
      const clientHeight = await scrollableArea.evaluate(el => el.clientHeight);
      const hasVerticalScrollbar = scrollHeight > clientHeight;
      
      console.log(`Pixel 5 Terms Modal - ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, Has Scrollbar: ${hasVerticalScrollbar}`);
      
      // Verify scrollbar exists for long content
      expect(hasVerticalScrollbar).toBe(true);
      
      // Take screenshot
      await expect(page).toHaveScreenshot('modal-terms-pixel5.png');
    });
  });

  test.describe('Cross-Device Modal Accessibility Tests', () => {
    test('keyboard navigation works in contact modal across devices', async ({ page }) => {
      // Test on desktop first
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Open contact modal
      await page.click('button:has-text("Contact")');
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      
      // Test keyboard navigation
      await page.keyboard.press('Tab'); // Should focus on close button or first field
      await page.keyboard.press('Tab'); // Name field
      await expect(page.locator('#name')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Email field
      await expect(page.locator('#email')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Message field
      await expect(page.locator('#message')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Send button
      await expect(page.locator('button:has-text("Send Message")')).toBeFocused();
      
      // Ensure focused element is in viewport
      await expect(page.locator('button:has-text("Send Message")')).toBeInViewport();
    });

    test('touch scrolling works on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open privacy modal (has long content)
      await page.click('button:has-text("Privacy Policy")');
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      const scrollableArea = page.locator('#modal-content-scroll');
      
      // Get initial scroll position
      const initialScrollTop = await scrollableArea.evaluate(el => el.scrollTop);
      
      // Simulate touch scroll - scroll down
      await scrollableArea.evaluate(el => {
        el.scrollTop = el.scrollHeight / 2;
      });
      
      // Check that we scrolled
      const newScrollTop = await scrollableArea.evaluate(el => el.scrollTop);
      expect(newScrollTop).toBeGreaterThan(initialScrollTop);
      
      // Verify content is still readable
      await expect(page.locator('text=How We Use Your Information')).toBeInViewport();
    });

    test('modal close button remains accessible during scroll', async ({ page }) => {
      // Test on mobile where scrolling is most likely
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open privacy modal
      await page.click('button:has-text("Privacy Policy")');
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Scroll to bottom
      const scrollableArea = page.locator('#modal-content-scroll');
      await scrollableArea.evaluate(el => el.scrollTop = el.scrollHeight);
      
      // Close button should still be visible and clickable
      const closeButton = page.locator('button:has-text("×")');
      await expect(closeButton).toBeVisible();
      await expect(closeButton).toBeEnabled();
      
      // Click close button to verify it works
      await closeButton.click();
      
      // Modal should close
      await expect(page.locator('h1:has-text("Privacy Policy")')).not.toBeVisible();
    });
  });

  test.describe('Modal CSS Scrollbar Styling Tests', () => {
    test('scrollbar has proper styling and visibility', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      
      // Open privacy modal (guaranteed to have scrollable content)
      await page.click('button:has-text("Privacy Policy")');
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      const scrollableArea = page.locator('#modal-content-scroll');
      
      // Check CSS scrollbar properties
      const scrollbarStyle = await scrollableArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          scrollbarWidth: styles.scrollbarWidth,
          overflowY: styles.overflowY,
          scrollbarColor: styles.scrollbarColor
        };
      });
      
      console.log('Scrollbar styling:', scrollbarStyle);
      
      // Verify overflow-y is set to auto or scroll
      expect(['auto', 'scroll'].includes(scrollbarStyle.overflowY)).toBe(true);
      
      // Check that scrollbar-width is set (for Firefox)
      expect(scrollbarStyle.scrollbarWidth).toBe('thin');
    });
  });
});