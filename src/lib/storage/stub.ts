import { logger } from "../logger.js";
import { ImageStorage, ImageTypeOpts } from "./_base.js";

export class StubStorageProvider implements ImageStorage {
  constructor(private readonly imageOpts: ImageTypeOpts) {
  }

  async fetchImage(imageId: string): Promise<null> {
    logger.debug(`Stub fetch image: ${imageId}/${this.imageOpts.ext}`);
    return null;
  }

  async storeImage(imageId: string): Promise<boolean> {
    logger.debug(`Stub store image: ${imageId}/${this.imageOpts.ext}`);
    return true;
  }
}
