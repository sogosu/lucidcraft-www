import { test, expect } from '@playwright/test';

test.describe('Contact Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test.describe('Visual and Layout Tests', () => {
    test('contact page loads properly with synthwave background', async ({ page }) => {
      // Check page loads successfully
      await expect(page).toHaveURL(/.*contact/);
      
      // Check synthwave background is present
      const backgroundDiv = page.locator('div[style*="bg-synthwave.png"]');
      await expect(backgroundDiv).toBeVisible();
      
      // Take screenshot for visual verification
      await expect(page).toHaveScreenshot('contact-page-full.png');
    });

    test('logo animation and branding elements work correctly', async ({ page }) => {
      // Check logo parts are present
      const logoLeft = page.locator('img[src="/logo-left.svg"]');
      const logoRight = page.locator('img[src="/logo-right.svg"]');
      
      await expect(logoLeft).toBeVisible();
      await expect(logoRight).toBeVisible();
      
      // Check logo text
      const logoText = page.locator('text=lucidcraft');
      await expect(logoText).toBeVisible();
      
      // Check animation classes are applied
      const animatedContainer = page.locator('.animate-scale-in');
      await expect(animatedContainer).toBeVisible();
    });

    test('back to home link works', async ({ page }) => {
      const backLink = page.locator('a[href="/"]');
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveText('← Back to Home');
      
      // Test navigation
      await backLink.click();
      await expect(page).toHaveURL('/');
    });

    test('glassmorphic form styling is applied correctly', async ({ page }) => {
      // Check form container
      const form = page.locator('form');
      await expect(form).toBeVisible();
      
      // Check input fields have glassmorphic styling
      const nameInput = page.locator('#name');
      const emailInput = page.locator('#email');
      const messageInput = page.locator('#message');
      
      // Verify backdrop-blur and transparency classes
      await expect(nameInput).toHaveClass(/backdrop-blur-sm/);
      await expect(nameInput).toHaveClass(/bg-white\/10/);
      
      await expect(emailInput).toHaveClass(/backdrop-blur-sm/);
      await expect(emailInput).toHaveClass(/bg-white\/10/);
      
      await expect(messageInput).toHaveClass(/backdrop-blur-sm/);
      await expect(messageInput).toHaveClass(/bg-white\/10/);
    });

    test('fade-in animations are working', async ({ page }) => {
      // Check elements with animation classes are present
      const fadeInElements = page.locator('.animate-fade-in-up');
      const count = await fadeInElements.count();
      
      expect(count).toBeGreaterThan(0);
      
      // Check specific animated elements
      await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
      await expect(page.locator('text=Lucidcraft Studio, Inc.')).toBeVisible();
    });
  });

  test.describe('Form Functionality Tests', () => {
    test('form submission with valid data works', async ({ page }) => {
      // Fill out the form
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'test@example.com');
      await page.fill('#message', 'This is a test message for the contact form.');
      
      // Submit the form
      await page.click('button[type="submit"]');
      
      // Check for loading state
      await expect(page.locator('button:has-text("Sending...")')).toBeVisible();
      
      // Wait for success message
      await expect(page.locator('text=Message sent successfully!')).toBeVisible({ timeout: 10000 });
      
      // Verify form fields are cleared
      await expect(page.locator('#name')).toHaveValue('');
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#message')).toHaveValue('');
    });

    test('form validation with missing fields', async ({ page }) => {
      // Try to submit empty form
      await page.click('button[type="submit"]');
      
      // Check HTML5 validation prevents submission
      const nameInput = page.locator('#name');
      const emailInput = page.locator('#email');
      const messageInput = page.locator('#message');
      
      // Verify required attributes
      await expect(nameInput).toHaveAttribute('required');
      await expect(emailInput).toHaveAttribute('required');
      await expect(messageInput).toHaveAttribute('required');
    });

    test('email format validation', async ({ page }) => {
      // Fill form with invalid email
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'invalid-email');
      await page.fill('#message', 'Test message');
      
      // Try to submit
      await page.click('button[type="submit"]');
      
      // Check that HTML5 email validation prevents submission
      const emailInput = page.locator('#email');
      await expect(emailInput).toHaveAttribute('type', 'email');
      
      // Browser should show validation message
      const validationMessage = await emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
      expect(validationMessage).not.toBe('');
    });

    test('loading states during submission', async ({ page }) => {
      // Fill out the form
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'test@example.com');
      await page.fill('#message', 'Test message');
      
      // Submit the form
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      
      // Check loading state
      await expect(submitButton).toHaveText('Sending...');
      await expect(submitButton).toBeDisabled();
      
      // Wait for completion
      await expect(page.locator('text=Message sent successfully!')).toBeVisible({ timeout: 10000 });
      
      // Button should be enabled again
      await expect(submitButton).toHaveText('Send Message');
      await expect(submitButton).toBeEnabled();
    });

    test('error handling when API fails', async ({ page }) => {
      // Mock API to return error
      await page.route('**/api/contact', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' })
        });
      });
      
      // Fill and submit form
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'test@example.com');
      await page.fill('#message', 'Test message');
      await page.click('button[type="submit"]');
      
      // Check error message appears
      await expect(page.locator('text=There was an error sending your message')).toBeVisible({ timeout: 10000 });
      
      // Form should not be cleared
      await expect(page.locator('#name')).toHaveValue('Test User');
      await expect(page.locator('#email')).toHaveValue('test@example.com');
      await expect(page.locator('#message')).toHaveValue('Test message');
    });
  });

  test.describe('Responsive Design Tests', () => {
    test('form layout adapts to mobile screens', async ({ page, isMobile }) => {
      if (!isMobile) {
        await page.setViewportSize({ width: 375, height: 667 });
      }
      
      // Check form is still visible and usable
      await expect(page.locator('form')).toBeVisible();
      
      // Check mobile-specific styling
      const contactContent = page.locator('div.flex.flex-col.lg\\:flex-row');
      await expect(contactContent).toBeVisible();
      
      // Take mobile screenshot
      await expect(page).toHaveScreenshot('contact-mobile.png');
    });

    test('form layout on tablet screens', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Check form is still visible and usable
      await expect(page.locator('form')).toBeVisible();
      
      // Take tablet screenshot
      await expect(page).toHaveScreenshot('contact-tablet.png');
    });

    test('form layout on desktop screens', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Check form is still visible and usable
      await expect(page.locator('form')).toBeVisible();
      
      // Check desktop layout (side by side)
      const contactContent = page.locator('div.flex.flex-col.lg\\:flex-row');
      await expect(contactContent).toBeVisible();
      
      // Take desktop screenshot
      await expect(page).toHaveScreenshot('contact-desktop.png');
    });
  });

  test.describe('Accessibility Tests', () => {
    test('form labels and ARIA attributes', async ({ page }) => {
      // Check labels are properly associated
      const nameLabel = page.locator('label[for="name"]');
      const emailLabel = page.locator('label[for="email"]');
      const messageLabel = page.locator('label[for="message"]');
      
      await expect(nameLabel).toBeVisible();
      await expect(emailLabel).toBeVisible();
      await expect(messageLabel).toBeVisible();
      
      await expect(nameLabel).toHaveText('Name');
      await expect(emailLabel).toHaveText('Email');
      await expect(messageLabel).toHaveText('Message');
      
      // Check form inputs have proper IDs
      await expect(page.locator('#name')).toBeVisible();
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#message')).toBeVisible();
    });

    test('keyboard navigation through form', async ({ page }) => {
      // Start at name field
      await page.keyboard.press('Tab');
      await expect(page.locator('#name')).toBeFocused();
      
      // Tab to email field
      await page.keyboard.press('Tab');
      await expect(page.locator('#email')).toBeFocused();
      
      // Tab to message field
      await page.keyboard.press('Tab');
      await expect(page.locator('#message')).toBeFocused();
      
      // Tab to submit button
      await page.keyboard.press('Tab');
      await expect(page.locator('button[type="submit"]')).toBeFocused();
    });

    test('focus states are visible', async ({ page }) => {
      // Focus on name input and check for visible focus indicator
      await page.locator('#name').focus();
      
      // Check that focus ring/outline is visible (this depends on your CSS)
      const focusedInput = page.locator('#name:focus');
      await expect(focusedInput).toBeVisible();
      
      // Take screenshot to verify focus state
      await expect(page).toHaveScreenshot('focus-state-name.png');
    });

    test('form submission via Enter key', async ({ page }) => {
      // Fill out form
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'test@example.com');
      await page.fill('#message', 'Test message via keyboard');
      
      // Press Enter while focused on submit button
      await page.locator('button[type="submit"]').focus();
      await page.keyboard.press('Enter');
      
      // Check form was submitted
      await expect(page.locator('text=Message sent successfully!')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Performance Tests', () => {
    test('page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/contact');
      const loadTime = Date.now() - startTime;
      
      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      // Check that form is interactive
      await expect(page.locator('form')).toBeVisible();
    });

    test('form submission response time', async ({ page }) => {
      await page.fill('#name', 'Performance Test');
      await page.fill('#email', 'perf@test.com');
      await page.fill('#message', 'Testing response time');
      
      const startTime = Date.now();
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Message sent successfully!')).toBeVisible({ timeout: 10000 });
      
      const responseTime = Date.now() - startTime;
      
      // API should respond within 5 seconds
      expect(responseTime).toBeLessThan(5000);
    });
  });
});