import { Pool } from 'generic-pool';
import { Page } from 'puppeteer';
import * as sharp from 'sharp';
import { IConfigAPI } from '../config.api';

export class ImageRenderService {
  constructor(private readonly puppeteerPool: Pool<Page>) {}

  public async screenshot(url: string, config: IConfigAPI = {}): Promise<Buffer | boolean> {
    config = {
      width: 250,
      height: 250,
      viewPortWidth: 1080,
      viewPortHeight: 1080,
      isMobile: false,
      isFullPage: false,
      ...config,
    };

    try {
      const page = await this.puppeteerPool.acquire();
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      await page.setViewport({
        width: config.viewPortWidth,
        height: config.viewPortHeight,
        isMobile: config.isMobile,
      });
      let image = await page.screenshot({
        fullPage: config.isFullPage,
      });
      image = await this.resize(image, config.width, config.height);
      await this.puppeteerPool.release(page);
      return image;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  public async resize(image, width: number, height: number) {
    return await sharp(image)
      .resize(width, height)
      .toBuffer();
  }
}
