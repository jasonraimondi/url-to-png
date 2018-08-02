import { IImageStorage } from '../services/image-storage.service';

export class StubStorageProvider implements IImageStorage {
  public fetchImage(imageId: string): Promise<null> {
    console.log(`stub fetch image: ${imageId}`);
    return null;
  }

  public storeImage(imageId: string, image: Buffer): Promise<null> {
    console.log(`stub store image: ${imageId}`);
    return null;
  }
}
