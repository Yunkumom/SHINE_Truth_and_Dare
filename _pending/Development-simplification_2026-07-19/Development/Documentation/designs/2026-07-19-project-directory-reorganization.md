# Project Directory Reorganization Design / 專案資料夾重整設計

## Status / 狀態

Superseded in part on 2026-07-19 by `2026-07-19-top-level-governance-directories.md`. The `Apps/`, `Assets/`, and `Development/` product categories remain, while `_meta/`, `_agent/`, `_human/`, and `_pending/` are now required root entries.

本設計於 2026-07-19 部分由 `2026-07-19-top-level-governance-directories.md` 取代。`Apps/`、`Assets/`、`Development/` 產品分類保留；`_meta/`、`_agent/`、`_human/`、`_pending/` 改為必要根目錄。

## Root Contract / 根目錄合約

```text
Truth and Dare/
├── Apps/                       # Completed, runnable, or publishable products
├── Assets/                     # Reusable resources and asset governance
├── Development/                # Source, automation, tests, documents, and history
├── GUIDE.md                    # Canonical directory guide
├── README.md                   # Project introduction and quick start
├── AGENTS.md                   # Agent governance entry point
├── Open Truth and Dare.cmd     # One-click desktop launcher
├── .github/                    # GitHub requires this root location
├── .gitignore
└── .git/
```

Historical rule: this allow-list described the first reorganization. The later approved root-governance design adds `_meta/`, `_agent/`, `_human/`, and `_pending/`. `.git/` remains repository infrastructure and is not moved.

## Category Structure / 分類結構

```text
Apps/
├── README.md
├── Standalone/                 # Preserved v15, v16, v17 HTML and v16 runtime assets
└── Public-Web/                 # Versioned, deployable GitHub Pages output

Assets/
├── README.md
└── Catalog/                    # Licences, provenance, and reusable-asset index

Development/
├── README.md
├── Source/
│   ├── Main-App/               # Maintainable v17 React/TypeScript source
│   └── Public-Web/             # Versioned public website source
├── Automation/
│   ├── Scripts/                # Node build/finalization scripts
│   └── Tools/                  # PowerShell build/serve helpers
├── Tests/                      # Repository and release validators
├── Documentation/             # Product specs, designs, and plans
├── Governance/
│   ├── Meta/                   # Purpose, roadmap, handoff, blueprints, changelog
│   ├── Agent/                  # Agent workspace index
│   └── Skills/                 # Project-specific skill index
├── Human-References/           # Human-facing support artifacts
└── Pending/                    # Retained failed or undecided artifacts
```

## Existing-Path Mapping / 舊路徑對照

| Existing path | New path | Responsibility |
| --- | --- | --- |
| `app/` | `Apps/Standalone/` | Runnable standalone releases |
| `site/` | `Apps/Public-Web/` | Deployable public output |
| `docs/asset-licenses.md` | `Assets/Catalog/asset-licenses.md` | Asset licence inventory |
| `docs/content-sources.json` | `Assets/Catalog/content-sources.json` | Content and visual provenance |
| `web/` | `Development/Source/Main-App/` | Current maintainable application source |
| `pages-src/` | `Development/Source/Public-Web/` | Versioned public source |
| `scripts/` | `Development/Automation/Scripts/` | Node automation |
| `tools/` | `Development/Automation/Tools/` | PowerShell automation |
| `tests/` | `Development/Tests/` | Deterministic validation |
| `docs/` | `Development/Documentation/` | Specifications, designs, and plans |
| `_meta/` | `Development/Governance/Meta/` | Repository state and reconstruction records |
| `_agent/` | `Development/Governance/Agent/` | Agent workspace index |
| `skills/` | `Development/Governance/Skills/` | Project-specific skills |
| `_human/` | `Development/Human-References/` | Human support artifacts |
| `_pending/` | `Development/Pending/` | Recoverable review buffer |

## Annotation Contract / 註記合約

- `GUIDE.md` is the canonical complete directory map and annotates every repository-controlled directory, including generated and immutable directories.
- Every human-maintained organizational directory receives a local `README.md` describing purpose, allowed contents, edit policy, and important commands.
- Generated output, immutable releases, and runtime asset directories are documented by their nearest parent `README.md` and `GUIDE.md`; no annotation file is inserted into them if that would change release hashes or manifests.
- New directories must be documented in `GUIDE.md` in the same change that creates them.

## Version and Asset Safety / 版本與素材安全

- v15, v16, v17 standalone files and v16 runtime modules move byte-for-byte as one unit.
- Public v1 source and output move as complete version directories; their internal files are not rewritten merely to add annotations.
- Existing runtime/source-local assets remain with their release or source when relocation would break self-containment or immutable manifests.
- `Assets/Catalog/` becomes the canonical licence and provenance location. Future reusable source assets belong under `Assets/` before being copied into a versioned product build.
- No content is permanently deleted. The later canonical location for failed, proposed-deletion, and uncertain artifacts is `_pending/`, where every item stays indexed.

## Path Migration / 路徑遷移

All launchers, build scripts, package scripts, tests, GitHub workflow paths, manifests, documentation links, and reconstruction instructions must use the new canonical paths. Relative runtime URLs inside preserved products remain unchanged when their containing directory moves intact.

## Verification / 驗證

Completion requires:

1. A root allow-list check proving that only the three primary categories and required root entries remain.
2. Before/after SHA-256 equality for immutable v15, v16, v17, v16 modules, and public v1 files.
3. Successful focused v16, v17, public v1, and full repository validation from their new paths.
4. Successful v17 typecheck, lint, tests, and standalone build.
5. Successful public v1 tests, typecheck, build/finalization parity check.
6. A scan confirming no stale canonical path references remain outside historical documents that are explicitly marked as historical.
7. No push, deployment, publication, account change, or permanent deletion.
