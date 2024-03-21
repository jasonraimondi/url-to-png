import md5 from "md5";
import couchDBNano from "nano";

import { ImageStorage } from "./_base.js";

export class CouchDbStorageProvider implements ImageStorage {
  constructor(private readonly couchDB: couchDBNano.ServerScope) {}

  get images() {
    return this.couchDB.use(process.env.COUCHDB_DATABASE ?? "images");
  }

  public async fetchImage(imageId: string): Promise<null | Buffer> {
    const imageMd5 = md5(imageId);
    try {
      return await this.images.attachment.get(imageMd5, `${imageId}.png`);
    } catch (err) {
      return null;
    }
  }

  public async storeImage(imageId: string, image: Buffer): Promise<boolean> {
    const images = this.images;
    const imageMd5 = md5(imageId);
    try {
      await images.attachment.get(imageMd5, `${imageId}.png`);
      return true;
    } catch (err) {
      await images.attachment.insert(imageMd5, `${imageId}.png`, image, "image/png");
    }

    return true;
  }
}
