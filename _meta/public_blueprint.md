# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around active v29 while preserving immutable standalone v15–v29 and recoverable development history.

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v29 releases
├── Apps/Public-Web/v2/ … /v12/               # preserved public releases; v12 is current
├── Assets/Catalog/  Assets/Deities/         # provenance and Taiwan-safe source art
├── Development/
│   ├── Source/Main-App-v18/ … /v25/         # preserved source lines
│   ├── Source/Main-App-v29/                 # current authored source + verified dist
│   ├── Source/Public-Web/v2/ … /v12/         # versioned public recipes
│   ├── Automation/Scripts/                  # versioned builders/exporters
│   ├── Automation/Tools/                    # loopback launcher
│   ├── Tests/                               # release and repository contracts
│   └── Documentation/                       # product designs and plans
├── _meta/  _agent/  _human/
├── _pending/                                # recoverable retired/generated state
├── GUIDE.md  README.md  AGENTS.md
└── Open Truth and Dare.cmd
```

The owner-private blueprint remains local-only and ignored. Proposed deletions first enter `_pending/` and `_pending/index.md`.

## Current Runtime / 目前 Runtime

```text
Open Truth and Dare.cmd
  -> Development/Automation/Tools/serve_truth_and_dare.ps1
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v29.html
```

v29 preserves the complete v28 interaction, artwork, and presentation contract while adding independent readable question and blessing typography controls synchronized with PNG output. Public Web v12 is deployed from `Apps/Public-Web/v12/`.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v29`, and `encounter-presentation-v29`. The latter two contain layout geometry, artwork IDs, typography scales, and visual values only. Personal inputs must not enter persistence, logs, analytics, telemetry, or a backend.

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore standalone v15–v29, v16 runtime assets, and Public Web v2–v12.
3. Restore `Development/Source/Main-App-v29/`, its v29/v12 automation scripts, server helper, validators, documentation, and governed assets; retain v18–v28 as preserved lines.
4. Restore `_pending/` only when historical or recoverable generated evidence is required.
5. Run `Open Truth and Dare.cmd` for the desktop release.
6. Run `Development/Tests/validate_repository.ps1` before claiming completion.
7. For future development, run `npm ci` in `Development/Source/Main-App-v29/` and create a new version rather than overwriting v29.
8. Public deployment URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
