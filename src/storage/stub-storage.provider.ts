import { IImageStorage } from '../services/image-storage.service';
import { LoggerService } from '../services/logger.service';

export class StubStorageProvider implements IImageStorage {
  constructor(private readonly logger: LoggerService) {}

  public fetchImage(imageId: string): Promise<undefined|Buffer> {
    this.logger.verbose(`Stub fetch image: ${imageId}`);
    return;
  }

  public storeImage(imageId: string, image: Buffer): Promise<undefined> {
    this.logger.verbose(`Stub store image: ${imageId}`);
    return;
  }
}
