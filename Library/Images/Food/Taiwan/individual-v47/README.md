# Taiwan Food Journey Individual Masters — v47

## Provenance

- Created: 2026-08-22
- Method: OpenAI built-in image generation tool, 25 separate new-image calls; one transient connection failure was retried only for missing outputs
- Use case: `stylized-concept`
- Ownership: original project-generated artwork with no source photography, people, shop names, logos, or third-party brand assets
- Masters: 25 RGB PNG files, portrait dimensions from 1059–1063 × 1480–1485 px, 70 MB total
- Runtime derivatives: `../../../../../Versions/v47/app/encounter/assets/food-v47/*.webp`
- Runtime conversion: `cwebp -quiet -q 82 -metadata none`, 6.7 MB total
- Master collection digest: `67cb67928dd163e4444d5e19e79dcf40998603286b65e90705c59cbeae8f8169`
- Runtime collection digest: `0ba53c9c589fe002112c374fe6844af90f86d30ce0e6b441de611b18b0f1e924`
- Manifest: `manifest.json`

The collection digests are SHA-256 hashes of the lexically sorted per-file SHA-256 records, including each governed path.

## Shared final prompt

```text
Use case: stylized-concept
Asset type: governed master artwork for one collectible 63:88 portrait Taiwan food card
Primary request: create one original illustration focused exclusively on <dish subject>
Scene/backdrop: warm ivory handmade travel-journal paper with faint regional map contours, restrained route-line and botanical or coastal marginalia
Style/medium: sophisticated watercolor and gouache food illustration with fine navy ink outlines, tactile paper grain, premium adult editorial travel sketchbook
Composition/framing: portrait composition, one culinary subject as the clear central hero, generous calm margins, coherent food anatomy and tableware
Lighting/mood: warm natural daylight, appetizing, cultivated, curious
Color palette: warm ivory and navy with a restrained region accent: mist blue, tea green, coral red, ocean teal, or sand gold
Constraints: exactly one culinary subject; original artwork; no people; no logos; no brands; no readable text; no letters; no numbers; no flags; no political symbols; no watermark
Avoid: multiple dishes, collage, menu layout, restaurant signage, pseudo-text, neon color, photorealism, plastic 3D render
```

## Dish subjects and files

1. `01-braised-beef-noodles-v47.png` — braised beef noodles with beef, thick noodles, bok choy, scallions, and amber-red broth.
2. `02-tamsui-iron-eggs-v47.png` — glossy braised Tamsui iron eggs, including one cut open.
3. `03-hsinchu-rice-noodles-v47.png` — stir-fried Hsinchu rice noodles with vegetables and mushrooms.
4. `04-keelung-tempura-v47.png` — sliced Keelung fish-paste tempura with sweet-savory sauce and cucumber.
5. `05-daxi-dried-tofu-v47.png` — glossy braised Daxi tofu cubes and slices with subtle aromatics.
6. `06-sun-cake-v47.png` — flaky sun cake with pale malt filling and delicate crumbs.
7. `07-changhua-bawan-v47.png` — translucent Changhua ba-wan with savory filling and sauce.
8. `08-puli-shaoxing-v47.png` — one coherent Puli Shaoxing hot dish with a small ceramic wine cup.
9. `09-hakka-lei-cha-v47.png` — Hakka lei cha with green tea soup, rice, vegetables, sesame, peanuts, and grains.
10. `10-gukeng-coffee-v47.png` — Gukeng coffee with roasted beans and a coffee-cherry branch.
11. `11-turkey-rice-v47.png` — Chiayi turkey rice with shredded turkey, shallot dressing, and pickled garnish.
12. `12-tainan-beef-soup-v47.png` — Tainan beef soup with thin beef, ginger, scallions, and clear broth.
13. `13-papaya-milk-v47.png` — Kaohsiung papaya milk with ripe papaya wedges.
14. `14-wanluan-pork-knuckle-v47.png` — sliced Wanluan pork knuckle with garlic sauce.
15. `15-coffin-bread-v47.png` — Tainan coffin bread with its lid lifted over creamy savory filling.
16. `16-hualien-mochi-v47.png` — Hualien mochi showing peanut, black-sesame, and red-bean fillings.
17. `17-chishang-rice-bento-v47.png` — open Chishang railway bento with rice, pork, egg, vegetables, and pickles.
18. `18-yilan-smoked-duck-v47.png` — sliced sugarcane-smoked Yilan duck.
19. `19-peeled-chili-v47.png` — glossy Hualien peeled chili peppers with garlic.
20. `20-candied-roselle-v47.png` — ruby-red Taitung candied roselle with a botanical branch.
21. `21-brown-sugar-cake-v47.png` — Penghu brown sugar cake showing its honeycomb crumb.
22. `22-cactus-fruit-ice-v47.png` — Penghu cactus-fruit shaved ice with cactus pear slices.
23. `23-kinmen-congee-v47.png` — Kinmen Cantonese congee with egg, meat, scallions, and fried dough.
24. `24-peanut-candy-v47.png` — Kinmen peanut candy with visible crushed peanuts.
25. `25-matsu-fish-noodles-v47.png` — Matsu fish noodles in clear broth with scallions and fish slices.

## Review notes

All 25 masters were visually inspected after generation; completion-order mismatches affecting 7–10, 17–18, and 21–22 were corrected by subject before runtime conversion, and the superseded derivatives remain recoverable under `_trash/2026-08-22-food-art-remap/`.
