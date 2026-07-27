# v30 Portrait-safe Artwork Plan / v30 人像安全圖計畫

1. Generate 18 independent 2:3 masters with the common safe-zone prompt and project-owned Baosheng Dadi reference.
2. Inspect every output; reject any artwork whose Taiwan falls outside the central crop (the first Guan Sheng Dijun reading result was rejected and regenerated).
3. Save final PNG masters under `Assets/Deities/v30-safe-masters/` and derive high-quality WebP runtime copies.
4. Create v30 from immutable v29; update all 18 mappings, focal points and locators without changing game behavior.
5. Run focused RED/GREEN artwork tests, then the complete test/typecheck/lint/build suite.
6. Rotate through all 18 assets in the real desktop/mobile-preview card frame, inspect high-risk crops and verify the glowing coastline alignment.
7. Build immutable standalone v30 and Public Web v13, validate the repository, then commit, push and verify GitHub Pages.
