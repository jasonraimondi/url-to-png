import { logger } from "../logger.js";
import { IMAGE_EXTENSION, ImageStorage } from "./_base.js";

export class StubStorageProvider implements ImageStorage {
  async fetchImage(imageId: string): Promise<null> {
    logger.debug(`Stub fetch image: ${imageId}/${IMAGE_EXTENSION}`);
    return null;
  }

  async storeImage(imageId: string): Promise<boolean> {
    logger.debug(`Stub store image: ${imageId}/${IMAGE_EXTENSION}`);
    return true;
  }
}
