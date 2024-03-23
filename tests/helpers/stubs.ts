import fs from "fs/promises";

import { ImageRenderInterface } from "../../src/lib/image_render.js";
import { IMAGE_EXTENSION } from "../../src/lib/storage/_base.js";

export class StubImageRenderService implements ImageRenderInterface {
  async screenshot(): Promise<Buffer> {
    const { join } = await import("path");
    const filePath = join(__dirname, `./assets/test_img.${IMAGE_EXTENSION}`);
    return await fs.readFile(filePath);
  }
}
