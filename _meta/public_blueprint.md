# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around the active v18 source while preserving standalone v15–v18 releases and keeping retired development material recoverable.

以作用中 v18 source 重建 repository，同時保留 standalone v15–v18，並讓退出使用的開發資料可回復。

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v18 releases
├── Assets/Catalog/                          # licences and provenance
├── Development/
│   ├── Source/Main-App-v18/                 # only active source line
│   ├── Automation/Scripts/                  # v18 exporters
│   ├── Automation/Tools/                    # v18 loopback launcher helper
│   ├── Tests/                               # current validators
│   ├── Documentation/                       # current product contracts
│   └── README.md                            # every meaningful retained file
├── _meta/  _agent/  _human/
├── _pending/
│   └── Development-simplification_2026-07-19/ # retired Development archive
├── GUIDE.md  README.md  AGENTS.md
└── Open Truth and Dare.cmd
```

The owner-private blueprint remains local-only and ignored. Proposed deletions must first enter `_pending/` and `_pending/index.md`.

## Current Runtime / 目前 Runtime

```text
Open Truth and Dare.cmd
  -> Development/Automation/Tools/serve_truth_and_dare.ps1
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v19.html
```

v19 is the current self-contained standalone release. Its nine deity images are embedded as WebP data, while high-resolution PNG sources and provenance remain in `Assets/Deities/`. Public Web v2 is deployed from `Apps/Public-Web/v2/` by GitHub Pages. Verified browser-local preference keys are `encounter-language` and `encounter-font-scale`; personal fields must not enter logs, documentation, analytics, or telemetry.

## Reconstruction / 重建

1. Restore the canonical root entries and paths documented in `GUIDE.md`.
2. Restore immutable standalone v15–v18 plus `Apps/Standalone/v16-assets/`.
3. Restore `Development/Source/Main-App-v18/`, the two v18 automation scripts, the server helper, current validators, and product-contract documents.
4. Restore `_pending/Development-simplification_2026-07-19/` when historical v17, Public Web, old tooling, or completed design/plan evidence is required.
5. Use `Open Truth and Dare.cmd` for the current desktop release.
6. Run `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1`.
7. For future source development, run `npm ci` in `Development/Source/Main-App-v18/`; create a new numbered release for product changes rather than overwriting v18.
8. Publish or deploy only after separate explicit approval and fresh privacy/accessibility/device review.

Canonical public repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`. Publication remains a separate decision.
