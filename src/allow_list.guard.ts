import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";

export class AllowListGuard implements CanActivate {
  private readonly allowedHosts: string[];

  constructor(private readonly logger: LoggerService, allowList?: string) {
    this.allowedHosts = this.formatAllowList(allowList);
  }

  canActivate(context: ExecutionContext) {
    if (this.allowedHosts === undefined) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    let url: URL;
    try {
      url = new URL(req.query.url);
    } catch (e) {
      throw new UnauthorizedException("invalid url requested");
    }

    const isValidDomain = this.allowedHosts.includes(url.host);

    this.logger.debug(`isValidDomain: ${isValidDomain}`);
    this.logger.debug(`requested host: ${url.host}`);
    this.logger.debug(`allowed hosts: ${this.allowedHosts.toString()}`);

    if (!isValidDomain) {
      throw new UnauthorizedException("invalid url requested");
    }

    return true;
  }

  formatAllowList(allowList?: string): undefined | string[] {
    if (allowList === undefined || allowList === "") return;
    return allowList
      .split(",")
      .map((url) => url.trim())
      .map((url) => url.replace(/https?:\/\//g, ""))
      .map((url) => `http://${url}`)
      .map((url) => new URL(url))
      .map((url) => url.host);
  }
}
