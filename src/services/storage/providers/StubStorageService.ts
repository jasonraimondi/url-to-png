import { StorageInterface } from '../StorageInterface';

export class StubStorageService implements StorageInterface {
  fetchImage(imageId: string): Promise<any> {
    console.log(`stub fetch image: ${imageId}`);
    return undefined;
  }

  storeImage(imageId: string, image: Buffer): Promise<any> {
    console.log(`stub store image: ${imageId}`);
    return undefined;
  }
}
