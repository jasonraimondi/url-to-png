import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { AppEnv } from "../app.js";
import { logger } from "../lib/logger.js";

export function handleAllowListMiddleware(allowList: string[]) {
  return async (c: Context<AppEnv>, next: () => Promise<void>) => {
    const input = c.get("input");
    const newurl = new URL(input.url).host;
    logger.info(`URL new: ${newurl}`);
    const isValidDomain = allowList.includes(newurl);

    if (!isValidDomain) {
      logger.warn(`Blocked request to ${input.url} - not in allowlist`);
      throw new HTTPException(403, { message: "Access to this URL is forbidden" });
    }

    await next();
  };
}
