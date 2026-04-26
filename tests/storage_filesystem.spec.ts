import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { logger } from "../src/lib/logger.js";
import { FileSystemStorageProvider } from "../src/lib/storage/filesystem.js";

describe("FileSystemStorageProvider", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "url-to-png-fs-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("returns null without logging an error when the image is not cached", async () => {
    const provider = new FileSystemStorageProvider(tmpDir);
    const errorSpy = vi.spyOn(logger, "error");

    const result = await provider.fetchImage("does-not-exist");

    expect(result).toBeNull();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("round-trips a stored image", async () => {
    const provider = new FileSystemStorageProvider(tmpDir);
    const payload = Buffer.from("png-bytes");

    const stored = await provider.storeImage("cached", payload);
    const fetched = await provider.fetchImage("cached");

    expect(stored).toBe(true);
    expect(fetched?.equals(payload)).toBe(true);
  });

  it("logs an error when fetch fails for a reason other than missing file", async () => {
    const provider = new FileSystemStorageProvider(tmpDir);
    await fs.writeFile(path.join(tmpDir, "locked.png"), "data");
    await fs.chmod(path.join(tmpDir, "locked.png"), 0o000);
    const errorSpy = vi.spyOn(logger, "error");

    try {
      await provider.fetchImage("locked");
    } finally {
      await fs.chmod(path.join(tmpDir, "locked.png"), 0o644);
    }

    if (process.getuid?.() === 0) return; // root bypasses chmod
    expect(errorSpy).toHaveBeenCalled();
  });
});
