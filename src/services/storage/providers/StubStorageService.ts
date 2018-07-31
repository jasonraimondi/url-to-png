import { StorageInterface } from '../StorageInterface';

export class StubStorageService implements StorageInterface {
  fetchImage(imageId: string): Promise<null> {
    console.log(`stub fetch image: ${imageId}`);
    return null;
  }

  storeImage(imageId: string, image: Buffer): Promise<null> {
    console.log(`stub store image: ${imageId}`);
    return null;
  }
}
