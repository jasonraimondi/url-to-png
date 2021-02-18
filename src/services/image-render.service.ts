import { Pool } from 'generic-pool';
import { Browser, WaitForOptions } from 'puppeteer';
import * as sharp from 'sharp';

import { IConfigAPI } from '../config.api';
import { LoggerService } from './logger.service';

export class ImageRenderService {
  private readonly NAV_OPTIONS: WaitForOptions;

  constructor(
    private readonly puppeteerPool: Pool<Browser>,
    private readonly logger: LoggerService,
    private readonly navigationOptions: Partial<WaitForOptions>,
  ) {
    this.NAV_OPTIONS = {
      waitUntil: 'domcontentloaded',
      timeout: 10000,
      ...navigationOptions,
    };
    this.logger.debug(`navigation options ${JSON.stringify(this.NAV_OPTIONS)}`);
  }

  public async screenshot(url: string, config: IConfigAPI = {}): Promise<Buffer | boolean> {
    config = {
      viewPortWidth: 1080,
      viewPortHeight: 1080,
      isMobile: false,
      isFullPage: false,
      ...config,
    };

    this.logger.debug(JSON.stringify(config));

    if (!config.width && !config.height) {
      config.width = 250;

      if (!config.isFullPage) {
        config.height = 250;
      }
    }

    const browser = await this.puppeteerPool.acquire();
    const page = await browser.newPage();

    let image: Buffer;

    try {
      await page.goto(url, this.NAV_OPTIONS);
      await page.setViewport({
        width: config.viewPortWidth,
        height: config.viewPortHeight,
        isMobile: config.isMobile,
      });
      const screenshot = await page.screenshot({ fullPage: config.isFullPage });
      image = await this.resize(screenshot, config.width, config.height);
      await this.puppeteerPool.release(browser);
    } catch (err) {
      this.logger.debug(JSON.stringify(err));
    } finally {
      page.close().catch((e) => this.logger.error(e.message));
    }
    return image ?? false;
  }

  private async resize(image, width: number, height: number): Promise<Buffer> {
    return await sharp(image)
      .resize(width, height)
      .toBuffer();
  }
}
