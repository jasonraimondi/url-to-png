import md5 from "md5";
import couchDBNano from "nano";

import { ImageStorage } from "./_base.js";

export class CouchDbStorageProvider implements ImageStorage {
  constructor(private readonly couchDB: couchDBNano.ServerScope) {}

  get images() {
    return this.couchDB.use("images");
  }

  public async fetchImage(imageId: string): Promise<null | Buffer> {
    imageId = md5(imageId);
    try {
      return await this.images.attachment.get(imageId, "urlto.png");
    } catch (err) {
      return null;
    }
  }

  public async storeImage(imageId: string, image: Buffer): Promise<boolean> {
    const images = this.images;
    imageId = md5(imageId);
    try {
      await images.attachment.get(imageId, "urlto.png");
      return true;
    } catch (err) {
      await images.attachment.insert(imageId, "urlto.png", image, "image/png");
    }

    return true;
  }
}
