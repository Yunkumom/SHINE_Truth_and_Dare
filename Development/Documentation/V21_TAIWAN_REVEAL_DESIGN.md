# Encounter Cards v21 — Hidden Taiwan Reveal

## Approved Direction

v21 extends the immutable v20 release with a discoverable Taiwan-location interaction. Every registered deity artwork keeps its Taiwan motif integrated into the illustration, while a deliberate long press reveals the exact location through a temporary animated locator.

## Interaction Contract

- Press and hold the deity artwork for 600 milliseconds to reveal the hidden Taiwan location.
- Releasing before 600 milliseconds does not reveal the locator and does not interfere with normal card interaction.
- After a successful reveal, the locator remains visible for 3 seconds and then fades away automatically.
- The locator is a gold Taiwan outline with a restrained pulse/blink animation, positioned independently for each artwork.
- Enter and Space reveal the locator when the artwork is keyboard-focused.
- Native image dragging, text selection, and the browser context menu are suppressed only on the interactive artwork area so the long press remains reliable.

## Artwork and Data Contract

- All 18 v20 deity artworks remain available in v21.
- Every `ArtworkVariant` includes a non-empty `hiddenTaiwan` description and numeric `taiwanHotspot` data: horizontal position, vertical position, scale, and rotation.
- Hotspots are expressed relative to the visible artwork frame so they remain aligned at all viewport scales.
- The reveal locator is a runtime annotation. It does not alter the source artwork and is excluded from commemorative-card PNG export.

## Visual and Accessibility Rules

- Preserve the v16-inspired v20 entrance, mythic card hierarchy, artwork prominence, parchment panels, and centered 430 × 932 desktop phone contract.
- Use a fine gold Taiwan outline, a soft halo, and a two-stage pulse that remains visible against both light and dark artwork.
- Announce the artwork as an interactive control with bilingual instructions and a revealed-state status message.
- Respect `prefers-reduced-motion`: show a steady highlighted outline instead of continuous blinking.

## Privacy and Compatibility

- Preserve Chinese, English, and bilingual modes; Levels 1–5; Truth, Dare, and Surprise; independent question/artwork/blessing selection; PNG/Web Share fallback; and offline PWA behavior.
- Do not add analytics, accounts, network transmission, or persistent storage for personal input or reveal history.

