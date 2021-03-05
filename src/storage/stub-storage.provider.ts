import { IImageStorage } from "../services/image-storage.service";
import { LoggerService } from "../services/logger.service";

export class StubStorageProvider implements IImageStorage {
  constructor(private readonly logger: LoggerService) {}

  public fetchImage(imageId: string): Promise<null> {
    this.logger.verbose(`Stub fetch image: ${imageId}`);
    return null;
  }

  public storeImage(imageId: string, image: Buffer): Promise<null> {
    this.logger.verbose(`Stub store image: ${imageId}`);
    return null;
  }
}
