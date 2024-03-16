import * as winston from "winston";
import * as Transport from "winston-transport";

import { LoggerService } from "./services/logger.service.js";

const transports: Transport[] = [new winston.transports.Console({ format: winston.format.simple() })];

const isNotDocker = !process.env.DOCKER;

if (isNotDocker) {
  transports.push(
    new winston.transports.File({ filename: "/tmp/combined.log" }),
    new winston.transports.File({ filename: "/tmp/error.log", level: "error" }),
  );
}

const logger = winston.createLogger({
  level: ["error", "warn", "help", "data", "info", "debug"].includes(process.env.DEBUG ?? "") ? process.env.DEBUG : "info",
  format: winston.format.json(),
  transports,
});

if (process.env.NODE_ENV === "debug") {
  logger.level = "debug";
}

export const winstonLogger = new LoggerService(logger);
