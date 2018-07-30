import * as puppeteer from 'puppeteer';
import * as sharp from 'sharp';

export class RenderImageService {
  async screenshot(url: string) {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--headless', '--disable-gpu'],
      });

      const page = await browser.newPage();

      console.log('here', url);
      const response = await page.goto(url);
      console.log(response.status());

      await page.setViewport({ width: 1080, height: 1080 });
      let screenshot = await page.screenshot();

      screenshot = await sharp(screenshot)
        .resize(500, 500)
        .toBuffer();

      await page.close();
      await browser.close();
      return screenshot;
    } catch (err) {
      console.log(err.message);
    }

    return false;
  }
}
