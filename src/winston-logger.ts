import * as winston from 'winston';
import { LoggerService } from './services/logger.service';

const logger = winston.createLogger({
  level: ['error', 'warn', 'help', 'data', 'info', 'debug'].includes(process.env.DEBUG)
    ? process.env.DEBUG
    : 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: '/tmp/combined.log' }),
    new winston.transports.File({ filename: '/tmp/error.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV === 'debug') {
  logger.level = 'debug';
}

export const winstonLogger = new LoggerService(logger);
