import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { S3Client } from "@aws-sdk/client-s3";
import { Options } from "generic-pool";
import nano from "nano";

import { AppController } from "./controllers/app.controller.js";
import { createBrowserPool } from "./browser-pool.js";
import { ImageRenderService, WaitForOptions } from "./services/image-render.service.js";
import { IImageStorage, ImageStorageService } from "./services/image-storage.service.js";
import { AmazonS3StorageProvider } from "./storage/amazon-s3-storage.provider.js";
import { CouchDbStorageProvider } from "./storage/couch-db-storage.provider.js";
import { StubStorageProvider } from "./storage/stub-storage.provider.js";
import { winstonLogger } from "./winston-logger.js";
import { AllowListGuard } from "./allow_list.guard.js";
import { LoggerService } from "./services/logger.service.js";
import { FileSystemStorageProvider } from "./storage/file-system-storage.provider.js";

const imageStorageService = {
  provide: ImageStorageService,
  async useFactory() {
    let imageStorage: IImageStorage;

    switch (process.env.STORAGE_PROVIDER) {
      case "s3":
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY!;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.AWS_SECRET_KEY!;
        const region = process.env.AWS_DEFAULT_REGION ?? process.env.AWS_REGION!;

        imageStorage = new AmazonS3StorageProvider(
          new S3Client({
            region,
            endpoint: process.env.AWS_ENDPOINT_URL_S3!,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
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
        imageStorage = new CouchDbStorageProvider(nano(`${protocol}://${user}:${pass}@${host}:${port}`));
        break;
      case "filesystem":
        const filePath = process.env.IMAGE_STORAGE_PATH!;
        imageStorage = new FileSystemStorageProvider(filePath, winstonLogger);
        break;
      default:
        imageStorage = new StubStorageProvider(winstonLogger);
    }

    console.log(imageStorage.constructor.name)

    return new ImageStorageService(imageStorage);
  },
};

const imageRenderService = {
  provide: ImageRenderService,
  useFactory: (logger: LoggerService) => {
    const isValidInteger = (sample: any) => Number.isInteger(Number(sample));
    const opts: Options = {};

    if (isValidInteger(process.env.POOLS_MAX)) {
      opts.max = Number(process.env.POOLS_MAX);
    }

    if (isValidInteger(process.env.POOLS_MIN)) {
      opts.min = Number(process.env.POOLS_MIN);
    }

    if (isValidInteger(process.env.POOLS_MAX_WAITING)) {
      opts.maxWaitingClients = Number(process.env.POOLS_MAX_WAITING);
    }

    if (isValidInteger(process.env.POOLS_MAX)) {
      opts.max = Number(process.env.POOLS_MAX);
    }

    const navigationOptions: Partial<WaitForOptions> = {};
    switch (process.env.BROWSER_WAIT_UNTIL) {
      case "load":
      case "domcontentloaded":
      case "networkidle":
        navigationOptions.waitUntil = process.env.BROWSER_WAIT_UNTIL;
        break;
    }

    if (isValidInteger(process.env.BROWSER_TIMEOUT)) {
      navigationOptions.timeout = Number(process.env.BROWSER_TIMEOUT);
    }

    const browserPool = createBrowserPool(opts);
    return new ImageRenderService(browserPool, logger, navigationOptions);
  },
  inject: [LoggerService],
};

const loggerService = {
  provide: LoggerService,
  useValue: winstonLogger,
};

const allowListGuard = {
  provide: APP_GUARD,
  useFactory: (logger: LoggerService) => new AllowListGuard(logger, process.env.ALLOW_LIST),
  inject: [LoggerService],
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [imageRenderService, imageStorageService, loggerService, allowListGuard],
})
export class ApplicationModule {}
