import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { parseForm } from "zod-ff";

import { AppEnv } from "../app.js";

import { PlainConfigSchema } from "../lib/schema.js";
import { configToString, slugify } from "../lib/utils.js";
import { logger } from "../lib/logger.js";

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

    if (validData.width && validData.width > 1920) {
      validData.width = 1920;
    }

    if (validData.height && validData.height > 1920) {
      validData.height = 1920;
    }

    const viewportWidth = validData.viewportWidth ?? validData.viewPortWidth;
    if (viewportWidth && viewportWidth > 1920) {
      validData.width = 1920;
    }

    const viewportHeight = validData.viewportHeight ?? validData.viewPortHeight;
    if (viewportHeight && viewportHeight > 1920) {
      validData.width = 1920;
    }

    const date = new Date();
    const dateString = date.toLocaleDateString().replace(/\//g, "-");
    const imageId = dateString + "." + slugify(validData.url) + configToString(params);

    c.set("input", validData);
    c.set("imageId", imageId);

    await next();
  };
}
