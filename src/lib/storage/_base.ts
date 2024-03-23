export interface ImageStorage {
  fetchImage(imageId: string): Promise<null | Buffer>;

  storeImage(imageId: string, image: Buffer): Promise<boolean>;
}

type SUPPORTED_EXT = "webp" | "png";
export const IMAGE_EXTENSION: SUPPORTED_EXT = process.env.DEFAULT_WEBP === "true" ? "webp" : "png";
export const IMAGE_MIME_TYPE: `image/${SUPPORTED_EXT}` = `image/${IMAGE_EXTENSION}`;
console.log({ env: process.env.DEFAULT_WEBP, IMAGE_EXTENSION, IMAGE_MIME_TYPE });
