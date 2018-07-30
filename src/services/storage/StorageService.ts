import { StorageInterface } from './StorageInterface';

export class StorageService implements StorageInterface {
  constructor(private readonly storageService: StorageInterface) {}

  async fetchImage(imageId: string): Promise<any> {
    return await this.storageService.fetchImage(imageId);
  }

  async storeImage(imageId: string, image: Buffer): Promise<any> {
    return await this.storageService.storeImage(imageId, image);
  }
}
