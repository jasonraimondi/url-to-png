import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { IImageStorage } from "../services/image-storage.service.js";

export class AmazonS3StorageProvider implements IImageStorage {
  constructor(private readonly s3: S3Client, private readonly BUCKET_NAME: string) {}

  public async fetchImage(imageId: string) {
    const params = new GetObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: this.getImageId(imageId),
    });
    try {
      const response = await this.s3.send(params);
      return response.Body;
    } catch(e) {
      return null;
    }
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
