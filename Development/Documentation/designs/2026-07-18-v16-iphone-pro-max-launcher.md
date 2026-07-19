# Encounter Cards v16 — iPhone Pro Max and Desktop Launcher Design

## Status

Approved by the user on 2026-07-18: **v16 iPhone Pro Max first + one-click desktop launcher**.

## Outcome

Encounter Cards v16 remains a versioned standalone package derived reproducibly from the immutable v15 baseline. It runs through a local HTTP origin on desktop so the ViNext/React module graph can hydrate, and it uses a 430 × 932 CSS-pixel iPhone Pro Max viewport as the primary layout contract.

## Structure

- `app/encounter_cards_v15.html` remains unchanged.
- `app/encounter_cards_v16.html` is the generated v16 product.
- `tools/build_v16.ps1` performs the deterministic transformation from v15 to v16.
- `tools/serve_truth_and_dare.ps1` starts or reuses a project-local HTTP server on `127.0.0.1:8765`, then opens v16.
- `Open Truth and Dare.cmd` is the human one-click desktop entry point.
- `tests/validate_v16.ps1` is the focused deterministic contract test.

## Layout

On screens 560 CSS pixels wide or narrower, the game fills the available viewport and respects iOS safe-area insets. The design target is 430 × 932, while smaller supported iPhones remain usable through existing fluid sizing.

On wider screens, the same mobile layout is placed inside a centered 430 × up-to-932 frame with rounded corners and a quiet outer background. Desktop does not revert to the previous wide two-column layout.

## Runtime Flow

1. The user double-clicks `Open Truth and Dare.cmd`.
2. The launcher invokes the PowerShell server helper.
3. The helper checks whether port 8765 already serves this project.
4. If needed, it starts `python -m http.server` bound to `127.0.0.1` with the repository root as its directory.
5. It waits for the port and opens `http://127.0.0.1:8765/app/encounter_cards_v16.html` in the default browser.
6. The browser receives a normal HTTP origin, allowing the existing module/import-map hydration path.

The server is loopback-only and does not expose the application to the local network or Internet.

## Failure Behavior

- If Python is unavailable, the launcher displays a clear actionable error and exits unsuccessfully.
- If port 8765 is occupied by another service, the helper refuses to open the wrong application.
- The build refuses to overwrite a different existing v16 output.
- Direct `file://` opening is not supported; the launcher and project documentation provide the supported entry path.

## Hydration-Safe Implementation Correction

Browser evidence showed that JavaScript `data:` modules could not resolve nested absolute imports, so v16 extracts the five embedded modules into `app/v16-assets/`. A second browser check showed that adding new pre-hydration head/body nodes caused React error #418. The final design therefore preserves the original document-node structure, appends CSS inside the existing style element, and synchronizes both HTML and RSC viewport metadata.

## Verification

- RED/GREEN contract test for required v16 markers and launcher behavior.
- SHA-256 proof that v15 remains unchanged.
- Repository regression validation.
- Browser checks at 430 × 932 and a wide desktop viewport through the correct local HTTP origin.
- Interaction smoke test for language, level, mode, and Begin controls without entering personal data.
