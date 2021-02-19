import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { winstonLogger } from './winston-logger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {
    logger: winstonLogger,
  });
  app.enableShutdownHooks();
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(helmet());
  await app.listen(3000);
}

bootstrap()
  .then()
  .catch((err) => {
    winstonLogger.error(JSON.stringify(err));
  });
