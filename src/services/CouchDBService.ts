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
    } catch (err) {
      return false;
    }

    return true;
  }

  async storeImage(imageId: string, image) {
    const images = this.images;

    try {
      await images.attachment.get(imageId, 'urlto.png');
      console.log('successfully something');
      return true;
    } catch (err) {
      console.log(`Image not found for url. Creating it.`);
    }

    await images.attachment.insert(imageId, 'urlto.png', image, 'image/png');
    console.log('successfully something else');
    return true;
  }
}
