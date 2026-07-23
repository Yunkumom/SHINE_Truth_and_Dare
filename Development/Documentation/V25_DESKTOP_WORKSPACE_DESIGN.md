# Encounter Cards v25 Desktop Workspace Design

Date: 2026-07-24

## Approved outcome

- Mobile preserves the 430 × 932 single-column card-game experience.
- Desktop uses a centered two-column studio on setup, game, and keepsake screens: a large interactive canvas and layout controls on the left, plus an exact synchronized 430 × 932 phone preview on the right.
- The deity-name band is reduced so artwork receives more vertical space.
- Every artwork has a versioned portrait-safe focal point. The same focus drives browser `object-position` and PNG cover cropping so the full face and headwear remain visible in game and keepsake output.
- v15–v24 remain immutable. v25 becomes standalone v25 and Public Web v8.

## Interaction and privacy

The left canvas is the only interactive player surface on desktop. The right phone preview is synchronized, inert, and hidden from accessibility navigation to avoid duplicate controls. Layout geometry remains the only persisted editor data; names, contacts, birthdays, answers, and history are never persisted or transmitted.

## Responsive contract

- Under 1100 px: one fitted phone surface, existing mobile gestures and bottom actions.
- At or above 1100 px: centered desktop studio; left workbench fills available space, right preview retains 430 × 932 proportions and scales only when viewport height requires it.
- Both columns must remain fully inside the viewport with safe margins.

## Visual contract

The v16-inspired navy, parchment, bronze, serif typography, card depth, and Taiwan reveal remain intact. The game card rows become a narrower title band, taller artwork, and unchanged readable prompt area. Per-artwork focus values are data, not hard-coded CSS exceptions.
