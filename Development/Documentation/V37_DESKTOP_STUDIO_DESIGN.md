# Encounter Cards v37 Desktop Studio Design

Date: 2026-07-30
Status: Approved

## Outcome

v37 replaces the desktop authoring arrangement with a fixed three-column studio that fits at every viewport from 1366 × 768 upward without page or editor scrolling. Existing v15–v36 releases and the v36 authored source remain immutable.

## Settings mode

- The compact layout editor owns the far-left column.
- A large interactive authoring preview fills the flexible centre column.
- A smaller synchronized 430 × 932 phone preview owns the far-right column and remains inert and hidden from accessibility navigation.
- Settings/Test controls use small bookmark-style tabs in reserved centre-stage chrome. They never overlap, cover, or move into the editor column.
- The editor groups controls into Layout, Card, History, and Data sections. Only one section is visible at a time, so the editor remains fully usable without internal scrolling.

## Test mode

- Editing chrome, selection outlines, direct-manipulation handles, and the inactive duplicate preview are removed.
- The same session state continues into one fully interactive 430 × 932 phone simulation.
- The compact bookmark-style mode tabs remain outside the phone canvas and outside the editor area.

## Responsive contract

- At 1366 × 768 and larger, the Settings studio has three complete content columns with safe outer gaps and no horizontal or vertical document overflow.
- The left rail is compact and fixed-width; the right phone preview uses a smaller fit scale; the centre preview receives the remaining width and the largest safe fit scale.
- Below the desktop breakpoint, the existing mobile play-only 430 × 932 experience remains unchanged and no desktop editor or mode control is rendered.

## Interaction and privacy

- Numeric editing remains the default. Direct manipulation remains explicitly opt-in.
- Switching editor sections or desktop modes does not change layout data or personal input.
- Only the existing privacy-safe layout and presentation documents may persist. Names, contacts, birthdays, answers, custom questions, disabled-question state, and exact choices remain session-only.
- No analytics, accounts, backend, telemetry, or new network behavior is introduced.

## Acceptance criteria

1. At 1366 × 768, Settings mode shows the editor at far left, enlarged centre preview, and phone preview at far right with no page or editor scrollbars.
2. Mode controls occupy their own compact bookmark area and never overlap the editor.
3. Each editor category fits inside the available height; inactive categories are not rendered.
4. The centre preview is larger than the right phone preview.
5. Test mode presents one fully interactive phone simulation and contains no editable layout handles or inert duplicate phone.
6. Desktop mode switching preserves session state.
7. Mobile behavior and the 430 × 932 application contract remain unchanged.
