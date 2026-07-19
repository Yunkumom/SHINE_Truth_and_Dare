# Encounter Cards v18 Desktop Fit and Interaction Design

## Status

Approved by the user on 2026-07-19. v18 is a new release line; v15, v16, and v17 remain preserved and unchanged.

## Outcome

Retain the v16 visual language—deep navy, antique gold, parchment, serif display type, and a centered phone composition—while making the complete v18 interface usable in a desktop browser at 100% zoom without vertical page scrolling.

## Layout Contract

- Mobile remains the 430 × 932 iPhone Pro Max reference experience.
- At desktop widths, the rendered 430 × 932 phone shell scales uniformly to fit the browser's available width and height, with a small safe margin.
- The scale is calculated from the current viewport: `min(1, availableWidth / 430, availableHeight / 932)`.
- A wrapper reserves the scaled width and height; the 430 × 932 shell is transformed inside it. The transform must not leave invisible click targets or cause page overflow.
- Desktop never relies on browser zoom, hides accidental document scrolling, and centers the complete phone composition.

## Interaction Contract

- v18 uses the maintainable React/TypeScript source, not the v16 HTTP-module artifact.
- Language, font size, Level 1–5, Truth/Dare/Surprise, birthday gate, Begin, draw, reveal, next card, and share/download controls remain mouse-clickable and keyboard-accessible on desktop.
- The standalone v18 HTML embeds its runtime so core interaction works when opened directly from disk. PWA install/offline behavior still requires an HTTP(S) origin.
- Personal input stays memory-only; no analytics, backend, account, or personal-data persistence is added.

## Version Structure

```text
Development/Source/Main-App-v18/       # v18 React/TypeScript source
Development/Automation/Scripts/*-v18.mjs # v18 PWA and standalone exporters
Apps/Standalone/encounter_cards_v18.html # generated standalone release
Development/Tests/validate_v18.ps1     # v18 release contract
```

## Verification

1. Unit-test viewport scale calculations for desktop and mobile breakpoints.
2. Component-test desktop click paths through language, level, mode, Begin, draw, and next-card actions.
3. Verify at 430 × 932 and common desktop viewports including 1280 × 900 with no document overflow.
4. Verify the v18 standalone retains embedded runtime and opens controls without external script/style dependencies.
5. Run typecheck, lint, tests, production build, focused v18 validation, and full repository validation.

