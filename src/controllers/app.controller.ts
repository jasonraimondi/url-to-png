import { Get, Controller, Req, Query, Res } from '@nestjs/common';
import * as md5 from 'md5';
import { CouchDBService } from '../services/CouchDBService';
import { RenderImageService } from '../services/RenderImageService';

export class imageDTO {
  readonly url: string;
  // readonly forceRefresh?: boolean;
  // readonly width?: number;
  // readonly height?: number;
  // readonly viewPortHeight?: number;
  // readonly viewPortWidth?: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly couchDBService: CouchDBService,
    private readonly renderImageService: RenderImageService
  ) {}

  @Get()
  async root(@Res() response, @Query() query: imageDTO) {
    const errors = [];

    const url = query.url;

    if (!url) {
      errors.push({
        name: 'url',
      });
    }

    if (errors.length > 0) {
      response.json(errors);
      return;
    }

    let imageBuffer: any = false;

    const date = new Date();
    const dateString = date.toLocaleDateString().replace('/', '-');

    const imageId = md5(url + '__' + dateString);

    try {
      imageBuffer = await this.renderImageService.screenshot(query.url);
      await this.couchDBService.storeImage(imageId, imageBuffer);
    } catch (err) {
      response.json({
        message: err.message,
        trace: err.trace,
      });
      return;
    }

    response.set({ 'Content-Type': 'image/png' }).send(imageBuffer);
    return;
  }
}
