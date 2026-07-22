# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around the active v21 source while preserving standalone v15–v21 releases and keeping retired development material recoverable.

以作用中 v21 source 重建 repository，同時保留 standalone v15–v21，並讓退出使用的開發資料可回復。

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v21 releases
├── Apps/Public-Web/v2/ v3/ v4/              # preserved v19/v20 and current v21 web releases
├── Assets/Catalog/  Assets/Deities/         # licences, provenance, deity sources
├── Development/
│   ├── Source/Main-App-v18/                 # preserved source line
│   ├── Source/Main-App-v19/                 # preserved deity-card source line
│   ├── Source/Main-App-v20/                 # preserved visual baseline
│   ├── Source/Main-App-v21/                 # current authored source line
│   ├── Source/Public-Web/v2/ v3/ v4/         # versioned public-release recipes
│   ├── Automation/Scripts/                  # v18-v21 builders and exporters
│   ├── Automation/Tools/                    # v21 loopback launcher helper
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v21.html
```

v21 is the current self-contained standalone release. Its 18 deity images are embedded as WebP data and every image has an independent hidden-Taiwan hotspot; the reveal overlay is runtime-only and never enters PNG export. High-resolution PNG sources and provenance remain in `Assets/Deities/`. Public Web v4 is the GitHub Pages artifact at `Apps/Public-Web/v4/`. Verified browser-local preference keys are `encounter-language` and `encounter-font-scale`; personal fields and reveal history must not enter logs, documentation, analytics, telemetry, or persistent storage.

## Reconstruction / 重建

1. Restore the canonical root entries and paths documented in `GUIDE.md`.
2. Restore immutable standalone v15–v21, `Apps/Standalone/v16-assets/`, and Public Web v2/v3/v4.
3. Restore `Development/Source/Main-App-v21/`, its versioned automation scripts, the server helper, current validators, deity assets, and product-contract documents; retain v18–v20 as preserved source lines.
4. Restore `_pending/Development-simplification_2026-07-19/` when historical v17, Public Web, old tooling, or completed design/plan evidence is required.
5. Use `Open Truth and Dare.cmd` for the current desktop release.
6. Run `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1`.
7. For future source development, run `npm ci` in `Development/Source/Main-App-v21/`; create v22 for product changes rather than overwriting v21.
8. The approved public deployment is `https://yunkumom.github.io/SHINE_Truth_and_Dare/`; later deployments still require verification and explicit publication scope.

Canonical public repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
