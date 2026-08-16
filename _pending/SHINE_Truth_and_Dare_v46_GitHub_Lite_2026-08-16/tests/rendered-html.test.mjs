import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
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
  assert.match(await response.text(), developmentPreviewMeta);
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
