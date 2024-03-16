import * as fs from "fs/promises";
import * as path from "path";

import { IImageStorage } from "../services/image-storage.service.js";
import { LoggerService } from "../services/logger.service.js";

export class FileSystemStorageProvider implements IImageStorage {
  constructor(private readonly storagePath: string, private readonly logger: LoggerService) {
    this.createStorageDirectory().then();
  }

  public async fetchImage(imageId: string): Promise<Buffer | null> {
    const imagePath = this.imagePath(imageId);
    try {
      return await fs.readFile(imagePath);
    } catch (error) {
      this.logger.error(`Error storing image: ${imagePath}:`, error);
      return null;
    }
  }

  public async storeImage(imageId: string, image: Buffer): Promise<boolean> {
    const imagePath = this.imagePath(imageId);
    try {
      await fs.writeFile(imagePath, image);
      return true;
    } catch (error) {
      this.logger.error(`Error storing image ${imagePath}:`);
      this.logger.error(String(error));
      return false;
    }
  }

  private imagePath(imageId: string) {
    return path.join(this.storagePath, imageId) + ".png";
  }

  private async createStorageDirectory(): Promise<void> {
    try {
      await fs.access(this.storagePath);
      this.logger.info(`storage directory FOUND: ${this.storagePath}:`);
    } catch {
      await fs.mkdir(this.storagePath, { recursive: true });
      this.logger.info(`storage directory NOT FOUND`);
      this.logger.info(`creating directory: ${this.storagePath}:`);
    }
  }
}
