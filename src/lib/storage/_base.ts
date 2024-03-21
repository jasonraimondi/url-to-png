export interface ImageStorage {
  fetchImage(imageId: string): Promise<null | Buffer>;
  storeImage(imageId: string, image: Buffer): Promise<boolean>;
}
