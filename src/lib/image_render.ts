import sharp from "sharp";

import { BrowserPool } from "./browser_pool.js";
import { logger } from "./logger.js";
import { IConfigAPI } from "./schema.js";

export type WaitForOptions = {
  timeout: number;
  waitUntil: "load" | "domcontentloaded" | "networkidle";
};

export interface ImageRenderInterface {
  screenshot(url: string, config: IConfigAPI): Promise<Buffer>;
}

export class ImageRenderService implements ImageRenderInterface {
  private readonly NAV_OPTIONS: WaitForOptions;

  constructor(
    private readonly browserPool: BrowserPool,
    private readonly DEFAULT_CONFIG: IConfigAPI = {},
    navigationOptions: Partial<WaitForOptions> = {},
  ) {
    this.NAV_OPTIONS = {
      waitUntil: "domcontentloaded",
      timeout: Number(process.env.BROWSER_TIMEOUT) || 10000,
      ...navigationOptions,
    };
    logger.debug(`navigation options`);
    logger.debug(this.NAV_OPTIONS);
    logger.debug(`default config`);
    logger.debug(this.DEFAULT_CONFIG);
  }

  public async screenshot(url: string, config: IConfigAPI = {}): Promise<Buffer> {
    const { width = 250, height = 250, ...defaultConfig } = this.DEFAULT_CONFIG;

    config = {
      ...defaultConfig,
      ...config,
    };

    if (!config.width && !config.height) {
      config.width = width;

      if (!config.isFullPage) {
        config.height = height;
      }
    }

    const browser = await this.browserPool.acquire();

    try {
      const page = await browser.newPage({
        viewport: {
          width: config.viewPortWidth!,
          height: config.viewPortHeight!,
        },
        isMobile: !!config.isMobile,
        colorScheme: config.isDarkMode ? "dark" : "light",
        deviceScaleFactor: config.deviceScaleFactor ?? 1,
      });

      try {
        await page.goto(url, this.NAV_OPTIONS);
        return await this.resize(
          await page.screenshot({ fullPage: !!config.isFullPage }),
          config.width ?? width ?? undefined,
          config.height ?? height ?? undefined,
        );
      } finally {
        await page.close();
      }
    } finally {
      await this.browserPool.release(browser);
    }
  }

  private async resize(image: Buffer, width?: number, height?: number): Promise<Buffer> {
    return await sharp(image).resize(width, height).toBuffer();
  }
}
