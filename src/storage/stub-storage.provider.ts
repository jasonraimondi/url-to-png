import { IImageStorage } from "../services/image-storage.service.js";
import { LoggerService } from "../services/logger.service.js";

export class StubStorageProvider implements IImageStorage {
  constructor(private readonly logger: LoggerService) {}

  public fetchImage(imageId: string): Promise<null> {
    this.logger.verbose(`Stub fetch image: ${imageId}`);
    return Promise.resolve(null);
  }

  public storeImage(imageId: string, _image: Buffer): Promise<null> {
    this.logger.verbose(`Stub store image: ${imageId}`);
    return Promise.resolve(null);
  }
}
