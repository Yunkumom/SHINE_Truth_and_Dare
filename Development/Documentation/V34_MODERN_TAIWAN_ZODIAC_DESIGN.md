# V34 Modern Taiwan Zodiac Design

## Objective

Add a second Taiwan western-zodiac artwork line that interprets each sign through its original animal, object, or constellation identity and uses the artwork to introduce a Taiwanese place or cultural feature. Human figures are optional; when used, clothing must be recognisably contemporary Taiwanese. Preserve every v33 classical fantasy master and runtime face as an available backup collection. Clearly identify and briefly explain the Taiwanese feature used by every zodiac artwork.

## Visual system

- Collection name: `台灣星座・地方故事 / Taiwan Zodiac · Local Stories`.
- Animal and symbolic signs should lead with the original zodiac form rather than forcing a human portrait. Human signs may use Taiwanese urban daily wear, outdoor technical clothing, locally familiar materials, and restrained craft details; they must not read as ancient court dress, historical armour, hanfu, or ceremonial regalia.
- The premium painterly realism, navy/amber atmosphere, central portrait, complete face/head safety zone, expanded 2:3 scene, and complete coloured Taiwan silhouette remain consistent with the existing card family.
- No protected Indigenous regalia, sacred tribal patterns, flags, logos, political slogans, text, or watermarks.

## Twelve Taiwanese feature pairs

| Sign | Display name | Primary zodiac form | Taiwanese scene/feature to introduce |
| --- | --- | --- | --- |
| Aries | 牡羊座・合歡山晨行 | luminous ram on an alpine ridge | Hehuanshan sunrise, rhododendron, cloud sea |
| Taurus | 金牛座・阿里山茶作 | powerful bull walking through tea terraces | Alishan high-mountain tea, red cypress, mountain railway |
| Gemini | 雙子座・西門雙城 | two contemporary Taiwanese youths in coordinated streetwear | Ximending pedestrian streets, neon sign geometry, scooters |
| Cancer | 巨蟹座・澎湖潮間 | moonlit crab with shell echoing basalt geometry | Penghu columnar basalt, tidal pools, stone fish weirs |
| Leo | 獅子座・廟埕熱場 | living temple guardian lion | Taiwanese temple courtyard, roof ceramics, festival lanterns |
| Virgo | 處女座・池上稻日 | contemporary Taiwanese agricultural researcher | Chishang rice fields, irrigation, bicycle path |
| Libra | 天秤座・大稻埕暮光 | elegant brass balance made from tea-trade objects | Dadaocheng red-brick arcades, tea trade, sunset wharf |
| Scorpio | 天蠍座・太魯閣雨行 | celestial scorpion emerging from marble strata | Taroko marble gorge, fern trail, mountain river |
| Sagittarius | 射手座・玉山追光 | contemporary Taiwanese mountain archer | Yushan ridge, Taiwan blue magpie, cloud sea |
| Capricorn | 摩羯座・清水斷崖 | sea-goat climbing where cliff meets Pacific | Qingshui Cliff geology, coastal railway, Pacific current |
| Aquarius | 水瓶座・九份雨夜 | contemporary ceramic artist pouring a constellation stream | Jiufen hillside, tea-house lights, Taiwanese ceramics |
| Pisces | 雙魚座・東海岸月浪 | paired fish circling in a Pacific current | east-coast ocean, Kuroshio current, fishing harbour lights |

## Data and interaction

- Extend `ArtworkVariant` with bilingual `featureLabel` and `featureDescription` metadata. The label is short enough for the card; the description explains what makes the feature Taiwanese in the version picker.
- Preserve v33 artwork IDs and files unchanged under a renamed available collection: `taiwan-zodiac-classic`.
- Add twelve new `tw-local-zodiac-*` IDs under `taiwan-zodiac-local-stories`.
- The hidden setting begins with an explicit `系列版本 · Collection version` selector for deity, classic personified zodiac, and local-story zodiac lines. Exact artwork choice follows the selected version.
- The artwork choice button shows the artwork name, a compact `台灣特色 · ...` line, and a short explanatory sentence. The revealed card shows only the compact feature note below the English artwork name without covering the image.
- Random remains the default. Exact artwork/question selection, mandatory independent blessing, long-press Taiwan reveal, card crop controls, keepsake and privacy contracts remain unchanged.

## Acceptance

1. All twelve v33 masters, runtime files and IDs remain byte-preserved and selectable.
2. Twelve new 1024 × 1536 masters and runtime WebP files exist with modern clothing, wider scenes, portrait safety and complete Taiwan motifs.
3. Every zodiac artwork has bilingual feature metadata, and the entry picker/card surface renders it without clipped text at 430 × 932.
4. v34 is a new source/output line; v33 source and releases remain immutable.
5. Tests, v34 validator and repository validator pass before commit.
