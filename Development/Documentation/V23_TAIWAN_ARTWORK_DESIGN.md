# v23 Taiwan Artwork Design

Status: approved from the owner's 2026-07-22 requirements.

## Goal

Every deity artwork contains one recognizable Taiwan silhouette that remains inside the visible card image. A long press reveals the same silhouette with a precise, consistent locator.

## Artwork contract

- Preserve the deity's identity, pose, hands, clothing, scene, painterly finish, resolution, and aspect ratio.
- Remove ambiguous or edge-positioned Taiwan-like marks that can be cropped.
- Place one geographically recognizable, elongated Taiwan silhouette inside the central safe zone (25–75% on both axes).
- Integrate the silhouette into a garment, weapon, accessory, ritual object, book, lamp, or background prop.
- Vary material and color between artworks while keeping the contour consistent.
- Do not add text, watermarks, UI frames, unrelated symbols, or anatomy changes.

## Interaction contract

- Static art contains the colored Taiwan motif.
- Long press overlays one canonical SVG Taiwan path aligned to that motif.
- Only position, scale, rotation, and color vary by artwork; the geographic contour does not.
- The locator glows and pulses, with a reduced-motion fallback.
- The locator must never be represented by a bowl, arc, leaf, oval, shield, or generic blob.

## Release scope

v15–v22 remain immutable. Implementation ships as v23 source, standalone output, public web output, launchers, tests, and documentation.
