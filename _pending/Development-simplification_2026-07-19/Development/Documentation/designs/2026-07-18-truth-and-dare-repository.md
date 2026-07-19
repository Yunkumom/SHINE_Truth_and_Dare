# Truth and Dare Repository Design

## Status

Approved on 2026-07-18 through the user's request to create a repository from the supplied website and the confirmed project name, **Truth and Dare**.

## Purpose

Create a self-contained, maintainable repository around the supplied SHINE AI OS Agent Handoff v18 website. The repository must preserve the website's current visual design and interactions while adding the governance, privacy, handoff, and reconstruction documentation required by the active SHINE_AI_OS workspace.

## Structure

- `README.md` and `AGENTS.md` are the human and Agent entry points.
- `_meta/` stores purpose, roadmap, handoff, changelog, and public/private reconstruction blueprints.
- `_agent/`, `skills/`, `_human/`, and `_pending/` provide the required stable governance areas.
- `_human/dashboards/agent-handoff_v18.html` is the preserved standalone website.
- `tests/validate_repository.ps1` validates the required structure, privacy boundary, and website markers.
- `docs/` stores the approved design and implementation plan.

## Data Flow and Privacy

The website is a standalone local HTML document. It makes no network requests and stores only the selected font size in browser `localStorage` under `shine-guide-font-size`. The local-only owner blueprint is excluded from Git. No credentials, private account data, or environment configuration are required.

## Interaction

The dashboard retains its font-size controls, prompt-copy button with fallback behavior, collapsible Q&A, responsive layout, and print styling. No product behavior is redesigned in this repository-creation task.

## Failure Behavior

- Clipboard failure falls back to selection plus `document.execCommand('copy')`, as in the supplied website.
- Missing dashboard markers, missing governance files, forbidden external dependencies, or an unsafe `.gitignore` cause the validation script to exit unsuccessfully.
- Uncertain future content must be moved to `_pending/` and recorded instead of being permanently deleted.

## Verification

Run `powershell -ExecutionPolicy Bypass -File tests/validate_repository.ps1`. A successful result must confirm required files, Git privacy rules, standalone HTML constraints, and key interactive controls.

