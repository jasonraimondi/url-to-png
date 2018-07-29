import * as nano from 'nano';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CouchDBService } from './couch-d-b.service';

export const couchDBService = {
  provide: 'CouchDBService',
  useFactory: () => {
    return new CouchDBService(
      nano('http://jason:couchdb@localhost:5984')
    );
  }
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [couchDBService],
})
export class ApplicationModule {}
