import * as express from 'express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const server: any = express();
  const templatePath = join(__dirname, 'templates');
  
  nunjucks.configure(templatePath, {
    autoescape: true,
    express: server
  });
  
  const app = await NestFactory.create(ApplicationModule, server);
  app.use(express.static(join(__dirname, '../assets')));
  await app.listen(3000);
}
bootstrap();
