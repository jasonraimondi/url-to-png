import * as nano from 'nano';
import { Injectable } from '@nestjs/common';
import { StorageInterface } from '../StorageInterface';

@Injectable()
export class CouchDBService implements StorageInterface {
  constructor(private readonly nano: nano.ServerScope) {}

  get images() {
    return this.nano.use('images');
  }

  async fetchImage(imageId: string): Promise<null | Buffer> {
    try {
      return await this.images.attachment.get(imageId, 'urlto.png');
    } catch (err) {
      return null;
    }
  }

  async storeImage(imageId: string, image): Promise<boolean> {
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
