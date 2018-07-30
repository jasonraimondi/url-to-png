import * as nano from 'nano';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CouchDBService {
  constructor(private readonly nano: nano.ServerScope) {}

  get images() {
    return this.nano.use('images');
  }

  async imageExists(imageId: string) {
    const images = this.images;

    try {
      await images.attachment.get(imageId, 'urlto.png');
      return true;
    } catch (err) {
      return false;
    }
  }

  async storeImage(imageId: string, image) {
    const images = this.images;

    try {
      await images.attachment.get(imageId, 'urlto.png');
      return true;
    } catch (err) {
      await images.attachment.insert(imageId, 'urlto.png', image, 'image/png');
    }

    return true;
  }
}
