export interface StorageInterface {
  fetchImage(imageId: string): Promise<any>;
  storeImage(imageId: string, image: Buffer): Promise<any>;
}
