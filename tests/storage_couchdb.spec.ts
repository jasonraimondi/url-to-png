import md5 from "md5";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CouchDbStorageProvider } from "../src/lib/storage/couch-db.js";

type AttachmentStore = Map<string, { rev: string; image: Buffer }>;

function createMockNano(store: AttachmentStore) {
  const docGet = vi.fn(async (docId: string) => {
    const entry = store.get(docId);
    if (!entry) throw Object.assign(new Error("not_found"), { statusCode: 404 });
    return { _id: docId, _rev: entry.rev };
  });
  const attachmentGet = vi.fn(async (docId: string) => {
    const entry = store.get(docId);
    if (!entry) throw Object.assign(new Error("not_found"), { statusCode: 404 });
    return entry.image;
  });
  const attachmentInsert = vi.fn(
    async (
      docId: string,
      _attName: string,
      image: Buffer,
      _contentType: string,
      params?: { rev?: string },
    ) => {
      const existing = store.get(docId);
      if (existing && existing.rev !== params?.rev) {
        throw Object.assign(new Error("conflict"), { statusCode: 409 });
      }
      const nextRev = `${(parseInt(existing?.rev?.split("-")[0] ?? "0", 10) || 0) + 1}-x`;
      store.set(docId, { rev: nextRev, image });
      return { ok: true, id: docId, rev: nextRev };
    },
  );
  const db = {
    get: docGet,
    attachment: { get: attachmentGet, insert: attachmentInsert },
  };
  return {
    nano: { use: vi.fn(() => db) } as unknown as Parameters<
      typeof CouchDbStorageProvider.prototype["constructor"]
    >[0],
    spies: { docGet, attachmentGet, attachmentInsert },
  };
}

describe("CouchDbStorageProvider.storeImage", () => {
  let store: AttachmentStore;

  beforeEach(() => {
    store = new Map();
  });

  it("inserts a new attachment when the document does not exist", async () => {
    const { nano, spies } = createMockNano(store);
    const provider = new CouchDbStorageProvider(nano);

    const ok = await provider.storeImage("foo", Buffer.from("first"));

    expect(ok).toBe(true);
    expect(spies.attachmentInsert).toHaveBeenCalledTimes(1);
    expect(store.get(md5("foo"))?.image.toString()).toBe("first");
  });

  it("overwrites the attachment when the document already exists", async () => {
    const { nano, spies } = createMockNano(store);
    const provider = new CouchDbStorageProvider(nano);

    await provider.storeImage("foo", Buffer.from("first"));
    const ok = await provider.storeImage("foo", Buffer.from("second"));

    expect(ok).toBe(true);
    expect(spies.attachmentInsert).toHaveBeenCalledTimes(2);
    expect(store.get(md5("foo"))?.image.toString()).toBe("second");
  });
});
