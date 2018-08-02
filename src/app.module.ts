import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Options } from 'generic-pool';
import nano = require('nano');

import { AppController } from './controllers/app.controller';
import { createPuppeteerPool } from './puppeteer-pool';
import { ImageRenderService } from './services/image-render.service';
import { IImageStorage, ImageStorageService } from './services/image-storage.service';
import { AmazonS3StorageProvider } from './storage/amazon-s3-storage.provider';
import { CouchDbStorageProvider } from './storage/couch-db-storage.provider';
import { StubStorageProvider } from './storage/stub-storage.provider';

const storageService = {
  provide: 'ImageStorageService',
  async useFactory() {
    let imageStorage: IImageStorage;

    if (process.env.AWS_ENABLED) {
      AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY;
      AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;
      AWS.config.region = process.env.AWS_REGION;
      imageStorage = new AmazonS3StorageProvider(new AWS.S3(), process.env.AWS_BUCKET);
    } else if (process.env.COUCH_DB_ENABLED) {
      imageStorage = new CouchDbStorageProvider(nano('http://jason:couchdb@couchdb:5984'));
    } else {
      imageStorage = new StubStorageProvider();
    }

    return new ImageStorageService(imageStorage);
  },
};

const renderImageService = {
  provide: 'ImageRenderService',
  async useFactory() {
    const opts: Options = {};

    if (Number.isInteger(Number(process.env.POOLS_MAX))) {
      opts.max = Number(process.env.POOLS_MAX);
    }

    if (Number.isInteger(Number(process.env.POOLS_MIN))) {
      opts.min = Number(process.env.POOLS_MIN);
    }

    if (Number.isInteger(Number(process.env.POOLS_MAX_WAITING))) {
      opts.maxWaitingClients = Number(process.env.POOLS_MAX_WAITING);
    }

    const puppeteerPool = createPuppeteerPool(opts);
    return new ImageRenderService(puppeteerPool);
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [renderImageService, storageService],
})
export class ApplicationModule {}
