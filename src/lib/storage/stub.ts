import { logger } from "../logger.js";
import { ImageStorage } from "./_base.js";

export class StubStorageProvider implements ImageStorage {
  async fetchImage(imageId: string): Promise<null> {
    logger.debug(`Stub fetch image: ${imageId}`);
    return null;
  }

  async storeImage(imageId: string): Promise<boolean> {
    logger.debug(`Stub store image: ${imageId}`);
    return true;
  }
}
