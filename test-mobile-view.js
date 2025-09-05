const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X viewport
    deviceScaleFactor: 2
  });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000); // Wait for background to load
  
  await page.screenshot({ 
    path: 'mobile-view.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved as mobile-view.png');
  
  await browser.close();
})();