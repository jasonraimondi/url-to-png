import fs from "fs/promises";

import { ImageRenderInterface } from "../../src/lib/image_render.js";
import { ImageTypeOpts } from "../../src/lib/storage/_base.js";
import { createImageOpts } from "../../src/lib/factory.js";

export class StubImageRenderService implements ImageRenderInterface {
  private readonly imageOpts: ImageTypeOpts
  constructor() {
    this.imageOpts = createImageOpts();
  }

  async screenshot(): Promise<Buffer> {
    const { join } = await import("path");
    const filePath = join(__dirname, `./assets/test_img.${this.imageOpts.ext}`);
    return await fs.readFile(filePath);
  }
}
