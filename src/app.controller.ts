import { Get, Controller, Req, Query, Res } from '@nestjs/common';
import { CouchDBService } from './couch-d-b.service';
import { renderUrl } from './render-url';
import { Base64 } from './base-64';

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
  constructor(private readonly couchDBService: CouchDBService) {}
  
  @Get()
  async root(@Res() response, @Query() query: imageDTO) {
    const errors = [];
  
    
    const url = query.url;

    if (!url) {
      errors.push({
        name: 'url'
      });
    }
  
    if (errors.length > 0) {
      response.json(errors);
      return;
    }
  
    let imageBuffer = false;

    const date = new Date();
    const dateString = date.toLocaleDateString().replace('/', '-');
    
    
    const imageId = Base64.encode(url + '__' + dateString);
  
    try {
      imageBuffer = await renderUrl(query.url);
      await this.couchDBService.storeImage(imageId, imageBuffer);
      response.json(`http://localhost:5984/images/${imageId}/urlto.png`);
      return;
    } catch (err) {
      response.json({
        message: err.message,
        trace: err.trace
      });
      return;
    }
  }
}
