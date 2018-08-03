import * as genericPool from 'generic-pool';
import { Factory, Options } from 'generic-pool';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';

const factory: Factory<Browser> = {
  async create(): Promise<Browser> {
    return await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  },
  async destroy(browser: Browser) {
    await browser.close();
  },
};

export function createPuppeteerPool(opts: Options = {}) {
  opts = {
    max: 10,
    min: 2,
    maxWaitingClients: 50,
    ...opts,
  };
  return genericPool.createPool<Browser>(factory, opts);
}
