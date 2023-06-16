import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { ApplicationModule } from "./app.module";
import { winstonLogger } from "./winston-logger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter(), {
    logger: winstonLogger,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  await app.register(rateLimit, { max: 100, timeWindow: "1 minute" });
  await app.register(helmet, { contentSecurityPolicy: false });

  await app.listen(3000, "0.0.0.0");
}

bootstrap()
  .then()
  .catch((err) => {
    winstonLogger.error(JSON.stringify(err));
  });
