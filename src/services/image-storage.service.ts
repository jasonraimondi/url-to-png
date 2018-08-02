export interface IImageStorage {
  fetchImage(imageId: string): Promise<any>;
  storeImage(imageId: string, image: Buffer): Promise<any>;
}

export class ImageStorageService implements IImageStorage {
  constructor(private readonly storageService: IImageStorage) {}

  public async fetchImage(imageId: string): Promise<any> {
    return await this.storageService.fetchImage(imageId);
  }

  public async storeImage(imageId: string, image: Buffer): Promise<any> {
    return await this.storageService.storeImage(imageId, image);
  }
}
