import fs from "fs/promises";

import {ImageRenderInterface} from "../../src/lib/image_render.js";

export class StubImageRenderService implements ImageRenderInterface {
  static readonly POOL_METRICS = {
    borrowed: 0,
    max: 1,
    min: 1,
    pending: 0,
    size: 1,
    spareResourceCapacity: 0,
    available: 1,
  };

  async drainBrowserPool(): Promise<void> {
  }

  async screenshot(): Promise<Buffer> {
    const {join} = await import("path");
    const filePath = join(__dirname, "./assets/test_img.png");
    return await fs.readFile(filePath);
  }

  poolMetrics(): Record<string, number> {
    return StubImageRenderService.POOL_METRICS;
  }
}
