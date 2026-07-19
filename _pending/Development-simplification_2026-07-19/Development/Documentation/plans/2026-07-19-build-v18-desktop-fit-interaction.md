# Build Encounter Cards v18 Desktop Fit and Interaction — Implementation Plan

Design source: `Development/Documentation/designs/2026-07-19-v18-desktop-fit-interaction.md`

## Constraints

- Do not edit v15, v16, v17 source, generated outputs, or public v1.
- Create a complete v18 source and generated standalone line.
- Do not add telemetry, backend transmission, accounts, or persistent personal-data storage.
- Preserve Chinese, English, bilingual, levels, modes, age gate, card interaction, export, and sharing.
- Keep all writes inside the project; do not publish or push during implementation without separate instruction.

## Task 1 — v18 Source and Export Foundation

Copy the authored v17 source into `Development/Source/Main-App-v18/` without `node_modules/`, `dist/`, or version-specific generated state. Create v18-specific PWA finalization and standalone exporter scripts, update package metadata/scripts to identify v18, and create `Apps/Standalone/encounter_cards_v18.html` only through the exporter.

Evidence: v17 paths remain untouched; v18 typecheck can resolve source and scripts.

## Task 2 — RED Desktop Scale Policy

Add `src/lib/viewport-scale.ts` and its unit tests. The test suite must initially fail until it verifies the 430 × 932 contract, desktop safe margin, no-upscale limit, and mobile 1× rule.

Evidence: focused RED test proves the helper is absent or incorrect.

## Task 3 — GREEN Phone-Shell Fitting

Implement a React viewport-scale hook and outer `phone-fit-stage` / `phone-fit-shell` structure. Apply the scale uniformly on desktop only, reserve the scaled dimensions in the stage, and keep the inner UI at 430 × 932. Update CSS to preserve the v16 dark-navy, antique-gold, parchment visual hierarchy while preventing desktop document scrolling.

Evidence: viewport tests pass; 1280 × 900 geometry contains the full shell with no horizontal or vertical overflow.

## Task 4 — Desktop Interaction Coverage

Extend App component tests to use click interaction for language, level, mode, Begin, draw, and next card under a desktop viewport. Preserve keyboard and existing privacy behavior.

Evidence: component tests demonstrate each control changes visible state without pointer-only assumptions.

## Task 5 — v18 Contract and Documentation

Add `Development/Tests/validate_v18.ps1` for required source/output files, standalone runtime embedding, v15–v17 preserved hashes, v18 version markers, scale-policy markers, and no external script/style runtime. Update README, GUIDE, product/architecture documentation, handoff, roadmap, changelog, and public blueprint to distinguish v18 from preserved releases.

Evidence: focused v18 validator is GREEN and current documents point to v18 paths.

## Task 6 — Full Regression

Run v18 typecheck, lint, unit/component tests, PWA build, standalone export, focused v18 validation, v16/v17/public v1 validators, and full repository validation. Inspect desktop 1280 × 900 and mobile 430 × 932 through an HTTP origin; confirm zero console errors and no document overflow.

Evidence: all checks pass; any physical-device-only limits are recorded in handoff.

