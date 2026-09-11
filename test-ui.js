
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  // Scroll to about section
  await page.evaluate(() => {
    document.getElementById('about').scrollIntoView();
  });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'test-screenshot.png', fullPage: true });
  
  // Also get the text content of the Introduction paragraph
  const text = await page.evaluate(() => {
    const el = document.querySelector('#about .prose p');
    return el ? el.innerText : 'NOT FOUND';
  });
  console.log('ABOUT TEXT:', text);
  
  await browser.close();
})();
