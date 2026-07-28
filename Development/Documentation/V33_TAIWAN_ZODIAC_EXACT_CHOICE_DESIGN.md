# Encounter Cards v33 Taiwan Zodiac and Exact Choice Design

## Approved outcome

v33 keeps the ordinary experience playful: artwork and eligible question are random by default, with a mandatory independently random blessing. A collapsed advanced control lets an owner deliberately choose an artwork collection, one exact artwork, and/or one exact eligible question. The choice surface is hidden during normal play and stores no personal input.

v33 adds one governed `taiwan-zodiac` collection containing twelve original Taiwan Astral Guardian artworks. It is the first country-specific zodiac family and establishes the reusable country/culture metadata needed for later Japanese, Greek, Egyptian, or other country collections.

## Visual system

All twelve assets are original 2:3 vertical mythic collectible-card illustrations. They follow the established v16/v30 polished painterly realism: deep blue atmospheric environments, antique gold detail, restrained cinnabar and jade accents, natural fabric and metal texture, cinematic light, and no text, logo, border, or watermark.

Every master must include:

- generous scene outside the eventual card crop;
- complete face, head, horns, ears, crown, headdress, and held objects inside the upper/central safe zone;
- one complete, clearly recognizable, differently coloured Taiwan main-island silhouette inside the central 60% of the image;
- the zodiac identity in a guardian, animal, constellation, accessory, or action without copying a third-party artwork;
- one or more respectful Taiwan landscape, ecology, craft, food-growing, architectural, or festival references;
- no direct imitation of protected tribal regalia, sacred pattern, clan motif, brand, or living person's likeness.

## Twelve artwork briefs

| ID | Guardian / 守護者 | Taiwan setting and details | Hidden Taiwan placement |
| --- | --- | --- | --- |
| `tw-zodiac-aries` | Aries mountain-ram guardian / 牡羊山嶺守護者 | Hehuanshan alpine grass, rhododendron, sea of clouds | turquoise enamel on central chest clasp |
| `tw-zodiac-taurus` | Taurus earth-and-tea guardian / 金牛大地守護者 | Alishan tea terraces, cypress, dawn railway mist | ruby inlay on tea basket medallion |
| `tw-zodiac-gemini` | Gemini twin lantern guardians / 雙子燈影守護者 | temple lantern street, swallowtail butterflies, mirrored silk movement | jade embroidery joining both central sashes |
| `tw-zodiac-cancer` | Cancer tidal guardian / 巨蟹潮汐守護者 | Penghu basalt, tidal pools, coral and moonlit surf | coral-red inlay on central shell armour |
| `tw-zodiac-leo` | Leo solar temple guardian / 獅子日輪守護者 | Taiwanese temple guardian lion, golden sun, carved roof and incense haze | cobalt enamel on central belt medallion |
| `tw-zodiac-virgo` | Virgo harvest guardian / 處女稻穗守護者 | Chishang rice fields, tea flowers, woven harvest basket | violet embroidery on central apron panel |
| `tw-zodiac-libra` | Libra harbour-balance guardian / 天秤港灣守護者 | Dadaocheng river wharf, old arcades, tea chests and sunset | emerald Taiwan-shaped scale counterweight |
| `tw-zodiac-scorpio` | Scorpio marble-canyon guardian / 天蠍峽谷守護者 | marble gorge, subtropical fern, storm light and black-silver scorpion armour | amber inlay on central gauntlet guard |
| `tw-zodiac-sagittarius` | Sagittarius high-mountain archer / 射手高山守護者 | Yushan ridgeline, blue magpie, neutral island-woven geometry | crimson Taiwan inlay on central bow grip |
| `tw-zodiac-capricorn` | Capricorn cliff guardian / 摩羯峭壁守護者 | Qingshui cliffs, mountain goat, Pacific spray and dawn cloud | turquoise inlay on central shoulder buckle |
| `tw-zodiac-aquarius` | Aquarius rain-and-spring guardian / 水瓶雨泉守護者 | Jiufen rain, mountain spring, ceramic water vessel and lantern reflections | gold Taiwan relief on the central vessel |
| `tw-zodiac-pisces` | Pisces ocean-current guardian / 雙魚海流守護者 | east-coast blue water, coral, silver fish and moonlit current | magenta Taiwan motif between two central fish |

## Asset structure

```text
Assets/Zodiac/Taiwan/v33-masters/
├── README.md                 # folder purpose, visual/safety contract, mapping
├── manifest.json             # stable IDs, sign, prompt summary, hotspot and provenance
└── tw-zodiac-*.png           # twelve high-resolution generated masters

Development/Source/Main-App-v33/src/assets/zodiac/taiwan/
└── tw-zodiac-*-safe-v33.webp # optimized version-bound runtime derivatives
```

Original masters are reusable assets. Runtime WebP files are product-version derivatives. No generated image remains only in Codex's generated-image directory.

## Data and extensibility

`ArtworkVariant` gains `collectionId`, `countryCode`, `culture`, and `subjectKind`. `ArtworkCollection` keeps a stable country/region ID and available/planned state. `TAIWAN_ZODIAC_ART` owns the twelve imports and safe focal/hotspot values; `ALL_ARTWORKS` combines the deity and zodiac registries.

Questions gain a non-breaking `packId` with a `QuestionPack` registry. v33 registers the current sixty prompts as `classic-60`; future files may add more packs without changing selection logic. `QuestionPreference` is either random or one exact question ID. Eligibility still enforces the chosen level, mode, and Level 5 adult gate. If an exact question is no longer eligible, the interface explains the conflict and falls back to random rather than bypassing safety.

## Interaction

1. Normal setup stays unchanged and defaults to all-random.
2. The collapsed `進階指定 · Exact choice` disclosure shows a summary only.
3. Opening it reveals collection cards, artwork choices, a searchable question library, and independent `Random` controls.
4. Selecting an exact artwork never fixes the blessing. Selecting an exact question never fixes the artwork unless both are explicitly selected.
5. Random artwork mode still offers three favorite faces before draw. Exact artwork mode shows only the locked face.
6. The selected exact question is not shown on the draw screen before the face is chosen, preserving the reveal.
7. Reset returns artwork and question to random.

## Privacy, cultural safety, and failure behavior

Artwork/question preferences and search text are session-only in v33. Names, contacts, birthdays, notes, answers, and Level 5 choices stay in memory and are never transmitted. No analytics, account, backend, or new network request is added.

Planned country collections remain unavailable until their own assets, source records, cultural review, and localized names exist. Missing images, empty collections, or ineligible exact questions degrade to the available random pool with an accessible status message. Every final keepsake still contains a blessing.

## Acceptance

1. First load and reset use random artwork and random question.
2. Advanced choice is collapsed by default on mobile and desktop.
3. A user can independently lock a zodiac/deity image and one eligible question.
4. Exact image plus exact question produces that pair and a random mandatory blessing.
5. Random mode still presents three distinct faces; exact artwork cannot be overridden.
6. The searchable question library is data-driven and supports more packs without UI code changes.
7. All twelve zodiac masters and WebP derivatives exist, are indexed, and visually protect subject and Taiwan safe zones.
8. Existing 430 × 932, desktop Settings/Test, language, level, mode, swipe/flip, Taiwan reveal, export, offline, and privacy contracts remain intact.
