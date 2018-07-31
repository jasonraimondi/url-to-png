import * as sharp from 'sharp';
import { Browser, Page } from 'puppeteer';
import * as puppeteer from 'puppeteer';

export interface ConfigInterface {
  width?: number;
  height?: number;
  viewPortWidth?: number;
  viewPortHeight?: number;
}

export class RenderImageService {
  private readonly sharp: sharp;

  async screenshot(url: string, config: ConfigInterface = {}): Promise<Buffer | false> {
    config = {
      width: 250,
      height: 250,
      viewPortWidth: 1080,
      viewPortHeight: 1080,
      ...config,
    };

    let page: null | Page = null;
    let screenshot: null | Buffer = null;
    
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
      });      page = await browser.newPage();
      await page.goto(url);
      await page.setViewport({
        width: config.viewPortWidth,
        height: config.viewPortHeight,
      });
      screenshot = await page.screenshot();
      screenshot = await this.resize(screenshot, config.width, config.height);
      await browser.close();
      return screenshot;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  async resize(image, width: number, height: number) {
    return await this.sharp(image)
      .resize(width, height)
      .toBuffer();
  }
}
