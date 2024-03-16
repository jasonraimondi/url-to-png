import { Controller, Get, HttpException, HttpStatus, Query, Res } from "@nestjs/common";

import { ConfigApi, IConfigAPI } from "../config.api.js";
import { ImageRenderService } from "../services/image-render.service.js";
import { ImageStorageService } from "../services/image-storage.service.js";
import { LoggerService } from "../services/logger.service.js";
import { FastifyReply } from "fastify";

@Controller()
export class AppController {
  constructor(
    private readonly imageStorageService: ImageStorageService,
    private readonly imageRenderService: ImageRenderService,
    private readonly loggerService: LoggerService,
  ) {
  }

  @Get()
  public async root(@Res() response: FastifyReply, @Query() query: ConfigApi) {
    const config: IConfigAPI = {};
    let forceReload = false;

    if (query.width) {
      config.width = Number(query.width);
      if (config.width > 1920) {
        config.width = 1920;
      }
    }

    if (query.height) {
      config.height = Number(query.height);
      if (config.height > 1920) {
        config.width = 1920;
      }
    }

    if (query.viewPortWidth) {
      config.viewPortWidth = Number(query.viewPortWidth);
      if (config.viewPortWidth > 1920) {
        config.width = 1920;
      }
    }

    if (query.viewPortHeight) {
      config.viewPortHeight = Number(query.viewPortHeight);
      if (config.viewPortHeight > 1920) {
        config.width = 1920;
      }
    }

    if (query.isFullPage) {
      config.isFullPage = true;
    }

    if (query.isMobile) {
      config.isMobile = true;
    }

    if (query.isDarkMode) {
      config.isDarkMode = true;
    }

    if (query.forceReload) {
      forceReload = true;
    }

    if (query.deviceScaleFactor) {
      config.deviceScaleFactor = Number(query.deviceScaleFactor);
    }


    const date = new Date();
    const dateString = date.toLocaleDateString().replace(/\//g, "-");
    const imageId = dateString + "." + this.slugify(query.url) + this.configToString(config);

    console.log(this.imageStorageService, this.loggerService);
    let imageBuffer: any = await this.imageStorageService.fetchImage(imageId);

    if (imageBuffer === null || forceReload) {
      try {
        imageBuffer = await this.imageRenderService.screenshot(query.url, config);
      } catch (err) {
        this.loggerService.error("Error rendering image", err);
        return this.errorMessage(err as Error);
      }

      try {
        await this.imageStorageService.storeImage(imageId, imageBuffer);
      } catch (err) {
        this.loggerService.error("Error storing image", err);
      }
    }

    response.header("Content-Type", "image/png").send(imageBuffer);
    return;
  }

  protected errorMessage(err: Error) {
    throw new HttpException(
      {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private configToString(configAPI: IConfigAPI) {
    return Object.entries(configAPI)
      .map(([key, value]) => `_${key}-${value}`)
      .reduce((prev, next) => `${prev}${next}`, "");
  }

  private slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
}
