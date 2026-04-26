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
    const docId = md5(imageId);
    const attachmentName = `${imageId}.png`;

    let rev: string | undefined;
    try {
      const doc = await images.get(docId);
      rev = doc._rev;
    } catch {
      // doc does not exist yet; insert without a rev to create it
    }

    await images.attachment.insert(
      docId,
      attachmentName,
      image,
      "image/png",
      rev ? { rev } : undefined,
    );
    return true;
  }
}
