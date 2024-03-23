import * as genericPool from "generic-pool";
import { Factory, Options } from "generic-pool";
import { Browser, chromium } from "playwright";
import { logger } from "./logger.js";

type BrowserPoolConstructorArgs = {
  poolOpts: Options;
  browserOpts?: never;
};

export type PoolMetrics = {
  spareResourceCapacity: number;
  size: number;
  available: number;
  borrowed: number;
  pending: number;
  max: number;
  min: number;
};

export class BrowserPool {
  private pool: genericPool.Pool<Browser>;

  private factory: Factory<Browser> = {
    async create(): Promise<Browser> {
      try {
        return await chromium.launch({
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
      } catch (e) {
        if (e.message.includes("exec playwright install")) {
          logger.fatal(e.message);
          process.exit(1);
        } else {
          logger.error(e.message);
        }
        throw e;
      }
    },
    async destroy(browser: Browser) {
      await browser.close();
    },
  };

  constructor({ poolOpts }: BrowserPoolConstructorArgs = {} as BrowserPoolConstructorArgs) {
    poolOpts = {
      max: Number(process.env.POOL_MAX) || 10,
      min: Number(process.env.POOL_MIN) || 2,
      maxWaitingClients: Number(process.env.POOL_MAX_WAITING_CLIENTS) || 50,
      idleTimeoutMillis: Number(process.env.POOL_IDLE_TIMEOUT_MS) || 15000,
      ...poolOpts,
    };
    logger.info(poolOpts);
    this.pool = genericPool.createPool<Browser>(this.factory, poolOpts);
  }

  get poolMetrics(): PoolMetrics {
    return {
      spareResourceCapacity: this.pool.spareResourceCapacity,
      size: this.pool.size,
      available: this.pool.available,
      borrowed: this.pool.borrowed,
      pending: this.pool.pending,
      max: this.pool.max,
      min: this.pool.min,
    };
  }

  async acquire(): Promise<Browser> {
    return await this.pool.acquire();
  }

  async release(browser: Browser): Promise<void> {
    await this.pool.release(browser);
  }

  async drain() {
    await this.pool.drain();
    await this.pool.clear();
  }
}
