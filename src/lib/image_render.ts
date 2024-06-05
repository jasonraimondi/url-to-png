import sharp from "sharp";

import { BrowserPool } from "./browser_pool.js";
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
    private readonly defaultConfig: IConfigAPI = {},
    navigationOptions: Partial<WaitForOptions> = {},
  ) {
    this.NAV_OPTIONS = {
      waitUntil: "domcontentloaded",
      timeout: Number(process.env.BROWSER_TIMEOUT) || 10000,
      ...navigationOptions,
    };
  }

  public async screenshot(url: string, config: IConfigAPI = {}): Promise<Buffer> {
    let { width, height, ...defaultConfig } = this.defaultConfig;

    if (!config.width && !config.height) {
      config.width = width;

      if (!config.isFullPage) {
        config.height = height;
      }
    }

    config = {
      ...defaultConfig,
      ...config,
    };

    const browser = await this.browserPool.acquire();

    try {
      const page = await browser.newPage({
        viewport: {
          width: config.viewportWidth!,
          height: config.viewportHeight!,
        },
        isMobile: !!config.isMobile,
        colorScheme: config.isDarkMode ? "dark" : "light",
        deviceScaleFactor: config.deviceScaleFactor ?? 1,
      });

      try {
        await page.goto(url, this.NAV_OPTIONS);

        let resizeWidth = undefined; // config.width ?? undefined;
        let resizeHeight = undefined; // config.isFullPage ? undefined : config.height ?? undefined;

        if (typeof config.width === "number") {
          resizeWidth = config.width;
        }

        if (
          config.isFullPage &&
          typeof resizeWidth === "undefined" &&
          typeof config.height === "number"
        ) {
          resizeHeight = config.height;
        }

        return await this.resize(
          await page.screenshot({ fullPage: !!config.isFullPage }),
          resizeWidth,
          resizeHeight,
        );
      } finally {
        await page.close();
      }
    } finally {
      await this.browserPool.release(browser);
    }
  }

  private async resize(image: Buffer, width?: number, height?: number): Promise<Buffer> {
    return await sharp(image).resize(width, height, { position: "top" }).toBuffer();
  }
}
