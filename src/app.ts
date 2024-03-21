import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { StatusCode } from "hono/utils/http-status";

import { BrowserPool } from "./lib/browser_pool.js";
import { ImageRenderInterface } from "./lib/image_render.js";
import { logger } from "./lib/logger.js";
import { PlainConfigSchema } from "./lib/schema.js";
import { ImageStorage } from "./lib/storage/_base.js";
import { formatAllowList } from "./lib/utils.js";
import { handleAllowListMiddleware } from "./middlewares/allow_list.js";
import { handleExtractQueryParamsMiddleware } from "./middlewares/extract_query_params.js";
import { getIndex } from "./routes/index.js";

export type Variables = {
  input: PlainConfigSchema;
  imageId: string;
};
export type AppEnv = { Variables: Variables };

export function createApplication(
  browserPool: BrowserPool,
  imageRenderService: ImageRenderInterface,
  imageStorageService: ImageStorage,
  stringEncrypter?: StringEncrypter,
) {
  const app = new Hono<AppEnv>();

  app.use(
    secureHeaders({
      crossOriginResourcePolicy: "cross-origin",
    }),
  );

  if (process.env.METRICS === "true") {
    app.get("/metrics", c =>
      c.json(
        process.env.METRICS === "true"
          ? {
              poolMetrics: browserPool.poolMetrics,
            }
          : { message: "Metrics are disabled." },
      ),
    );
  }

  app.get("/ping", c => c.json("pong"));

  app.onError((err, c) => {
    let status: StatusCode = 500;
    if ("status" in err && typeof err.status === "number") {
      status = err.status as StatusCode;
    }
    return c.json({ message: err.message }, status);
  });

  app.use("/", handleExtractQueryParamsMiddleware(stringEncrypter));

  if (process.env.ALLOW_LIST && process.env.ALLOW_LIST.trim() !== "") {
    const allowList = formatAllowList(process.env.ALLOW_LIST);
    logger.info(`Allowed Domains: ${allowList.join(", ")}`);
    app.use("/", handleAllowListMiddleware(allowList));
  }

  app.get("/", getIndex(imageStorageService, imageRenderService));

  return app;
}
