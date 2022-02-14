import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Pool } from "generic-pool";
import { Browser } from "playwright";
import * as sharp from "sharp";

import { IConfigAPI } from "../config.api";
import { LoggerService } from "./logger.service";

export type WaitForOptions = {
  timeout: number;
  waitUntil: "load" | "domcontentloaded" | "networkidle";
};

@Injectable()
export class ImageRenderService implements OnApplicationShutdown {
  private readonly NAV_OPTIONS: WaitForOptions;

  constructor(
    private readonly browserPool: Pool<Browser>,
    private readonly logger: LoggerService,
    private readonly navigationOptions: Partial<WaitForOptions>,
  ) {
    this.NAV_OPTIONS = {
      waitUntil: "networkidle",
      timeout: 10000,
      ...navigationOptions,
    };
    this.logger.debug(`navigation options ${JSON.stringify(this.NAV_OPTIONS)}`);
  }

  async onApplicationShutdown(signal: string) {
    this.logger.info(`received signal ${signal}, draining browserPool`);
    await this.browserPool.drain();
    await this.browserPool.clear();
  }

  public async screenshot(url: string, config: IConfigAPI = {}): Promise<Buffer | boolean> {
    config = {
      viewPortWidth: 1080,
      viewPortHeight: 1080,
      isMobile: false,
      isFullPage: false,
      isDarkMode: false,
      deviceScaleFactor: 1,
      ...config,
    };

    this.logger.debug(JSON.stringify(config));

    if (!config.width && !config.height) {
      config.width = 250;

      if (!config.isFullPage) {
        config.height = 250;
      }
    }

    const browser = await this.browserPool.acquire();
    const page = await browser.newPage({
      viewport: {
        width: config.viewPortWidth,
        height: config.viewPortHeight,
      },
      isMobile: config.isMobile,
      colorScheme: config.isDarkMode ? "dark" : "light",
      deviceScaleFactor: config.deviceScaleFactor,
    });

    let image: Buffer;

    try {
      await page.goto(url, this.NAV_OPTIONS);
      const screenshot = await page.screenshot({ fullPage: config.isFullPage });
      image = await this.resize(screenshot, config.width, config.height);
      await this.browserPool.release(browser);
    } finally {
      await page.close();
    }

    return image ?? false;
  }

  private async resize(image, width: number, height: number): Promise<Buffer> {
    return await sharp(image).resize(width, height).toBuffer();
  }
}
