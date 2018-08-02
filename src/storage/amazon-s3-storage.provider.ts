import * as S3 from 'aws-sdk/clients/s3';
import { GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import { IImageStorage } from '../services/image-storage.service';

export class AmazonS3StorageProvider implements IImageStorage {
  constructor(private readonly s3: S3, private readonly BUCKET_NAME: string) {}

  public async fetchImage(imageId: string) {
    const params: GetObjectRequest = { Bucket: this.BUCKET_NAME, Key: this.getImageId(imageId) };
    try {
      const response = await this.s3.getObject(params).promise();
      return response.Body;
    } catch {
      return null;
    }
  }

  public async storeImage(imageId: string, image: Buffer) {
    try {
      const data: PutObjectRequest = {
        Key: this.getImageId(imageId),
        Body: image,
        Bucket: this.BUCKET_NAME,
      };
      await this.s3.putObject(data).promise();
      return true;
    } catch (err) {
      return false;
    }
  }

  private getImageId(imageId: string) {
    return imageId + '.png';
  }
}
