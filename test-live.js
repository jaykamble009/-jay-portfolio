
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://jaykamble009.in');
  await page.waitForTimeout(2000);
  
  // Scroll to about section
  await page.evaluate(() => {
    document.getElementById('about').scrollIntoView();
  });
  await page.waitForTimeout(6000); // wait enough time for typing
  
  await page.screenshot({ path: 'test-live-screenshot.png', fullPage: true });
  
  const text = await page.evaluate(() => {
    const el = document.querySelector('#about .prose p');
    return el ? el.innerText : 'NOT FOUND';
  });
  console.log('LIVE ABOUT TEXT:', text);
  
  await browser.close();
})();
