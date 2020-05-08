import { Pool } from 'generic-pool';
import { Browser, NavigationOptions } from 'puppeteer';
import * as sharp from 'sharp';

import { IConfigAPI } from '../config.api';
import { LoggerService } from './logger.service';

export class ImageRenderService {
  private readonly NAV_OPTIONS: NavigationOptions;

  constructor(
    private readonly puppeteerPool: Pool<Browser>,
    private readonly logger: LoggerService,
    private readonly navigationOptions: NavigationOptions,
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

    let image: false | Buffer = false;

    try {
      await page.goto(url, this.NAV_OPTIONS);
      await page.setViewport({
        width: config.viewPortWidth,
        height: config.viewPortHeight,
        isMobile: config.isMobile,
      });
      image = await page.screenshot({ fullPage: config.isFullPage });
      image = await this.resize(image, config.width, config.height);
      await this.puppeteerPool.release(browser);
    } catch (err) {
      this.logger.debug(JSON.stringify(err));
    } finally {
      page.close().catch((e) => this.logger.error(e.message));
    }
    return image;
  }

  private async resize(image, width: number, height: number) {
    return await sharp(image)
      .resize(width, height)
      .toBuffer();
  }
}
