import * as winston from 'winston';
import { LoggerService } from './services/logger.service';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: '/tmp/combined.log' }),
    new winston.transports.File({ filename: '/tmp/error.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

if (process.env.NODE_ENV === 'debug') {
  logger.level = 'debug';
}

export const winstonLogger = new LoggerService(logger);
