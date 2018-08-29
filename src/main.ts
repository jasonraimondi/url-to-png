import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { winstonLogger } from './winston-logger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {
    logger: winstonLogger,
  });
  await app.listen(3000);
}

bootstrap()
  .then()
  .catch((err) => {
    winstonLogger.error(JSON.stringify(err));
  });
