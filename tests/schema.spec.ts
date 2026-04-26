import { describe, expect, it } from "vitest";

import { MAX_DIMENSION, clampDimensions, PlainConfigSchema } from "../src/lib/schema.js";

const baseInput: PlainConfigSchema = {
  url: "https://example.com",
};

describe("clampDimensions", () => {
  it("leaves values within range untouched", () => {
    const out = clampDimensions({
      ...baseInput,
      width: 800,
      height: 600,
      viewportWidth: 1280,
      viewportHeight: 720,
    });
    expect(out.width).toBe(800);
    expect(out.height).toBe(600);
    expect(out.viewportWidth).toBe(1280);
    expect(out.viewportHeight).toBe(720);
  });

  it("clamps width and height above the max", () => {
    const out = clampDimensions({ ...baseInput, width: 5000, height: 5000 });
    expect(out.width).toBe(MAX_DIMENSION);
    expect(out.height).toBe(MAX_DIMENSION);
  });

  it("clamps viewportWidth and viewportHeight (not width) when they exceed the max", () => {
    const out = clampDimensions({
      ...baseInput,
      viewportWidth: 5000,
      viewportHeight: 5000,
    });
    expect(out.viewportWidth).toBe(MAX_DIMENSION);
    expect(out.viewportHeight).toBe(MAX_DIMENSION);
    expect(out.width).toBeUndefined();
    expect(out.height).toBeUndefined();
  });

  it("clamps the deprecated viewPortWidth/viewPortHeight aliases", () => {
    const out = clampDimensions({
      ...baseInput,
      viewPortWidth: 9000,
      viewPortHeight: 9000,
    });
    expect(out.viewPortWidth).toBe(MAX_DIMENSION);
    expect(out.viewPortHeight).toBe(MAX_DIMENSION);
  });

  it("preserves null/undefined for absent fields", () => {
    const out = clampDimensions(baseInput);
    expect(out.width).toBeUndefined();
    expect(out.viewportWidth).toBeUndefined();
  });
});
