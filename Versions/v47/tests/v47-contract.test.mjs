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
  const [css, directExport] = await Promise.all([
    source("../app/encounter/styles/v47-ux.css"),
    source("../app/encounter/lib/direct-keepsake.ts"),
  ]);

  assert.match(css, /\.direct-keepsake-title b\s*\{[^}]*font-size:\s*var\(--direct-title-font-size,\s*15px\);/s);
  assert.match(css, /\.direct-keepsake-blessing p\s*\{[^}]*font-size:\s*var\(--direct-blessing-font-size,\s*14px\);/s);
  assert.match(directExport, /DEFAULT_DIRECT_KEEPSAKE_DESIGN[\s\S]*titleFontSize:\s*15,[\s\S]*blessingFontSize:\s*14,/);
});

test("v47 keeps the direct keepsake preview and PNG composition visually aligned", async () => {
  const [css, directExport] = await Promise.all([
    source("../app/encounter/styles/v47-ux.css"),
    source("../app/encounter/lib/direct-keepsake.ts"),
  ]);

  assert.match(css, /\.direct-keepsake-preview\s*\{[^}]*grid-template-rows:\s*48px\s+minmax\(0,\s*1fr\)\s+var\(--direct-blessing-height,\s*76px\);/s);
  assert.match(css, /\.direct-keepsake-blessing\s*\{[^}]*min-height:\s*76px;/s);
  assert.match(directExport, /DIRECT_KEEPSAKE_LAYOUT\s*=\s*\{[^}]*titleHeight:\s*145,[^}]*blessingHeight:\s*230,/s);
  assert.match(directExport, /drawRoundedPanel\(context,\s*layout\.title,[\s\S]*fitKeepsakeTitle\(context,\s*input\.design\.title\s*\|\|\s*input\.imageName/);
  assert.match(directExport, /drawImageCover\(context,\s*image,\s*layout\.artwork,[\s\S]*drawRoundedPanel\(context,\s*layout\.blessing/);
  assert.match(directExport, /const availableLines[\s\S]*const maxLines[\s\S]*slice\(0,\s*maxLines\)/);
  assert.doesNotMatch(directExport, /A MOMENT WORTH KEEPING|context\.fillText\('TRUTH OR DARE'/);
});

test("v47 keeps direct keepsake tools compact and exports true rounded PNG corners", async () => {
  const [component, css, directExport] = await Promise.all([
    source("../app/encounter/components/DirectKeepsake.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
    source("../app/encounter/lib/direct-keepsake.ts"),
  ]);

  assert.match(component, /<SurfaceMenu[\s\S]*選擇卡片[\s\S]*上傳照片[\s\S]*調整圖片大小與位置[\s\S]*<\/SurfaceMenu>/);
  assert.doesNotMatch(component, /className="direct-photo-actions"/);
  assert.match(css, /\.direct-keepsake-preview\.taiwan-meander::after\s*\{[^}]*content:\s*none;/s);
  assert.match(css, /\.direct-keepsake-controls\s*\{[^}]*grid-template-columns:\s*1fr;/s);
  assert.match(directExport, /context\.clearRect\(0,\s*0,\s*canvas\.width,\s*canvas\.height\)/);
  assert.match(directExport, /drawRoundedPanel\(context,\s*layout\.card,\s*'#efd6a5',\s*66\)/);
  assert.doesNotMatch(directExport, /fillRect\(0,\s*0,\s*canvas\.width,\s*canvas\.height\)|strokeRect\(x,\s*25,\s*12,\s*12\)/);
});

test("v47 opens phone-first and offers one surface menu with a desktop showcase", async () => {
  const [app, menu, home, direct, food, css] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/SurfaceMenu.tsx"),
    source("../app/encounter/components/ModeHome.tsx"),
    source("../app/encounter/components/DirectKeepsake.tsx"),
    source("../app/encounter/components/TaiwanFoodJourney.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
  ]);

  assert.match(app, /useState<SurfaceMode>\('phone'\)/);
  assert.doesNotMatch(app, /setDesktopWorkspace\(!forcedMobileSurface\s*&&\s*window\.innerWidth\s*>=\s*1100\)/);
  assert.match(app, /surfaceMode\s*===\s*'showcase'[\s\S]*desktop-showcase/);
  assert.match(menu, /iPhone 17 Pro Max[\s\S]*桌面展示[\s\S]*進階功能/);
  assert.match(menu, /直接製作紀念卡[\s\S]*真心話大冒險[\s\S]*台灣美食旅行/);
  assert.match(home, /title:\s*'破冰遊戲選擇'[\s\S]*title:\s*'CHOOSE AN ICEBREAKER'[\s\S]*<h1>\{text\.title\} · V47<\/h1>/);
  assert.match(direct, /<SurfaceMenu[\s\S]*選擇卡片[\s\S]*上傳照片[\s\S]*調整圖片大小與位置/);
  assert.match(food, /<SurfaceMenu[\s\S]*列印 25 張卡/);
  assert.match(css, /\.desktop-showcase\s*\{[^}]*grid-template-columns:/s);
});

test("v47 gives real phones two keepsake action rows and proportionally enlarges desktop phone mode", async () => {
  const [app, css] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
  ]);

  assert.match(css, /\.direct-keepsake-content\s*\{[^}]*align-content:\s*space-between;/s);
  assert.match(css, /\.direct-keepsake-controls\s*\{[^}]*grid-template-columns:\s*1fr;[^}]*align-self:\s*end;/s);
  assert.match(css, /\.direct-blessing-select\s*\{[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*grid-template-columns:\s*max-content\s+minmax\(0,\s*1fr\);/s);
  assert.match(css, /\.direct-keepsake-controls \.direct-download-button\s*\{[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*width:\s*100%;/s);
  assert.match(app, /DESKTOP_PHONE_MAX_SCALE\s*=\s*1\.2/);
  assert.match(app, /width\s*<\s*DESKTOP_BREAKPOINT[\s\S]*calculatePhoneScale\(\{\s*width,\s*height\s*\}\)[\s\S]*Math\.min\(DESKTOP_PHONE_MAX_SCALE,\s*availableWidth\s*\/\s*430,\s*availableHeight\s*\/\s*932\)/);
});

test("v47 menu uses swipe rails with collapsed destinations plus theme and language controls", async () => {
  const [app, menu, css] = await Promise.all([
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/SurfaceMenu.tsx"),
    source("../app/encounter/styles/v47-ux.css"),
  ]);

  assert.match(menu, /surface-menu-rail surface-menu-display-rail[\s\S]*iPhone 17 Pro Max[\s\S]*桌面展示[\s\S]*進階功能/);
  assert.match(menu, /<details className="surface-menu-destinations">[\s\S]*<summary>[\s\S]*surface-menu-rail surface-menu-destination-rail/);
  assert.match(menu, /白天 · DAY[\s\S]*夜間 · NIGHT/);
  assert.match(menu, /<select[^>]*value=\{language\}[\s\S]*value="en"[\s\S]*value="zh"[\s\S]*value="bilingual"/);
  assert.match(app, /localStorage\.getItem\('encounter-language'\)\s*\?\s*loadLanguage\(\)\s*:\s*'en'/);
  assert.match(app, /useState<AppearanceMode>\('day'\)/);
  assert.match(app, /data-theme=\{appearanceMode\}/);
  assert.match(css, /\.surface-menu-rail\s*\{[^}]*overflow-x:\s*auto;[^}]*scroll-snap-type:\s*x mandatory;/s);
  assert.match(css, /\.app-shell\[data-theme="night"\]/);
});

test("v47 direct editor controls title font sizes and blessing height in preview and PNG", async () => {
  const [direct, adjuster, directExport, css] = await Promise.all([
    source("../app/encounter/components/DirectKeepsake.tsx"),
    source("../app/encounter/components/DirectPhotoAdjuster.tsx"),
    source("../app/encounter/lib/direct-keepsake.ts"),
    source("../app/encounter/styles/v47-ux.css"),
  ]);

  for (const token of ["照片 · PHOTO", "版面 · LAYOUT", "文字 · TYPE", "祝福欄高度", "卡片標題", "標題大小", "祝福大小", "字體風格"]) assert.match(adjuster, new RegExp(token));
  assert.match(adjuster, /<select[^>]*value=\{draftDesign\.fontFamily\}[\s\S]*DIRECT_KEEPSAKE_FONT_OPTIONS\.map/);
  assert.match(directExport, /value:\s*'storybook'[\s\S]*value:\s*'warm'[\s\S]*value:\s*'modern'/);
  assert.match(direct, /DEFAULT_DIRECT_KEEPSAKE_DESIGN/);
  assert.match(direct, /--direct-title-font-size[\s\S]*--direct-blessing-font-size[\s\S]*--direct-blessing-height[\s\S]*--direct-card-font/);
  assert.match(direct, /downloadDirectKeepsake\(\{[^}]*design/s);
  assert.match(directExport, /export interface DirectKeepsakeDesign/);
  assert.match(directExport, /blessingHeight:\s*Math\.round\(input\.design\.blessingHeight\s*\*\s*3\)/);
  assert.match(directExport, /context\.font\s*=\s*fontForKeepsake\(input\.design\.fontFamily/);
  assert.match(css, /\.direct-keepsake-preview\s*\{[^}]*grid-template-rows:\s*48px\s+minmax\(0,\s*1fr\)\s+var\(--direct-blessing-height/s);
  assert.match(css, /\.v40-shell \.direct-card-editor\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*6px;[^}]*width:\s*auto;/s);
});

test("v47 presents Yunkumom branding without decorative stars while retaining the Truth-or-Dare mode", async () => {
  const [home, app, menu, mark, direct, photoAdjuster, postDraw, artworkAdjuster, undercover, foodQuestions, directExport, sharedExport, html, manifest, icon192, icon512] = await Promise.all([
    source("../app/encounter/components/ModeHome.tsx"),
    source("../app/encounter/App.tsx"),
    source("../app/encounter/components/SurfaceMenu.tsx"),
    source("../app/encounter/components/YunkumomMark.tsx"),
    source("../app/encounter/components/DirectKeepsake.tsx"),
    source("../app/encounter/components/DirectPhotoAdjuster.tsx"),
    source("../app/encounter/components/PostDrawKeepsake.tsx"),
    source("../app/encounter/components/ArtworkAdjuster.tsx"),
    source("../app/encounter/components/WhoIsUndercover.tsx"),
    source("../app/encounter/data/taiwan-food-questions.ts"),
    source("../app/encounter/lib/direct-keepsake.ts"),
    source("../app/encounter/lib/share.ts"),
    source("../app/encounter/index.html"),
    source("../app/encounter/public/manifest.webmanifest"),
    source("../app/encounter/public/assets/icons/icon-192.svg"),
    source("../app/encounter/public/assets/icons/icon-512.svg"),
  ]);
  assert.match(home, /破冰遊戲選擇/);
  assert.doesNotMatch(home, /選擇這次想留下的方式|抽一張卡開始對話/);
  assert.match(`${home}\n${app}`, /YunkumomMark/);
  assert.match(`${home}\n${app}\n${menu}`, /Yunkumom/);
  assert.match(mark, /road moon and cloud/);
  assert.match(home, /真心話大冒險[\s\S]*TRUTH OR DARE/);
  assert.match(app, /<h2>TRUTH OR DARE<\/h2>/);
  assert.doesNotMatch(app, /ENCOUNTER CARDS · V47|<h2>相遇卡<\/h2>/);
  assert.doesNotMatch(app, /讓一次簡單的對話，成為值得收藏的相遇。|抽一張相遇卡|準備這次相遇/);
  assert.doesNotMatch(`${app}\n${directExport}\n${sharedExport}`, /相遇紀念卡|給這次相遇的祝福/);
  assert.match(`${html}\n${manifest}\n${sharedExport}`, /Yunkumom · V47/);
  assert.doesNotMatch(`${html}\n${manifest}\n${sharedExport}`, /Encounter Cards/);
  assert.match(`${icon192}\n${icon512}`, /stroke-linecap="round"/);
  assert.doesNotMatch(`${icon192}\n${icon512}`, /M96 39 108 82 153 96|M256 104 288 219 408 256/);
  assert.doesNotMatch(`${home}\n${app}\n${menu}\n${direct}\n${photoAdjuster}\n${postDraw}\n${artworkAdjuster}\n${undercover}\n${foodQuestions}\n${directExport}\n${sharedExport}`, /✦/);
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
  for (const token of ["全部地區", "辛辣題目", "全員同意", "翻開料理", "掀開介紹", "跳過不受罰", "window.print"] ) {
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
  assert.match(journey, /aria-hidden=\{cardStage !== 'open'\}/);
  assert.match(journey, /aria-expanded=\{cardStage === 'open'\}/);
  assert.match(journey, /localize\(current\.subject\.name, language\)/);
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

test("v47 three-stage Taiwan food card reveals utensils, dish, then lifted information", async () => {
  const [journey, css] = await Promise.all([
    source("../app/encounter/components/TaiwanFoodJourney.tsx"),
    source("../app/encounter/styles/taiwan-food-journey.css"),
  ]);
  assert.match(journey, /type FoodCardStage = 'back' \| 'front' \| 'open'/);
  assert.match(journey, /const \[cardStage, setCardStage\] = useState<FoodCardStage>\('back'\)/);
  assert.match(journey, /back:\s*'front'[\s\S]*front:\s*'open'[\s\S]*open:\s*'back'/);
  assert.ok([...journey.matchAll(/setCardStage\('back'\)/g)].length >= 2);
  for (const token of ["food-card-utensil-back", "food-card-dish-cover", "food-card-information", "food-card-caption-rail", "food-card-fork", "food-card-spoon"]) {
    assert.match(journey, new RegExp(token));
  }
  assert.match(journey, /aria-expanded=\{cardStage === 'open'\}/);
  assert.match(journey, /aria-hidden=\{cardStage !== 'back'\}/);
  assert.match(journey, /aria-hidden=\{cardStage === 'back'\}/);
  assert.match(journey, /event\.key !== 'Enter' && event\.key !== ' '/);
  assert.match(css, /\.food-card-dish-cover\s*\{[^}]*transform-origin:\s*top center/s);
  assert.match(css, /\.food-card-shell\[data-stage="open"\][^{]*\.food-card-dish-cover\s*\{[^}]*rotateX\(-/s);
  assert.match(css, /\.food-card-dish-cover img\s*\{[^}]*object-fit:\s*cover[^}]*object-position:\s*50% 0%/s);
  assert.match(css, /\.food-card-caption-rail\s*\{/);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*\.food-card-shell\[data-stage="open"\][^{]*\.food-card-dish-cover\s*\{[^}]*transform:\s*none/s);
  assert.match(journey, /food-print-front/);
  assert.match(journey, /food-print-back/);
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
