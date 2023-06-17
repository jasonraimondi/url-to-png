import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { S3Client } from "@aws-sdk/client-s3";
import { Options } from "generic-pool";
import * as nano from "nano";

import { AppController } from "./controllers/app.controller";
import { createBrowserPool } from "./browser-pool";
import { ImageRenderService, WaitForOptions } from "./services/image-render.service";
import { IImageStorage, ImageStorageService } from "./services/image-storage.service";
import { AmazonS3StorageProvider } from "./storage/amazon-s3-storage.provider";
import { CouchDbStorageProvider } from "./storage/couch-db-storage.provider";
import { StubStorageProvider } from "./storage/stub-storage.provider";
import { winstonLogger } from "./winston-logger";
import { AllowListGuard } from "./allow_list.guard";
import { LoggerService } from "./services/logger.service";

const imageStorageService = {
  provide: ImageStorageService,
  async useFactory() {
    let imageStorage: IImageStorage;

    switch (process.env.STORAGE_PROVIDER) {
      case "s3":
        imageStorage = new AmazonS3StorageProvider(
          new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY,
              secretAccessKey: process.env.AWS_SECRET_KEY,
            },
          }),
          process.env.AWS_BUCKET,
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
      default:
        imageStorage = new StubStorageProvider(winstonLogger);
    }

    console.log(imageStorage.constructor.name)

    return new ImageStorageService(imageStorage);
  },
};

const imageRenderService = {
  provide: ImageRenderService,
  useFactory: (logger) => {
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
  useFactory: (logger) => new AllowListGuard(logger, process.env.ALLOW_LIST),
  inject: [LoggerService],
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [imageRenderService, imageStorageService, loggerService, allowListGuard],
})
export class ApplicationModule {}
