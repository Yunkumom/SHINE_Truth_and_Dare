import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("v47 reserves mobile rows so card controls never cover the card", async () => {
  const [app, css] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
  ]);

  assert.match(app, /className="game-context-row"/);
  assert.match(app, /className="game-primary-row"/);
  assert.match(app, /t\.back/);
  assert.match(css, /grid-template-areas:\s*"status"\s*"card"\s*"context"\s*"actions"/);
  assert.match(css, /grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\)\s+auto\s+auto/);
  assert.match(css, /\.game-context-row\s*\{[^}]*position:\s*relative/s);
  assert.match(css, /\.game-primary-row\s*\{[^}]*position:\s*relative/s);
});

test("v47 presents an owner-friendly desktop studio with advanced raw controls", async () => {
  const [app, editor, css] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/LayoutEditor.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
  ]);

  assert.match(app, /useState\(true\).*directManipulation|directManipulation.*useState\(true\)/s);
  assert.match(app, /desktop-studio-toolbar/);
  assert.match(app, /owner-studio-inspector/);
  for (const label of ["畫面", "選取元素", "位置與尺寸", "安全區域", "進階"]) {
    assert.match(editor, new RegExp(label));
  }
  assert.match(editor, /EditorSection = 'layout' \| 'card' \| 'history' \| 'advanced'/);
  assert.match(css, /\.desktop-studio-toolbar/);
  assert.match(css, /\.owner-studio-inspector/);
});

test("v47 defaults the live card to question-only while keepsakes retain blessings", async () => {
  const [app, settings, types] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/MobileSettings.tsx"),
    source("../app/encounter/types.ts"),
  ]);

  assert.match(app, /showRealYou:\s*false/);
  assert.match(app, /showQuestion:\s*true/);
  assert.match(app, /showCardMeta:\s*false/);
  assert.match(app, /showBlessing:\s*false/);
  assert.match(app, /showFeatureNote:\s*false/);
  assert.match(app, /questionManager\.showBlessing\s*&&\s*<BlessingText/);
  assert.match(app, /keepsake-blessing/);
  assert.match(types, /showCardMeta:\s*boolean/);
  assert.match(types, /showBlessing:\s*boolean/);
  assert.match(types, /showFeatureNote:\s*boolean/);
  for (const label of ["真正的你", "等級與卡型", "祝福", "台灣特色"]) assert.match(settings, new RegExp(label));
});

test("v47 exposes the two-level quick deck selector beside the draw flow", async () => {
  const [app, selector, decks] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/QuickDeckSelector.tsx"),
    source("../app/encounter/data/quick-decks.ts"),
  ]);

  assert.match(app, /<QuickDeckSelector/);
  for (const label of ["全部", "神明", "星座", "經典守護者", "地方故事"]) {
    assert.match(`${selector}\n${decks}`, new RegExp(label));
  }
  assert.match(decks, /all-artwork/);
  assert.match(decks, /all-zodiac/);
});

test("v47 battle requests exclude personal and answer fields by contract", async () => {
  const [client, schema, hosting] = await Promise.all([
    source("../app/encounter/lib/battle-client.ts"),
    source("../db/schema.ts"),
    source("../.openai/hosting.json"),
  ]);
  const forbidden = /name|contact|birthday|answer|note|customQuestion|upload/i;
  assert.doesNotMatch(schema, forbidden);
  assert.match(client, /promptCompleted/);
  assert.doesNotMatch(client, /answerText|contact|birthday|uploadedImage/);
  assert.equal(JSON.parse(hosting).d1, "DB");
  assert.equal(JSON.parse(hosting).r2, null);
});

test("v47 Taiwan food deck contains 25 sourced cards across five balanced regions", async () => {
  const data = await source("../app/encounter/data/taiwan-food-cards.ts");
  const ids = [...data.matchAll(/id:\s*'food-[^']+'/g)];
  assert.equal(ids.length, 25);
  assert.equal(new Set(ids.map(([id]) => id)).size, 25);
  for (const region of ["north", "central", "south", "east", "offshore"]) {
    assert.equal([...data.matchAll(new RegExp(`region: '${region}'`, "g"))].length, 5);
  }
  for (const promptType of ["taste-talk", "food-dare", "travel-surprise"]) {
    assert.match(data, new RegExp(`promptType: '${promptType}'`));
  }
  assert.equal([...data.matchAll(/spicy:\s*\{/g)].length, 25);
  assert.equal([...data.matchAll(/allergens:\s*\[/g)].length, 25);
  assert.equal([...data.matchAll(/sourceUrl:\s*'https:\/\/eng\.taiwan\.net\.tw\//g)].length, 25);
});

test("v47 Taiwan food journey is a third memory-only home experience", async () => {
  const [home, app, journey] = await Promise.all([
    source("../app/encounter/components/ModeHome.tsx"),
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/TaiwanFoodJourney.tsx"),
  ]);
  assert.match(home, /onChooseFoodJourney/);
  assert.match(home, /台灣美食旅行/);
  assert.match(app, /food-journey/);
  assert.match(app, /<TaiwanFoodJourney/);
  for (const token of ["全部地區", "辛辣題目", "全員同意", "翻到背面", "跳過不受罰", "window.print"] ) {
    assert.match(journey, new RegExp(token));
  }
  assert.doesNotMatch(journey, /localStorage|sessionStorage|fetch\(|XMLHttpRequest|analytics|contact|birthday/i);
});

test("v47 Taiwan food journey supports region filtering, all prompt types, and print pairing", async () => {
  const journey = await source("../app/encounter/components/TaiwanFoodJourney.tsx");
  assert.match(journey, /selectedRegion/);
  assert.match(journey, /drawnIds/);
  assert.match(journey, /spicyEnabled/);
  assert.match(journey, /print-only-food-deck/);
  assert.match(journey, /food-print-front/);
  assert.match(journey, /food-print-back/);
  assert.match(journey, /aria-pressed/);
  assert.match(journey, /onKeyDown/);
  assert.match(journey, /aria-hidden=\{flipped\}/);
  assert.match(journey, /language === 'en' \? current\.name\.en : current\.name\.zh/);
});

test("v47 Taiwan food cards preserve 63 by 88 ratio and accessible print styling", async () => {
  const css = await source("../app/encounter/styles/taiwan-food-journey.css");
  assert.match(css, /aspect-ratio:\s*63\s*\/\s*88/);
  for (const token of ["--food-north", "--food-central", "--food-south", "--food-east", "--food-offshore"]) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /@media\s+print/);
  assert.match(css, /--food-bleed:\s*3mm/);
  assert.match(css, /--food-trim-width:\s*63mm/);
  assert.match(css, /--food-trim-height:\s*88mm/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
