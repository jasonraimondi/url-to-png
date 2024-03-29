export interface ImageStorage {
  fetchImage(imageId: string): Promise<null | Buffer>;

  storeImage(imageId: string, image: Buffer): Promise<boolean>;
}

type SUPPORTED_EXT = "webp" | "png";
type SUPPORTED_MIME = `image/${SUPPORTED_EXT}`;

export type ImageTypeOpts = {
  ext: SUPPORTED_EXT,
  mime: SUPPORTED_MIME,
}
