import * as genericPool from 'generic-pool';
import { Factory, Options } from 'generic-pool';
import * as puppeteer from 'puppeteer';
import {  Page } from 'puppeteer';

const factory: Factory<Page> = {
  async create() {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    return await browser.newPage();
  },
  async destroy(page: Page) {
    const browser = await page.browser();
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
  return genericPool.createPool<Page>(factory, opts);
}
