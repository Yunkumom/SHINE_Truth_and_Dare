# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around the active v22 source while preserving standalone v15–v22 releases and keeping retired development material recoverable.

以作用中 v22 source 重建 repository，同時保留 standalone v15–v22，並讓退出使用的開發資料可回復。

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v22 releases
├── Apps/Public-Web/v2/ v3/ v4/ v5/          # preserved v19-v21 and current v22 web releases
├── Assets/Catalog/  Assets/Deities/         # licences, provenance, deity sources
├── Development/
│   ├── Source/Main-App-v18/                 # preserved source line
│   ├── Source/Main-App-v19/                 # preserved deity-card source line
│   ├── Source/Main-App-v20/                 # preserved visual baseline
│   ├── Source/Main-App-v21/                 # preserved hidden-Taiwan source line
│   ├── Source/Main-App-v22/                 # current authored source line
│   ├── Source/Public-Web/v2/ v3/ v4/ v5/    # versioned public-release recipes
│   ├── Automation/Scripts/                  # v18-v22 builders and exporters
│   ├── Automation/Tools/                    # v22 loopback launcher helper
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v22.html
```

v22 is the current self-contained standalone release. It embeds the privacy-safe layout editor, swipe deck, 18 deity images and hotspots, and contact-selectable 63:88 keepsake export. High-resolution PNG sources and provenance remain in `Assets/Deities/`. Public Web v5 is the deployment artifact at `Apps/Public-Web/v5/`. Verified browser-local preference keys are `encounter-language`, `encounter-font-scale`, and `encounter-layout-v22`; the layout value contains geometry only. Personal fields, participant inclusion choices, answers, and card history must not enter persistence, logs, analytics, or telemetry.

## Reconstruction / 重建

1. Restore the canonical root entries and paths documented in `GUIDE.md`.
2. Restore immutable standalone v15–v22, `Apps/Standalone/v16-assets/`, and Public Web v2/v3/v4/v5.
3. Restore `Development/Source/Main-App-v22/`, its versioned automation scripts, the server helper, current validators, deity assets, and product-contract documents; retain v18–v21 as preserved source lines.
4. Restore `_pending/Development-simplification_2026-07-19/` when historical v17, Public Web, old tooling, or completed design/plan evidence is required.
5. Use `Open Truth and Dare.cmd` for the current desktop release.
6. Run `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1`.
7. For future source development, run `npm ci` in `Development/Source/Main-App-v22/`; create v23 for product changes rather than overwriting v22.
8. The approved public deployment is `https://yunkumom.github.io/SHINE_Truth_and_Dare/`; later deployments still require verification and explicit publication scope.

Canonical public repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
