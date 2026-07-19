# Top-Level Governance Directories Design / 頂層治理目錄設計

## Status / 狀態

Approved by the user on 2026-07-19. The repository must expose `_meta/`, `_agent/`, `_human/`, and `_pending/` at the root in addition to the existing product-oriented `Apps/`, `Assets/`, and `Development/` directories.

使用者於 2026-07-19 核准。Repository 除既有產品導向的 `Apps/`、`Assets/`、`Development/` 外，根目錄必須直接提供 `_meta/`、`_agent/`、`_human/` 與 `_pending/`。

## Required Root Contract / 必要根目錄合約

```text
Truth and Dare/
├── README.md
├── AGENTS.md
├── _meta/
│   ├── owner_private_blueprint.md
│   └── public_blueprint.md
├── _agent/
├── _human/
└── _pending/
```

The diagram shows mandatory entries, not an exclusive root allow-list. Product directories and required platform or launcher files remain at the root.

上圖表示必備項目，不代表根目錄只能包含這些內容。產品目錄、平台檔案與啟動器仍保留於根目錄。

## Responsibility Mapping / 職責映射

| Existing path | Canonical path | Responsibility |
| --- | --- | --- |
| `Development/Governance/Meta/` | `_meta/` | Purpose, roadmap, handoff, changelog, and public/private blueprints |
| `Development/Governance/Agent/` | `_agent/` | Agent entry point and instructions |
| `Development/Governance/Skills/` | `_agent/Skills/` | Project-specific reusable skills |
| `Development/Human-References/` | `_human/` | Human-facing references and dashboards |
| `Development/Pending/` | `_pending/` | Recoverable holding area for files proposed for deletion or awaiting human review |

## Pending Safety Contract / 待刪除安全合約

- Files that may be deleted are moved to `_pending/` first; they are never permanently deleted as part of ordinary cleanup.
- `_pending/index.md` records the original path, move date, reason, suggested action, and explicit human decision.
- Disposal requires a later explicit human approval. Until then, files remain recoverable.

- 可能刪除的檔案必須先移至 `_pending/`；一般整理不得永久刪除。
- `_pending/index.md` 記錄原路徑、移動日期、原因、建議動作與明確人工決定。
- 真正清除需要後續明確人工核准；在此之前檔案必須保持可回復。

## Privacy and Migration Safety / 隱私與遷移安全

- Move the owner-private blueprint without reading or exposing its contents.
- Update ignore rules before relocation so `_meta/owner_private_blueprint.md` remains local-only.
- Move all governed content without changing immutable product releases.
- Preserve unrelated working-tree changes.

