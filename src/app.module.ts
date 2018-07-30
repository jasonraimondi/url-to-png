import * as nano from 'nano';
import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { CouchDBService } from './services/storage/providers/CouchDBService';
import { RenderImageService } from './services/RenderImageService';
import { AmazonS3Service } from './services/storage/providers/AmazonS3Service';
import { join } from 'path';
import AWS = require('aws-sdk');
import { StorageService } from './services/storage/StorageService';
import { StubStorageService } from './services/storage/providers/StubStorageService';

const projectRoot = join(__dirname, '../');
const AWS_BUCKET = process.env.AWS_BUCKET;

const storageService = {
  provide: 'StorageService',
  useFactory() {
    let storageInterface = new StubStorageService();

    if (process.env.COUCH_DB) {
      AWS.config.loadFromPath(projectRoot + '/config/aws-config.json');
      storageInterface = new AmazonS3Service(new AWS.S3(), AWS_BUCKET);
    } else if (process.env.COUCH_DB) {
      storageInterface = new CouchDBService(nano('http://jason:couchdb@couchdb:5984'));
    }

    return new StorageService(storageInterface);
  },
};

const renderImageService = {
  provide: 'RenderImageService',
  useFactory() {
    return new RenderImageService();
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [renderImageService, storageService],
})
export class ApplicationModule {}
