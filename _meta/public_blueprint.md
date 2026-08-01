# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around active v38 while preserving immutable standalone v15–v38 and recoverable development history.

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v38 releases
├── Apps/Public-Web/v2/ … /v21/              # immutable public releases; v21 is current
├── Assets/Catalog/  Assets/Deities/  Assets/Zodiac/ # provenance and reusable masters
├── Development/
│   ├── Source/Main-App-v18/ … /v37/         # preserved source lines
│   ├── Source/Main-App-v38/                 # current authored source + verified dist
│   ├── Source/Public-Web/v2/ … /v21/        # versioned public recipes
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v38.html
```

v38 preserves the complete v37 desktop studio and uniformly scales the 430 × 932 mobile setup and draw canvases inside the live visual viewport. It keeps Begin and revealed-card controls visible, adds draft-based grid-guided artwork adjustment with extended movement, and produces Public Web v21 at `Apps/Public-Web/v21/`.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v38`, and `encounter-presentation-v38`. The latter two contain layout geometry, artwork IDs, typography scales, and visual values only. Desktop mode, editor category, candidate faces, exact artwork/question preferences, custom questions, disabled questions, and search are session-only. Personal inputs must not enter persistence, logs, analytics, telemetry, or a backend.

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore standalone v15–v38, v16 runtime assets, and Public Web v2–v21.
3. Restore `Development/Source/Main-App-v38/`, its v38/v21 automation scripts, server helper, validators, documentation, governed v30 deity masters, v33 classic zodiac masters, and v34 Local Stories masters; retain v18–v37 as preserved lines.
4. Restore `_pending/` only when historical or recoverable generated evidence is required.
5. Run `Open Truth and Dare.cmd` for the desktop release.
6. Run `Development/Tests/validate_repository.ps1` before claiming completion.
7. For future development, run `npm ci` in `Development/Source/Main-App-v38/` with Node 26 and create a new version rather than overwriting v38.
8. Public deployment URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
