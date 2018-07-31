import AWS = require('aws-sdk');
import * as nano from 'nano';
import { join } from 'path';
import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { RenderImageService } from './services/RenderImageService';
import { StorageService } from './services/storage/StorageService';
import { StubStorageService } from './services/storage/providers/StubStorageService';
import { StorageInterface } from './services/storage/StorageInterface';
import { AmazonStorageProvider } from './services/storage/providers/AmazonStorageProvider';
import { CouchDBStorageProvider } from './services/storage/providers/CouchDBStorageProvider';

const projectRoot = join(__dirname, '../');
const AWS_BUCKET = process.env.AWS_BUCKET;

const storageService = {
  provide: 'StorageService',
  useFactory() {
    let storageInterface: StorageInterface = new StubStorageService();

    if (process.env.AWS_S3) {
      AWS.config.loadFromPath(projectRoot + '/config/aws-config.json');
      storageInterface = new AmazonStorageProvider(new AWS.S3(), AWS_BUCKET);
    } else if (process.env.COUCH_DB) {
      storageInterface = new CouchDBStorageProvider(nano('http://jason:couchdb@couchdb:5984'));
    }

    return new StorageService(storageInterface);
  },
};

const renderImageService = {
  provide: 'RenderImageService',
  async useFactory() {
    return new RenderImageService();
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [renderImageService, storageService],
})
export class ApplicationModule {}
