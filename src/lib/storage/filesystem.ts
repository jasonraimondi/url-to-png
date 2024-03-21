import * as fs from "fs/promises";
import * as path from "path";
import { logger } from "../logger.js";

import { ImageStorage } from "./_base.js";

export class FileSystemStorageProvider implements ImageStorage {
  constructor(private readonly storagePath: string) {
    this.createStorageDirectory().then();
  }

  async fetchImage(imageId: string): Promise<Buffer | null> {
    const imagePath = this.imagePath(imageId);
    try {
      return await fs.readFile(imagePath);
    } catch (error) {
      logger.error(`Error fetching image: ${imagePath}:`, error);
      return null;
    }
  }

  async storeImage(imageId: string, image: Buffer): Promise<boolean> {
    const imagePath = this.imagePath(imageId);
    try {
      await fs.writeFile(imagePath, image);
      return true;
    } catch (error) {
      logger.error(`Error storing image ${imagePath}:`, error);
      return false;
    }
  }

  private imagePath(imageId: string) {
    return path.join(this.storagePath, imageId) + ".png";
  }

  private async createStorageDirectory(): Promise<void> {
    try {
      await fs.access(this.storagePath);
      logger.info(`storage directory FOUND: ${this.storagePath}:`);
    } catch {
      await fs.mkdir(this.storagePath, { recursive: true });
      logger.info(`storage directory NOT FOUND`);
      logger.info(`creating directory: ${this.storagePath}:`);
    }
  }
}
