import { Injectable } from '@nestjs/common';
import * as couchDBNano from 'nano';
import { IImageStorage } from '../services/image-storage.service';

@Injectable()
export class CouchDbStorageProvider implements IImageStorage {
  constructor(private readonly couchDB: couchDBNano.ServerScope) {}

  get images() {
    return this.couchDB.use('images');
  }

  public async fetchImage(imageId: string): Promise<null | Buffer> {
    try {
      return await this.images.attachment.get(imageId, 'urlto.png');
    } catch (err) {
      return null;
    }
  }

  public async storeImage(imageId: string, image): Promise<boolean> {
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
