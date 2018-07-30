import { Controller, Get, Query, Res } from '@nestjs/common';
import * as md5 from 'md5';

import { ConfigInterface, RenderImageService } from '../services/RenderImageService';
import { BaseController } from './base.controller';
import { imageDTO } from '../dtos/imageDTO';
import { StorageService } from '../services/storage/StorageService';

@Controller()
export class AppController extends BaseController {
  constructor(
    private readonly storageService: StorageService,
    private readonly renderImageService: RenderImageService
  ) {
    super();
  }

  @Get()
  async root(@Res() response, @Query() query: imageDTO) {
    const errors = [];
    const config: ConfigInterface = {};
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
    const dateString = date.toLocaleDateString().replace('/', '-');
    const imageId = md5(query.url + '_' + dateString + this.configToString(config));

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

  private configToString(config: ConfigInterface) {
    let string = '';

    for (let i in config) {
      string += `_${i}-${config[i]}`;
    }

    return string;
  }
}
