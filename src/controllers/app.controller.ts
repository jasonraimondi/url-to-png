import { Controller, Get, Query, Res } from '@nestjs/common';
import * as md5 from 'md5';

import { ConfigApi, IConfigAPI } from '../config.api';
import { ImageRenderService } from '../services/image-render.service';
import { ImageStorageService } from '../services/image-storage.service';

@Controller()
export class AppController {
  constructor(
    private readonly storageService: ImageStorageService,
    private readonly renderImageService: ImageRenderService,
  ) {
  }

  @Get()
  public async root(@Res() response, @Query() query: ConfigApi) {
    const errors = [];
    const config: IConfigAPI = {};
    let forceReload = false;

    if (!query.url) {
      errors.push('valid query is required');
    }

    if (errors.length > 0) {
      response.json(errors);
      return;
    }

    if (query.width) {
      config.width = Number(query.width);
    }

    if (query.height) {
      config.height = Number(query.height);
    }

    if (query.viewPortWidth) {
      config.viewPortWidth = Number(query.viewPortWidth);
    }

    if (query.viewPortHeight) {
      config.viewPortHeight = Number(query.viewPortHeight);
    }

    if (query.forceReload) {
      forceReload = true;
    }

    const date = new Date();
    const dateString = date.toLocaleDateString().replace(/\//g, '-');
    const imageName = query.url + '_' + dateString + this.configToString(config);
    const imageId = md5(imageName);

    let imageBuffer: any = await this.storageService.fetchImage(imageId);

    if (imageBuffer === null || forceReload) {
      try {
        imageBuffer = await this.renderImageService.screenshot(query.url, config);
      } catch (err) {
        return this.errorMessage(err, response);
      }

      try {
        await this.storageService.storeImage(imageId, imageBuffer);
      } catch (err) {
        console.log(err.message);
      }
    }

    response.set({ 'Content-Type': 'image/png' }).send(imageBuffer);
    return;
  }

  protected errorMessage(err: Error, response) {
    return response.json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
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
}
