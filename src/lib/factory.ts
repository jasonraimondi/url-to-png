import { S3Client } from "@aws-sdk/client-s3";
import { Options } from "generic-pool";
import nano from "nano";

import { BrowserPool } from "./browser_pool.js";
import { ImageRenderService, WaitForOptions } from "./image_render.js";
import { logger } from "./logger.js";
import { ImageStorage } from "./storage/_base.js";
import { CouchDbStorageProvider } from "./storage/couch-db.js";
import { FileSystemStorageProvider } from "./storage/filesystem.js";
import { AmazonS3StorageProvider } from "./storage/s3.js";
import { StubStorageProvider } from "./storage/stub.js";
import { isValidNum } from "./utils.js";

export function createBrowserPool(opts: Options = {}) {
  return new BrowserPool({ poolOpts: opts });
}

export function createImageRenderService(browserPool: BrowserPool) {
  const navigationOptions: Partial<WaitForOptions> = {};
  switch (process.env.BROWSER_WAIT_UNTIL) {
    case "load":
    case "domcontentloaded":
    case "networkidle":
      navigationOptions.waitUntil = process.env.BROWSER_WAIT_UNTIL;
      break;
    default:
      break;
  }

  const width = isValidNum(process.env.DEFAULT_WIDTH) ? Number(process.env.DEFAULT_WIDTH) : 250;
  const height = isValidNum(process.env.DEFAULT_HEIGHT) ? Number(process.env.DEFAULT_HEIGHT) : 250;

  const defaultConfig = {
    width,
    height,
    viewportWidth: isValidNum(process.env.DEFAULT_VIEWPORT_WIDTH)
      ? Number(process.env.DEFAULT_VIEWPORT_WIDTH)
      : 1080,
    viewportHeight: isValidNum(process.env.DEFAULT_VIEWPORT_HEIGHT)
      ? Number(process.env.DEFAULT_VIEWPORT_HEIGHT)
      : 1080,
    isMobile: process.env.DEFAULT_IS_MOBILE === "true",
    isFullPage: process.env.DEFAULT_IS_FULL_PAGE === "true",
    isDarkMode: process.env.DEFAULT_IS_DARK_MODE === "true",
    deviceScaleFactor: isValidNum(process.env.DEFAULT_DEVICE_SCALE_FACTOR)
      ? Number(process.env.DEFAULT_DEVICE_SCALE_FACTOR)
      : 1,
  };

  return new ImageRenderService(browserPool, defaultConfig, navigationOptions);
}

export function createImageStorageService(): ImageStorage {
  let imageStorage: ImageStorage;
  switch (process.env.STORAGE_PROVIDER) {
    case "s3":
      imageStorage = new AmazonS3StorageProvider(
        new S3Client({
          region: process.env.AWS_DEFAULT_REGION ?? "us-east-1",
          endpoint: process.env.AWS_ENDPOINT_URL_S3,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
          forcePathStyle: process.env.AWS_FORCE_PATH_STYLE === "true",
        }),
        process.env.AWS_BUCKET!,
      );
      break;
    case "couchdb":
      const protocol = process.env.COUCH_DB_PROTOCOL;
      const user = process.env.COUCH_DB_USER;
      const pass = process.env.COUCH_DB_PASS;
      const host = process.env.COUCH_DB_HOST;
      const port = process.env.COUCH_DB_PORT;
      imageStorage = new CouchDbStorageProvider(
        nano(`${protocol}://${user}:${pass}@${host}:${port}`),
      );
      break;
    case "filesystem":
      const filePath = process.env.IMAGE_STORAGE_PATH!;
      imageStorage = new FileSystemStorageProvider(filePath);
      break;
    case "stub":
    default:
      imageStorage = new StubStorageProvider();
  }

  logger.info(imageStorage.constructor.name);

  return imageStorage;
}
