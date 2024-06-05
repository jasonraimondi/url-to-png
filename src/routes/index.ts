import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { AppEnv } from "../app.js";
import { ImageRenderInterface } from "../lib/image_render.js";
import { logger } from "../lib/logger.js";

import { ImageStorage } from "../lib/storage/_base.js";

export function getIndex(
  imageStorageService: ImageStorage,
  imageRenderService: ImageRenderInterface,
) {
  return async (c: Context<AppEnv>) => {
    const { url, ...input } = c.get("input");
    const imageId = c.get("imageId");

    let imageBuffer: Buffer | null = await imageStorageService.fetchImage(imageId);

    if (imageBuffer === null || input.forceReload) {
      try {
        imageBuffer = await imageRenderService.screenshot(url, input);
      } catch (err: any) {
        throw new HTTPException(500, { message: err.message });
      }

      try {
        await imageStorageService.storeImage(imageId, imageBuffer);
      } catch (err) {
        logger.error("Error storing image", err);
      }
    }

    if (imageBuffer === null) {
      throw new HTTPException(500, { message: "Error rendering image" });
    }

    return c.body(imageBuffer, 200, {
      "Content-Type": "image/png",
      "Cache-Control": process.env.CACHE_CONTROL ?? "public, max-age=86400, immutable",
    });
  };
}
