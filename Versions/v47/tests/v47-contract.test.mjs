import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("v47 gives the direct keepsake preview the largest undistorted mobile layout", async () => {
  const css = await source("../app/encounter/styles/v40.css");

  assert.match(css, /\.direct-keepsake-canvas\s*\{[^}]*overflow-x:\s*hidden;[^}]*overflow-y:\s*auto;/s);
  assert.match(css, /\.direct-keepsake-content\s*\{[^}]*min-height:\s*calc\(100% - 62px\);[^}]*height:\s*auto;/s);
  assert.match(css, /\.direct-keepsake-preview\s*\{[^}]*width:\s*100%;[^}]*aspect-ratio:\s*63\s*\/\s*88;/s);
  assert.doesNotMatch(css, /\.direct-keepsake-preview\s*\{[^}]*355px/s);
});

test("v47 balances the direct keepsake title and description default sizes", async () => {
  const css = await source("../app/encounter/styles/v47-ux.css");

  assert.match(css, /\.direct-keepsake-title b\s*\{[^}]*font-size:\s*15px;/s);
  assert.match(css, /\.direct-keepsake-blessing p\s*\{[^}]*font-size:\s*14px;/s);
});

test("v47 keeps the direct keepsake preview and PNG composition visually aligned", async () => {
  const [css, directExport] = await Promise.all([
    source("../app/encounter/styles/v47-ux.css"),
    source("../app/encounter/lib/direct-keepsake.ts"),
  ]);

  assert.match(css, /\.direct-keepsake-preview\s*\{[^}]*grid-template-rows:\s*48px\s+minmax\(0,\s*1fr\)\s+76px;/s);
  assert.match(css, /\.direct-keepsake-blessing\s*\{[^}]*min-height:\s*76px;/s);
  assert.match(directExport, /DIRECT_KEEPSAKE_LAYOUT\s*=\s*\{[^}]*titleHeight:\s*145,[^}]*blessingHeight:\s*230,/s);
  assert.match(directExport, /drawRoundedPanel\(context,\s*layout\.title,[\s\S]*fitKeepsakeTitle\(context,\s*input\.imageName/);
  assert.match(directExport, /drawImageCover\(context,\s*image,\s*layout\.artwork,[\s\S]*drawRoundedPanel\(context,\s*layout\.blessing/);
  assert.match(directExport, /if\s*\(blessingLines\.length\s*>\s*3\)[\s\S]*slice\(0,\s*4\)/);
  assert.doesNotMatch(directExport, /A MOMENT WORTH KEEPING|context\.fillText\('TRUTH OR DARE'/);
});

test("v47 keeps direct keepsake tools compact and exports true rounded PNG corners", async () => {
  const [component, css, directExport] = await Promise.all([
    source("../app/encounter/components/DirectKeepsake.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
    source("../app/encounter/lib/direct-keepsake.ts"),
  ]);

  assert.match(component, /cardMenuOpen/);
  assert.match(component, /<button[^\n]*aria-label="卡片工具 · Card tools"[^\n]*>☰<\/button>/);
  assert.match(component, /className="direct-card-menu"[\s\S]*選擇卡片[\s\S]*上傳照片[\s\S]*調整圖片大小與位置/);
  assert.doesNotMatch(component, /className="direct-photo-actions"/);
  assert.match(css, /\.direct-keepsake-preview\.taiwan-meander::after\s*\{[^}]*content:\s*none;/s);
  assert.match(css, /\.direct-keepsake-controls\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto;/s);
  assert.match(directExport, /context\.clearRect\(0,\s*0,\s*canvas\.width,\s*canvas\.height\)/);
  assert.match(directExport, /drawRoundedPanel\(context,\s*layout\.card,\s*'#efd6a5',\s*66\)/);
  assert.doesNotMatch(directExport, /fillRect\(0,\s*0,\s*canvas\.width,\s*canvas\.height\)|strokeRect\(x,\s*25,\s*12,\s*12\)/);
});

test("v47 implements the approved compact home and English-only gameplay brand", async () => {
  const [home, app, directExport, sharedExport, html, manifest] = await Promise.all([
    source("../app/encounter/components/ModeHome.tsx"),
    source("../app/encounter/App.tsx"),
    source("../app/encounter/lib/direct-keepsake.ts"),
    source("../app/encounter/lib/share.ts"),
    source("../app/encounter/index.html"),
    source("../app/encounter/public/manifest.webmanifest"),
  ]);
  assert.match(home, /破冰遊戲選擇/);
  assert.doesNotMatch(home, /選擇這次想留下的方式|抽一張卡開始對話/);
  assert.match(app, /TRUTH OR DARE/);
  assert.doesNotMatch(app, /ENCOUNTER CARDS · V47|<h2>相遇卡<\/h2>/);
  assert.doesNotMatch(app, /讓一次簡單的對話，成為值得收藏的相遇。|抽一張相遇卡|準備這次相遇/);
  assert.doesNotMatch(`${app}\n${directExport}\n${sharedExport}`, /相遇紀念卡|給這次相遇的祝福/);
  assert.match(`${html}\n${manifest}\n${sharedExport}`, /TRUTH OR DARE · V47/);
  assert.doesNotMatch(`${html}\n${manifest}\n${sharedExport}`, /Encounter Cards/);
});

test("v47 has unique themed humorous blessings for all 42 governed artworks", async () => {
  const copy = await source("../app/encounter/lib/artwork-copy.ts");
  const themedSection = copy.split("const DEITY_MEANINGS")[0];
  const entries = [...themedSection.matchAll(/'([^']+)':\s*\{\s*zh:\s*'([^']+)'/g)];
  assert.equal(entries.length, 42);
  assert.equal(new Set(entries.map(([, id]) => id)).size, 42);
  assert.equal(new Set(entries.map(([, , zh]) => zh)).size, 42);
  assert.match(copy, /保生大帝罩你，感冒看到你都自動繞路。/);
  assert.match(copy, /健康守護/);
});

test("v47 keeps live play question-only and post-draw keepsakes editable but compact", async () => {
  const [app, post] = await Promise.all([source("../app/encounter/App.tsx"), source("../app/encounter/components/PostDrawKeepsake.tsx")]);
  assert.match(app, /className="mythic-text-panel"><CardQuestionOnly/);
  assert.doesNotMatch(app, /className="mythic-text-panel">[^<]*\{questionManager\.showRealYou/s);
  for (const token of ["今天的題目", "回答關鍵字", "交換聯絡方式（選填）", "<details", "下載／分享紀念卡"]) assert.match(post, new RegExp(token));
  assert.match(post, /memory-only-answer-keywords/);
});

test("v47 card and question choices are drafts until saved", async () => {
  const settings = await source("../app/encounter/components/MobileSettings.tsx");
  assert.match(settings, /draftArtworkPreference/);
  assert.match(settings, /draftManager/);
  assert.match(settings, /取消/);
  assert.match(settings, /儲存並套用/);
  assert.match(settings, /onSave/);
});

test("v47 uses tactile deck depth and seamless rounded card styling", async () => {
  const [deck, css] = await Promise.all([source("../app/encounter/components/SwipeDeck.tsx"), source("../app/encounter/styles/v47-ux.css")]);
  assert.match(deck, /stack-three/);
  assert.match(deck, /--swipe-progress/);
  assert.match(css, /taiwan-meander/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /post-draw-keepsake-card/);
  assert.match(css, /border-radius/);
});

test("v47 resets a swiped revealed card to a face-down replacement deck", async () => {
  const [app, deck] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/SwipeDeck.tsx"),
  ]);

  assert.match(app, /function prepareNextDeck\(\)\s*\{[\s\S]*setCurrent\(null\);\s*setRevealed\(false\)/);
  assert.match(app, /<SwipeDeck[\s\S]*onAdvance=\{prepareNextDeck\}/);
  assert.match(deck, /onAdvance:\s*\(\)\s*=>\s*void/);
  assert.match(deck, /revealed\s*\?\s*onAdvance\s*:\s*onDraw/);
});

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
  assert.doesNotMatch(app, /className="mythic-text-panel">[^<]*\{questionManager\.showBlessing/s);
  assert.match(app, /keepsake-blessing/);
  assert.match(types, /showCardMeta:\s*boolean/);
  assert.match(types, /showBlessing:\s*boolean/);
  assert.match(types, /showFeatureNote:\s*boolean/);
  assert.match(settings, /遊戲卡固定只顯示題目/);
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

test("v47 Taiwan food assets stay independent and meet the 25-card content contract", async () => {
  const [subjects, stories, questions, sets, designs, compositions, journey] = await Promise.all([
    source("../app/encounter/data/taiwan-food-subjects.ts"),
    source("../app/encounter/data/taiwan-food-stories.ts"),
    source("../app/encounter/data/taiwan-food-questions.ts"),
    source("../app/encounter/data/taiwan-food-question-sets.ts"),
    source("../app/encounter/data/taiwan-food-card-designs.ts"),
    source("../app/encounter/data/taiwan-food-compositions.ts"),
    source("../app/encounter/components/TaiwanFoodJourney.tsx"),
  ]);
  const ids = [...subjects.matchAll(/id:\s*'food-[^']+'/g)];
  assert.equal(ids.length, 25);
  assert.equal(new Set(ids.map(([id]) => id)).size, 25);
  for (const region of ["north", "central", "south", "east", "offshore"]) {
    assert.equal([...subjects.matchAll(new RegExp(`region: '${region}'`, "g"))].length, 5);
  }
  for (const promptType of ["taste-talk", "food-dare", "travel-surprise"]) {
    assert.match(questions, new RegExp(`promptType: '${promptType}'`));
  }
  assert.equal([...subjects.matchAll(/allergens:\s*\[/g)].length, 25);
  assert.equal([...stories.matchAll(/sourceUrl:\s*'https:\/\/eng\.taiwan\.net\.tw\//g)].length, 25);
  assert.equal([...questions.matchAll(/audience:\s*'optional-spicy'/g)].length, 25);
  assert.match(sets, /questionIds:/);
  assert.doesNotMatch(sets, /text:\s*\{/);
  assert.match(designs, /food-travel-journal-v47/);
  assert.doesNotMatch(compositions, /(?:text|note|sourceUrl|imageSrc):\s*/);
  assert.equal([...compositions.matchAll(/subjectId:\s*'food-[^']+'/g)].length, 25);
  assert.match(compositions, /resolveTaiwanFoodComposition/);
  assert.match(compositions, /composeTaiwanFoodCard/);
  assert.match(journey, /TAIWAN_FOOD_COMPOSITIONS/);
  assert.doesNotMatch(journey, /TAIWAN_FOOD_CARDS/);
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
  assert.match(journey, /language === 'en' \? current\.subject\.name\.en : current\.subject\.name\.zh/);
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

test("v47 human-nature collection adds 20 bilingual philosophy scenarios", async () => {
  const [data, canonical, runtimeMarkdown] = await Promise.all([
    source("../app/encounter/data/shine-question-book.ts"),
    source("../../../Library/Questions/SHINE_QUESTION_BOOK.md"),
    source("../app/encounter/assets/questions/SHINE_QUESTION_BOOK.md"),
  ]);
  assert.equal([...data.matchAll(/number:\s*\d+/g)].length, 82);
  for (let number = 63; number <= 82; number += 1) {
    assert.match(data, new RegExp(`number: ${number},`));
  }
  for (const theme of ["TROLLEY", "SELF-SACRIFICE", "GHOSTS", "FREE WILL"]) {
    assert.match(data, new RegExp(theme));
  }
  assert.match(canonical, /共 82 張不重複卡片/);
  assert.match(canonical, /列車難題/);
  assert.match(canonical, /你相信有鬼嗎/);
  assert.equal(canonical, runtimeMarkdown);
});

test("v47 individual food art maps every dish to a separate bundled image", async () => {
  const [art, compositions, journey, css] = await Promise.all([
    source("../app/encounter/data/taiwan-food-art.ts"),
    source("../app/encounter/data/taiwan-food-compositions.ts"),
    source("../app/encounter/components/TaiwanFoodJourney.tsx"),
    source("../app/encounter/styles/taiwan-food-journey.css"),
  ]);
  assert.equal([...art.matchAll(/import food\d{2} from '\.\.\/assets\/food-v47\//g)].length, 25);
  const mappedIds = [...art.matchAll(/'art-food-[^']+':\s*food\d{2}/g)];
  assert.equal(mappedIds.length, 25);
  assert.equal(new Set(mappedIds.map(([mapping]) => mapping)).size, 25);
  assert.match(journey, /current\.artwork\.src/);
  assert.match(journey, /card\.artwork\.src/);
  assert.match(art, /TAIWAN_FOOD_ART_FOCUS/);
  assert.match(art, /'art-food-north-beef-noodles':\s*\{\s*x:\s*50,\s*y:\s*44\s*\}/);
  assert.match(compositions, /focus:\s*TAIWAN_FOOD_ART_FOCUS\[id\]/);
  assert.equal([...journey.matchAll(/style=\{artworkPosition\(/g)].length, 2);
  assert.doesNotMatch(css, /data-region=.*food-card-art img/);
  assert.doesNotMatch(journey, /taiwan-food-journey-v47\.webp/);
});
