import { describe, expect, it } from "vitest";

import { buildImageId } from "../src/lib/utils.js";

const fixedDate = new Date("2026-04-26T12:00:00Z");

describe("buildImageId", () => {
  it("uses an ISO yyyy-mm-dd prefix and the slugified url", () => {
    const id = buildImageId("https://example.com", new URLSearchParams(), fixedDate);
    expect(id.startsWith("2026-04-26.httpsexamplecom")).toBe(true);
  });

  it("is independent of query parameter order", () => {
    const a = buildImageId(
      "https://x.com",
      new URLSearchParams("width=400&height=300"),
      fixedDate,
    );
    const b = buildImageId(
      "https://x.com",
      new URLSearchParams("height=300&width=400"),
      fixedDate,
    );
    expect(a).toBe(b);
  });

  it("ignores forceReload so the cached image is reused after a force render", () => {
    const a = buildImageId("https://x.com", new URLSearchParams("width=400"), fixedDate);
    const b = buildImageId(
      "https://x.com",
      new URLSearchParams("width=400&forceReload=true"),
      fixedDate,
    );
    expect(a).toBe(b);
  });

  it("ignores the url and hash params (the url is supplied separately)", () => {
    const a = buildImageId("https://x.com", new URLSearchParams("width=400"), fixedDate);
    const b = buildImageId(
      "https://x.com",
      new URLSearchParams("url=https://x.com&hash=str-enc:foo&width=400"),
      fixedDate,
    );
    expect(a).toBe(b);
  });

  it("differs when an actual rendering parameter changes", () => {
    const a = buildImageId("https://x.com", new URLSearchParams("width=400"), fixedDate);
    const b = buildImageId("https://x.com", new URLSearchParams("width=500"), fixedDate);
    expect(a).not.toBe(b);
  });
});
