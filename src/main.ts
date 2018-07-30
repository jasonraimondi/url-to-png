import { join } from 'path';

const projectRoot = join(__dirname, '../');

require('dotenv').config({ path: projectRoot + '/config/.env' });

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);
}

bootstrap();
