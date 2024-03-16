import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { ApplicationModule } from "./app.module.js";
import { winstonLogger } from "./winston-logger.js";


if (process.env.AWS_ACCESS_KEY) {
  console.warn("AWS_ACCESS_KEY is deprecated, please use AWS_ACCESS_KEY_ID");
}

if (process.env.AWS_SECRET_KEY) {
  console.warn("AWS_SECRET_KEY is deprecated, please use AWS_SECRET_ACCESS_KEY");
}

if (process.env.AWS_REGION) {
  console.warn("AWS_REGION is deprecated, please use AWS_DEFAULT_REGION");
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter(), {
    logger: winstonLogger,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  await app.register(rateLimit as any, { max: 100, timeWindow: "1 minute" });
  await app.register(helmet as any, { contentSecurityPolicy: false });

  await app.listen(3000, "0.0.0.0");
}

bootstrap()
  .then()
  .catch((err) => {
    winstonLogger.error(JSON.stringify(err));
  });
