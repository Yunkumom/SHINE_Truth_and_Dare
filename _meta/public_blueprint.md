# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around the active v20 source while preserving standalone v15–v20 releases and keeping retired development material recoverable.

以作用中 v20 source 重建 repository，同時保留 standalone v15–v20，並讓退出使用的開發資料可回復。

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v20 releases
├── Apps/Public-Web/v2/  Apps/Public-Web/v3/ # preserved v19 and current v20 web releases
├── Assets/Catalog/  Assets/Deities/         # licences, provenance, deity sources
├── Development/
│   ├── Source/Main-App-v18/                 # preserved source line
│   ├── Source/Main-App-v19/                 # preserved deity-card source line
│   ├── Source/Main-App-v20/                 # current authored source line
│   ├── Source/Public-Web/v2/  v3/            # versioned public-release recipes
│   ├── Automation/Scripts/                  # v18-v20 builders and exporters
│   ├── Automation/Tools/                    # v20 loopback launcher helper
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v20.html
```

v20 is the current self-contained standalone release. Its 18 deity images are embedded as WebP data, while high-resolution PNG sources and provenance remain in `Assets/Deities/`. Public Web v3 is deployed from `Apps/Public-Web/v3/` by GitHub Pages. Verified browser-local preference keys are `encounter-language` and `encounter-font-scale`; personal fields must not enter logs, documentation, analytics, or telemetry.

## Reconstruction / 重建

1. Restore the canonical root entries and paths documented in `GUIDE.md`.
2. Restore immutable standalone v15–v20, `Apps/Standalone/v16-assets/`, and Public Web v2/v3.
3. Restore `Development/Source/Main-App-v20/`, its versioned automation scripts, the server helper, current validators, deity assets, and product-contract documents; retain v18/v19 as preserved source lines.
4. Restore `_pending/Development-simplification_2026-07-19/` when historical v17, Public Web, old tooling, or completed design/plan evidence is required.
5. Use `Open Truth and Dare.cmd` for the current desktop release.
6. Run `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1`.
7. For future source development, run `npm ci` in `Development/Source/Main-App-v20/`; create v21 for product changes rather than overwriting v20.
8. The approved public deployment is `https://yunkumom.github.io/SHINE_Truth_and_Dare/`; later deployments still require verification and explicit publication scope.

Canonical public repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
