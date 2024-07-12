// blockedHostsMiddleware.ts
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { AppEnv } from "../app.js";
import { logger } from "../lib/logger.js";

export function handleBlockListMiddleware(blockList: string[]) {
  return async (c: Context<AppEnv>, next: () => Promise<void>) => {
    const input = c.get("input");
    const urlHost = new URL(input.url).host;
    logger.info(`Request URL host: ${urlHost}`);

    // Check if the host is in the block list
    if (blockList.includes(urlHost)) {
      logger.warn(`Blocked request to ${input.url} - host is in block list`);
      throw new HTTPException(403, { message: "Access to this URL is forbidden" });
    }

    await next();
  };
}
