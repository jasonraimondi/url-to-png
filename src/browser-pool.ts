import * as genericPool from "generic-pool";
import { Factory, Options } from "generic-pool";
import { chromium, Browser } from "playwright";

const factory: Factory<Browser> = {
  async create(): Promise<Browser> {
    return await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  },
  async destroy(browser: Browser) {
    await browser.close();
  },
};

export function createBrowserPool(opts: Options = {}) {
  opts = {
    max: 10,
    min: 2,
    maxWaitingClients: 50,
    idleTimeoutMillis: 15000,
    ...opts,
  };
  return genericPool.createPool<Browser>(factory, opts);
}
