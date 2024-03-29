import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";
import type { Hono } from "hono";
import { it, describe, suite, expect, beforeEach } from "vitest";

import { type AppEnv, createApplication } from "../src/app.js";
import { createBrowserPool, createImageStorageService } from "../src/lib/factory.js";
import { StubImageRenderService } from "./helpers/stubs.js";

suite("app", () => {
  let app: Hono<AppEnv>;

  const browserPool = createBrowserPool();
  const imageStorageService = createImageStorageService();
  const imageRenderService = new StubImageRenderService();

  beforeEach(() => {
    app = createApplication(browserPool, imageRenderService, imageStorageService);
  });

  describe("GET /ping", () => {
    it("success", async () => {
      const res = await app.request("/ping");
      expect(res.status).toBe(200);
      expect(await res.json()).toBe("pong");
    });
  });

  describe("GET /metrics", () => {
    beforeEach(() => {
      process.env.METRICS = "true";
      app = createApplication(browserPool, imageRenderService, imageStorageService);
    });

    it("success", async () => {
      const res = await app.request("/metrics");
      expect(res.status).toBe(200);
      expect(await res.json()).toStrictEqual({
        poolMetrics: {
          available: 0,
          borrowed: 0,
          max: 10,
          min: 2,
          pending: 0,
          size: 2,
          spareResourceCapacity: 8,
        },
      });
    });
  });

  describe("GET /?url=", () => {
    describe("png", () => {
      it("succeeds with minimal", async () => {
        const res = await app.request("/?url=https://google.com");
        expect(res.headers.get("content-type")).toBe("image/png");
        expect(res.status).toBe(200);
      });

      it("succeeds with resize", async () => {
        const res = await app.request("/?url=https://google.com&width=500&height=500");
        expect(res.status).toBe(200);
      });

      it("throws when invalid domain", async () => {
        const res = await app.request("/?url=bar");
        expect(res.status).toBe(400);
        expect(await res.text()).toMatch(/Invalid query/gi);
      });
    });

    describe("webp", () => {
      beforeEach(async () => {
        process.env.DEFAULT_WEBP = "true";
        const browserPool = createBrowserPool();
        const imageStorageService = createImageStorageService();
        const imageRenderService = new StubImageRenderService();
        app = createApplication(browserPool, imageRenderService, imageStorageService);
      });

      it("succeeds with webp", async () => {
        const res = await app.request("/?url=https://google.com");
        expect(res.headers.get("content-type")).toBe("image/webp");
        expect(res.status).toBe(200);
      });
    });
  });

  describe("GET /?hash=", () => {
    describe("without CRYPTO_KEY", () => {
      it("throws when server is not configured for encryption", async () => {
        const res = await app.request(
          "/?hash=str-enc:a/4xkic0kY8scM3QRJIiLLtQ3NhZxEudhmd7RZDbsuuguXkamhZe0HdW9LmnZxtGCtf0GAPO5II85fE8rSkdFNIbBATyS/INKM0hmw==:a4S74z7c4DQVtijl",
        );
        const body = await res.json();
        expect(res.status).toBe(400);
        expect(body.message).toMatch(/This server is not configured for encryption/);
      });
    });

    describe("with CRYPTO_KEY", () => {
      beforeEach(async () => {
        const cryptoKey =
          "{\"kty\":\"oct\",\"k\":\"cq8cebOn49gXxcjoRbjP93z4OpzCkyz4WJSgPnvR4ds\",\"alg\":\"A256GCM\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"ext\":true}";
        const stringEncrypter = await StringEncrypter.fromCryptoString(cryptoKey);
        app = createApplication(
          browserPool,
          imageRenderService,
          imageStorageService,
          stringEncrypter,
        );
      });

      it("succeeds!", async () => {
        const res = await app.request(
          "/?hash=str-enc:a/4xkic0kY8scM3QRJIiLLtQ3NhZxEudhmd7RZDbsuuguXkamhZe0HdW9LmnZxtGCtf0GAPO5II85fE8rSkdFNIbBATyS/INKM0hmw==:a4S74z7c4DQVtijl",
        );
        expect(res.status).toBe(200);
      });
    });
  });
});