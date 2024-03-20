import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { AppEnv } from "../app.js";
import { logger } from "../lib/logger.js";

export function handleAllowListMiddleware(allowList: string[]) {
  return async (c: Context<AppEnv>, next: () => Promise<void>) => {
    const input = c.get("input");
    const isValidDomain = allowList.includes(new URL(input.url).host);

    if (!isValidDomain) {
      logger.warn(`Blocked request to ${input.url} - not in allowlist`);
      throw new HTTPException(400, { message: "Invalid URL Requested" });
    }

    await next();
  };
}
