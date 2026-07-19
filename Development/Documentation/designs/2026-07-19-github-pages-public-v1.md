# GitHub Pages Public v1 Design / GitHub Pages 公開版 v1 設計

Status: Approved on 2026-07-19 / 狀態：2026-07-19 已核准

## Outcome / 成果

Create a new immutable public release line for Truth and Dare without changing the existing v15, v16, or v17 artifacts. Public v1 preserves the original v16 encounter-card DOM, card stack, pointer/keyboard state machine, card layout, completion flow, and content model; it adds twelve sourced Taiwan and Australia legend cards, original culturally safe artwork, a polished responsive desktop composition, and a GitHub Pages deployment package.

為 Truth and Dare 建立新的不可變公開版本線，不修改既有 v15、v16 或 v17 成果。公開版 v1 保留原始 v16 的 encounter-card DOM、牌堆、指標／鍵盤狀態機、卡牌版面、完成流程與內容模型；另新增十二張具來源的台灣與澳洲傳說卡、文化安全的原創插畫、精緻的響應式桌面構圖，以及 GitHub Pages 部署套件。

## Version and Repository Structure / 版本與儲存庫結構

```text
Truth and Dare/
├── pages-src/
│   └── v1/                 # Maintainable v1 source / v1 可維護原始碼
├── site/
│   ├── index.html          # Stable latest-version entry / 最新版穩定入口
│   └── v1/                 # Immutable v1 build / 不可覆寫的 v1 建置成果
└── .github/
    └── workflows/
        └── pages.yml       # GitHub Pages verification and deployment
```

- Existing v15, v16, and v17 files remain unchanged.
- `pages-src/v1/` and `site/v1/` become frozen after v1 acceptance.
- Later work creates `pages-src/v2/` and `site/v2/`; it does not edit v1.
- `site/index.html` is a mutable latest-version pointer only. Version directories are immutable.
- All public assets use repository-subpath-safe relative URLs.
- GitHub Pages publishes only `site/`; project metadata, tests, and private files are excluded.

## Card Architecture Contract / 卡牌架構契約

The following hierarchy is preserved rather than replaced:

```text
card-stack
├── stack-card stack-two
├── stack-card stack-one
└── draw-motion
    └── encounter-card
        ├── card-face card-front
        └── mythic-card
            ├── mythic-card-header
            ├── mythic-art-frame
            └── mythic-text-panel
```

Required behavior:

- An unrevealed card draws by gesture or Enter/Space.
- A revealed card changes by left/right swipe using the verified v16 distance and velocity thresholds.
- Pointer capture, drag rotation, stacked-card depth, snap-back, and change animation are retained.
- Left/Right Arrow changes a revealed card.
- Clicking the text panel enlarges the content.
- Complete answer, receive blessing, note, share, PNG keepsake, and redraw remain in the same flow.
- Touch, mouse, and keyboard use one state machine.
- New cards extend the data collection without introducing a second card component or state architecture.

## Responsive and Visual Design / 響應式與視覺設計

- Mobile 390–430 px: iPhone Pro Max 430 × 932 is the primary contract; use safe-area padding and thumb-sized controls.
- Tablet 768–1099 px: use a slightly larger centered stage with actions below the card.
- Desktop 1100 px and above: retain the centered card and its maximum visual scale while balancing outer whitespace, navigation, stage framing, and the completion panel.
- Refine only parchment contrast, gold edge definition, shadows, typography, line spacing, image crop, focus feedback, and drag feedback.
- Do not insert, remove, or reorder title, art, question, metadata, or level sections inside the card.
- Respect `prefers-reduced-motion`.

## New Content / 新增內容

Add six Taiwan and six Australia cards using the existing bilingual content fields and interaction model.

Taiwan:

1. Mazu / 媽祖
2. Tiger Aunt / 虎姑婆
3. Lady of the Pandanus / 林投姐
4. Wang Ye's Spirit Ship / 王船與王爺
5. The Serpent Husband / 蛇郎君
6. The Mountain Trickster / 魔神仔

Australia:

1. Rainbow Serpent / 彩虹蛇
2. Seven Sisters / 七姊妹星路
3. Bunyip / 水潭巨獸
4. Min Min Lights / 敏敏幽光
5. Drop Bear / 墜落熊
6. Ned Kelly / 鐵甲亡命傳奇

Each new record carries internal provenance fields for region, cultural attribution, source URL, and visual restrictions. The public card uses original prompts and blessings, not copied source prose.

Primary references:

- Taiwan Bureau of Cultural Heritage: Mazu worship and Wang Ye worship.
- National Museum of Taiwan Literature: Tiger Aunt, Lady of the Pandanus, the Serpent Husband, and Taiwan supernatural-literature context.
- Australian Museum: public overview of Rainbow Serpent traditions.
- National Museum of Australia: the community-curated public/open layer of the Seven Sisters Songlines.
- National Museum of Australia and Boulia Shire Council: Bunyip and Min Min Lights.

## Cultural Safety and Artwork / 文化安全與圖像

- Indigenous stories must be attributed to the named people, community, Country, or public institutional context supported by the source.
- Seven Sisters content is limited to the explicitly public/open story layer.
- Rainbow Serpent content is a cross-regional overview and must not claim to be the one definitive version.
- No sacred, gender-restricted, ceremonial, local-only, or permission-dependent details are reproduced.
- Twelve new original illustrations use the existing dark-blue, gold, engraved mythic-card mood.
- Artwork must not imitate Aboriginal dot painting, rock art, clan designs, Taiwanese Indigenous protected designs, ceremonial dress, or sacred symbols.
- For Indigenous-associated cards, use non-proprietary landscape, water, sky, stars, and natural-force imagery.
- If review identifies a permission boundary, replace the affected entry with a safe public folk legend before release.

## Data Flow and Failure Behavior / 資料流與失敗行為

- A deterministic, non-executing extractor ports original v16 card records into a generated v1 data file and records count and hashes.
- Hand-authored cultural cards are merged through the same `Card` interface.
- Local state uses the `truth-and-dare-v1:*` namespace and does not read or mutate v16/v17 storage.
- Optimized WebP art loads lazily; only the current and next card are preloaded.
- Failed images render a fixed-aspect parchment fallback so card geometry does not shift.
- Unsupported Web Share falls back to PNG keepsake download.
- A previously loaded screen remains usable when the network disappears; no backend, analytics, account, or personal-data transmission is introduced.

## Verification / 驗證

- DOM contract tests protect the required card hierarchy and class names.
- State-machine tests cover draw, swipe thresholds, velocity thresholds, snap-back, keyboard controls, completion, and redraw.
- Content tests require exactly twelve new sourced records and validate attribution/safety metadata.
- Responsive browser checks cover 390 × 844, 430 × 932, 768 × 1024, and 1440 × 900.
- Mouse, touch, keyboard, focus-visible, reduced-motion, image fallback, share fallback, and repository-subpath navigation are verified.
- Typecheck, lint, unit tests, production build, secret scan, link/path scan, and repository validation must pass.
- `site/v1/manifest.json` records the public version and file hashes. After acceptance, validation fails if v1 changes.
- The workflow prepares GitHub Pages deployment, but pushing and enabling Pages are separate publication actions.

## Boundaries / 邊界

- Do not edit `app/encounter_cards_v15.html`, v16 files/assets, v17 source/output, or the existing launcher.
- Do not add analytics, backend services, accounts, secrets, trackers, or persistent personal-data collection.
- Do not publish, push, enable Pages, or change repository settings as part of implementation without separate authorization.
- Public v1 is a new release lineage, not a renaming of product v15/v16/v17.
