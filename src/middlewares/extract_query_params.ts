import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { parseForm } from "zod-ff";

import { AppEnv } from "../app.js";

import { PlainConfigSchema, clampDimensions } from "../lib/schema.js";
import { buildImageId } from "../lib/utils.js";
import { logger } from "../lib/logger.js";

function inputToParams(input: PlainConfigSchema): URLSearchParams {
  const out = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value === null || value === undefined) continue;
    out.set(key, String(value));
  }
  return out;
}

export function handleExtractQueryParamsMiddleware(encryptionService?: StringEncrypter) {
  return async (c: Context<AppEnv>, next: () => Promise<void>) => {
    const params = new URL(c.req.url).searchParams;
    let input: PlainConfigSchema | URLSearchParams;

    if (params.has("hash")) {
      if (!encryptionService) {
        throw new HTTPException(400, { message: "This server is not configured for encryption" });
      }
      const hash = params.get("hash");
      if (typeof hash !== "string" || !hash.startsWith("str-enc:")) {
        throw new HTTPException(400, { message: "Invalid hash" });
      }
      const decryptedString = await encryptionService.decrypt(hash);
      input = JSON.parse(decryptedString);
    } else {
      if (encryptionService) {
        throw new HTTPException(400, { message: "This server must use encryption" });
      }
      input = params;
    }

    const { validData, errors } = parseForm({ data: input, schema: PlainConfigSchema });

    if (validData?.viewPortWidth !== undefined) {
      logger.warn("'viewPortWidth' is deprecated, please use 'viewportWidth'");
    }
    if (validData?.viewPortHeight !== undefined) {
      logger.warn("'viewPortHeight' is deprecated, please use 'viewportHeight'");
    }

    if (errors) {
      let message: string = "Invalid query parameters: ";

      const specificErrors = Object.entries(errors)
        .map(([key, value]) => `(${key} - ${value})`)
        .join(" ");

      message = `${message} ${specificErrors}`;

      throw new HTTPException(400, { message, cause: errors });
    }

    const clamped = clampDimensions(validData);
    const imageId = buildImageId(clamped.url, inputToParams(clamped));

    c.set("input", clamped);
    c.set("imageId", imageId);

    await next();
  };
}
