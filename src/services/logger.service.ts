import { LoggerService as ILoggerService } from '@nestjs/common';
import { Logger } from 'winston';

export class LoggerService implements ILoggerService {
  constructor(private readonly logger: Logger) {}

  public log(message: string) {
    return this.logger.log({
      level: 'info',
      message,
    });
  }

  public debug(message: string) {
    return this.logger.debug(message);
  }

  public verbose(message: string) {
    return this.logger.verbose(message);
  }

  public info(message: string) {
    return this.log(message);
  }

  public warn(message: string) {
    return this.logger.warn(message);
  }

  public error(message: string, trace?: string) {
    return this.logger.error(message, trace);
  }
}
