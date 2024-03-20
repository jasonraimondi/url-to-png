import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { logger } from "../logger.js";
import { ImageStorage } from "./_base.js";

export class AmazonS3StorageProvider implements ImageStorage {
  constructor(
    private readonly s3: S3Client,
    private readonly BUCKET_NAME: string,
  ) {}

  public async fetchImage(imageId: string) {
    const params = new GetObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: this.getImageId(imageId),
    });
    try {
      const response = await this.s3.send(params);
      const body = response.Body;
      if (body instanceof Uint8Array) {
        return Buffer.from(body);
      }
    } catch (e) {
      logger.error(e);
    }
    return null;
  }

  public async storeImage(imageId: string, image: Buffer) {
    try {
      const data = new PutObjectCommand({
        Body: image,
        Bucket: this.BUCKET_NAME,
        Key: this.getImageId(imageId),
      });
      await this.s3.send(data);
      return true;
    } catch (err) {
      return false;
    }
  }

  private getImageId(imageId: string) {
    return imageId + ".png";
  }
}
