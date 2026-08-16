import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("renders the governed v46 entry route without starter preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /相遇卡 v46 · Encounter Cards/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("routes mobile and studio surfaces to the generated v46 encounter artifact", async () => {
  const mobile = await readFile(new URL("../app/mobile/page.tsx", import.meta.url), "utf8");
  const studio = await readFile(new URL("../app/studio/page.tsx", import.meta.url), "utf8");
  const packageDocument = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

  assert.match(mobile, /\/v46\/index\.html\?surface=mobile/);
  assert.match(studio, /\/v46\/index\.html\?surface=studio/);
  assert.equal(packageDocument.name, "encounter-cards-v46");
  assert.equal(packageDocument.version, "46.0.0");
});

test("ships the complete SHINE question book in data and assets", async () => {
  const source = await readFile(new URL("../app/encounter/data/shine-question-book.ts", import.meta.url), "utf8");
  const markdown = await readFile(new URL("../app/encounter/assets/questions/SHINE_QUESTION_BOOK.md", import.meta.url), "utf8");

  assert.equal(source.match(/\bnumber: \d+/g)?.length, 62);
  assert.equal(markdown.match(/^### \d{2}\. /gm)?.length, 62);
  assert.equal(source.match(/depth: 'ice'/g)?.length, 9);
  assert.equal(source.match(/depth: 'one'/g)?.length, 20);
  assert.equal(source.match(/depth: 'two'/g)?.length, 19);
  assert.equal(source.match(/depth: 'three'/g)?.length, 14);
  assert.match(source, /id: `shine-\$\{String\(question\.number\)\.padStart\(2, '0'\)\}`/);
  assert.match(markdown, /\| \*\*TOTAL｜總計\*\* \| \*\*62\*\* \|/);
});
