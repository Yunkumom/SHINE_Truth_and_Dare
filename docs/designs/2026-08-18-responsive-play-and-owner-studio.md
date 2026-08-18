# Responsive Play and Owner Studio Design

## Status

Approved by the owner on 2026-08-18 for complete implementation in the active `Versions/v47` work-in-progress line.

擁有者已於 2026-08-18 核准完整實作於作用中的 `Versions/v47` 開發版本。

## Purpose

Make the 430 × 932 play surface impossible to cut off or cover with ordinary controls, and make the Mac interface feel like an owner-facing visual design studio instead of a developer console.

讓 430 × 932 遊玩介面不會被一般控制元件裁切或覆蓋，並讓 Mac 介面成為擁有者可直覺操作的視覺設計工作室，而非開發者控制台。

## Product boundaries

- Preserve mobile-first encounter play, offline behavior, language modes, Levels 1–5, Truth/Dare/Surprise, card interaction, keepsake blessing, and local PNG/share behavior.
- Keep privacy-sensitive session values local and out of layout documents.
- Keep `Versions/v46` immutable; implement only in `Versions/v47`.
- Do not publish, deploy, or change external accounts.

## Mobile structure

The game screen uses one reserved vertical flow: header, compact status, flexible card, contextual secondary control, and primary action.

遊戲畫面採用單一保留空間的垂直流程：頁首、精簡狀態、可伸縮卡牌、情境式次要控制、主要動作。

- The card consumes only the remaining row and preserves its aspect ratio.
- Settings and actions are normal grid rows, never floating over the card.
- The header settings button is the sole pre-draw settings entry; the duplicate large settings strip becomes a compact inline context row without another menu icon.
- Safe-area padding is reserved for the action row.
- The back label follows the selected language instead of always saying `Setup`.

## Owner studio structure

The Mac authoring surface has three clear regions: screen navigation, one central phone canvas, and a contextual inspector.

Mac 編輯介面具有三個清楚區域：畫面導覽、中央單一手機畫布、情境式屬性檢查器。

- Editing and testing remain separate modes.
- Direct manipulation is enabled by default in editing mode.
- The owner sees friendly screen and element names before internal identifiers.
- Common visual controls are prominent; coordinates and JSON are inside an advanced section.
- Undo, redo, fit-to-screen status, device size, and safe-area guidance remain visible.
- Test mode shows only the centered interactive phone.

## Error and safety behavior

- Layout normalization continues to clamp blocks to 430 × 932.
- The editor presents a warning when the selected block reaches or crosses the protected bottom action zone.
- Invalid imported layout JSON remains rejected, including privacy-sensitive keys.
- Short-height mobile layouts reduce control heights and gaps before shrinking readable content.

## Verification

- Deterministic source contracts prove reserved mobile rows, non-overlay controls, localized navigation, owner-friendly editor labels, default direct manipulation, and advanced-only raw controls.
- Existing v47 feature, privacy, build, lint, artifact, and repository validation remain green.
- Browser screenshots cover 430 × 932 and a short viewport when a local visual runner is available.
