const { test, expect } = require('@playwright/test');

test('Contact modal should open on mobile viewport', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  
  // Navigate to privacy page
  await page.goto('http://localhost:3001/privacy');
  await page.waitForLoadState('networkidle');
  
  console.log('=== DEBUGGING CONTACT MODAL ===');
  
  // Check if the button exists
  const contactButton = page.locator('button:has-text("Contact")');
  const buttonCount = await contactButton.count();
  console.log(`Found ${buttonCount} contact buttons`);
  
  if (buttonCount > 0) {
    const isVisible = await contactButton.first().isVisible();
    console.log(`Contact button visible: ${isVisible}`);
    
    // Check button classes
    const buttonClasses = await contactButton.first().getAttribute('class');
    console.log(`Button classes: ${buttonClasses}`);
    
    // Click the button
    console.log('Clicking contact button...');
    await contactButton.first().click();
    
    // Wait a moment for modal to appear
    await page.waitForTimeout(1000);
    
    // Check for modal
    const modal = page.locator('.fixed.inset-0.z-50');
    const modalCount = await modal.count();
    console.log(`Found ${modalCount} modals`);
    
    if (modalCount > 0) {
      const modalVisible = await modal.first().isVisible();
      console.log(`Modal visible: ${modalVisible}`);
      
      // Check modal classes
      const modalClasses = await modal.first().getAttribute('class');
      console.log(`Modal classes: ${modalClasses}`);
      
      // Take screenshot
      await page.screenshot({ path: 'test-modal-debug.png', fullPage: true });
      console.log('Screenshot saved as test-modal-debug.png');
    } else {
      console.log('No modal found!');
    }
  } else {
    // Check for regular link instead
    const contactLink = page.locator('a:has-text("Contact")');
    const linkCount = await contactLink.count();
    console.log(`Found ${linkCount} contact links`);
    
    if (linkCount > 0) {
      const linkClasses = await contactLink.first().getAttribute('class');
      console.log(`Link classes: ${linkClasses}`);
    }
  }
  
  // Take final screenshot
  await page.screenshot({ path: 'test-final-state.png', fullPage: true });
  console.log('Final screenshot saved as test-final-state.png');
});