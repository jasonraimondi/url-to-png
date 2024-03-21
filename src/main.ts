import "dotenv/config";

import { serve } from "@hono/node-server";
import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";

import { createApplication } from "./app.js";
import { BrowserPool } from "./lib/browser_pool.js";
import {
  createBrowserPool,
  createImageRenderService,
  createImageStorageService,
} from "./lib/factory.js";
import { logger } from "./lib/logger.js";

let server: ReturnType<typeof serve>;

async function main() {
  const encryptionService = process.env.CRYPTO_KEY
    ? await StringEncrypter.fromCryptoString(process.env.CRYPTO_KEY)
    : undefined;

  const imageStorageService = createImageStorageService();

  const browserPool: BrowserPool = createBrowserPool();

  const imageRenderService = createImageRenderService(browserPool);

  const app = createApplication(
    browserPool,
    imageRenderService,
    imageStorageService,
    encryptionService,
  );

  const port = Number(process.env.PORT) || 3089;
  server = serve({ fetch: app.fetch, port });

  process.on("SIGINT", async () => {
    logger.info("Playwright Shutdown [STARTING]");
    logger.info("Playwright Shutdown [DONE]");
    logger.info("Server Shutdown [STARTING]");
    server?.close();
    await browserPool.drain();
    logger.info("Server Shutdown [DONE]");
    logger.info("EXITING...");
    process.exit(0);
  });

  logger.info(`Server is running on port http://localhost:${port}/ping`);
  if (process.env.NODE_ENV === "development") {
    logger.info(`http://localhost:${port}/?url=https://jasonraimondi.com/resume&isFullPage=true`);
  }
}

main()
  .then()
  .catch(err => {
    logger.error(err);
  });
