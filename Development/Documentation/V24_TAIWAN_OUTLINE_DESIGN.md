# Encounter Cards v24 Taiwan Outline Design / v24 台灣輪廓發光設計

Date: 2026-07-23

## Problem / 問題

The v23 reveal is rendered at only 24 × 48 CSS pixels, then reduced again by per-artwork scale. A semi-opaque fill, central dot, oval halo, four-pixel non-scaling stroke, and strong blur compete with the coastline. On a phone the result reads as a fluorescent symbol rather than Taiwan.

v23 揭示圖只有 24 × 48 CSS px，還會再套用個別縮放；半透明實心填色、中央圓點、橢圓光暈、固定四像素線條與強模糊彼此重疊，手機上看起來像螢光符號而不是台灣。

## Approved Visual Contract / 已核准視覺合約

- Ship as v24; v15–v23 remain immutable.
- Preserve the 600 ms hold, 3-second release visibility, keyboard access, hotspot positions, and per-artwork colours.
- Render a larger, geographically recognizable Taiwan coastline with transparent interior.
- Use two coincident paths: a broad low-opacity coloured glow underneath and a crisp bright coastline above.
- Animate opacity and glow only along the coastline. Do not render a centre dot, oval/circular halo, radial disc, or solid island fill.
- Keep northern breadth, east/west coastal asymmetry, Penghu-free main-island silhouette, and pointed southern tip readable at phone size.
- Respect `prefers-reduced-motion` with a steady luminous outline.
- Keep all reveal UI out of downloaded commemorative cards.

## Acceptance / 驗收

At 430 × 932, the revealed mark must immediately read as Taiwan rather than a bowl, leaf, ribbon, pin, or abstract glyph. DOM tests must prove two outline paths, transparent fill, no dot/halo elements, v24 canonical marker, minimum locator size, and reduced-motion support. Browser evidence must confirm the rendered outline on a real card.
