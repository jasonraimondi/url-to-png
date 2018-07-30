import * as nano from 'nano';
import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { CouchDBService } from './services/CouchDBService';
import { RenderImageService } from './services/RenderImageService';

export const couchDBService = {
  provide: 'CouchDBService',
  useFactory: () => {
    return new CouchDBService(nano('http://jason:couchdb@couchdb:5984'));
  },
};

export const renderImageService = {
  provide: 'RenderImageService',
  useFactory: () => {
    return new RenderImageService();
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [couchDBService, renderImageService],
})
export class ApplicationModule {}
