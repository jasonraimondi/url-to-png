import * as puppeteer from 'puppeteer';
import * as sharp from 'sharp';
import { Browser, Page } from 'puppeteer';

export class RenderImageService {
  private readonly sharp = sharp;
  
  async screenshot(url: string) {
    let page: null|Page = null;
    let browser: null|Browser = null;
    let screenshot: null|Buffer = null;
    
    try {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--headless', '--disable-gpu'],
      });
      page = await browser.newPage();
      
      await page.goto(url);
      await page.setViewport({ width: 1080, height: 1080 });
      screenshot = await page.screenshot();
      screenshot = await this.resize(screenshot, 500, 500);
      return screenshot;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      if (page) {
        await page.close();
        await browser.close();
      }
    }
    
    return screenshot;
  }
  
  async resize(image, width: number, height: number) {
    return await this.sharp(image)
      .resize(width, height)
      .toBuffer();
  }
}
