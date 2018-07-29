import * as puppeteer from 'puppeteer';
import * as sharp from 'sharp';

export async function renderUrl(url: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1080 });
    let screenshot = await page.screenshot();
    screenshot = await sharp(screenshot).resize(500, 500).toBuffer();
    await browser.close();
    return screenshot;
  } catch (err) {
    console.log(err.message);
  }
  
  return false;
}
