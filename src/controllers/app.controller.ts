import { Controller, Get, Query, Res } from '@nestjs/common';

import { ConfigApi, IConfigAPI } from '../config.api';
import { ImageRenderService } from '../services/image-render.service';
import { ImageStorageService } from '../services/image-storage.service';
import { LoggerService } from '../services/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly imageStorageService: ImageStorageService,
    private readonly imageRenderService: ImageRenderService,
    private readonly loggerService: LoggerService,
  ) {
  }

  @Get()
  public async root(@Res() response, @Query() query: ConfigApi) {
    const errors = [];
    const config: IConfigAPI = {};
    let forceReload = false;

    if (!query.url) {
      errors.push('url is required');
    }

    if (!this.isURL(query.url)) {
      const message = `Invalid URL: ( ${query.url} )`;
      if (query.url !== undefined) {
        this.loggerService.verbose(message);
      }

      errors.push(message);
    }

    if (errors.length > 0) {
      response.status(400);
      response.json(errors);
      return;
    }

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

    const date = new Date();
    const dateString = date.toLocaleDateString().replace(/\//g, '-');
    const imageId = dateString + '.' + this.slugify(query.url) + this.configToString(config);

    let imageBuffer: any = await this.imageStorageService.fetchImage(imageId);

    if (imageBuffer === null || forceReload) {
      try {
        imageBuffer = await this.imageRenderService.screenshot(query.url, config);
      } catch (err) {
        this.loggerService.debug(err.message);
        return this.errorMessage(err, response);
      }

      try {
        await this.imageStorageService.storeImage(imageId, imageBuffer);
      } catch (err) {
        this.loggerService.debug(err.message);
      }
    }

    response.header('Content-Type', 'image/png').send(imageBuffer);
    return;
  }

  protected errorMessage(err: Error, response) {
    response.status(500);
    return response.json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }

  private isURL(unknown: string): boolean {
    try {
      new URL(unknown);
      return true;
    } catch (_) {
      return false
    }
  }

  private configToString(configAPI: IConfigAPI) {
    let configString = '';

    for (const key in configAPI) {
      if (configAPI.hasOwnProperty(key)) {
        configString += `_${key}-${configAPI[key]}`;
      }
    }

    return configString;
  }

  private slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}
