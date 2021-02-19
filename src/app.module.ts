import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Options } from 'generic-pool';
import * as nano from 'nano';

import { AppController } from './controllers/app.controller';
import { createPuppeteerPool } from './puppeteer-pool';
import { ImageRenderService, WaitForOptions } from "./services/image-render.service";
import { IImageStorage, ImageStorageService } from './services/image-storage.service';
import { AmazonS3StorageProvider } from './storage/amazon-s3-storage.provider';
import { CouchDbStorageProvider } from './storage/couch-db-storage.provider';
import { StubStorageProvider } from './storage/stub-storage.provider';
import { winstonLogger } from './winston-logger';

const imageStorageService = {
  provide: 'ImageStorageService',
  async useFactory() {
    let imageStorage: IImageStorage;

    switch (process.env.STORAGE_PROVIDER) {
      case 's3':
        AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY;
        AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;
        AWS.config.region = process.env.AWS_REGION;
        imageStorage = new AmazonS3StorageProvider(new AWS.S3(), process.env.AWS_BUCKET);
        break;
      case 'couchdb':
        const protocol = process.env.COUCH_DB_PROTOCOL;
        const user = process.env.COUCH_DB_USER;
        const pass = process.env.COUCH_DB_PASS;
        const host = process.env.COUCH_DB_HOST;
        const port = process.env.COUCH_DB_PORT;
        imageStorage = new CouchDbStorageProvider(
          nano(`${protocol}://${user}:${pass}@${host}:${port}`),
        );
        break;
      default:
        imageStorage = new StubStorageProvider(winstonLogger);
    }

    return new ImageStorageService(imageStorage);
  },
};

const imageRenderService = {
  provide: 'ImageRenderService',
  async useFactory() {
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
    switch (process.env.PUPPETEER_WAIT_UNTIL) {
      case 'load':
      case 'domcontentloaded':
      case 'networkidle':
        navigationOptions.waitUntil = process.env.PUPPETEER_WAIT_UNTIL;
        break;
    }

    if (isValidInteger(process.env.PUPPETEER_TIMEOUT)) {
      navigationOptions.timeout = Number(process.env.PUPPETEER_TIMEOUT);
    }

    const puppeteerPool = createPuppeteerPool(opts);
    return new ImageRenderService(puppeteerPool, winstonLogger, navigationOptions);
  },
};

const loggerService = {
  provide: 'LoggerService',
  useFactory() {
    return winstonLogger;
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [imageRenderService, imageStorageService, loggerService],
})
export class ApplicationModule {}
