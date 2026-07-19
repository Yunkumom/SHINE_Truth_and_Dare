# Truth and Dare Repository Implementation Plan

## Scope and Constraints

Writable scope is limited to `<PROJECT_ROOT>`. Preserve the supplied HTML without product redesign. Do not install packages, make network calls, publish a remote, expose private data, create empty optional directories, or permanently delete source material. Initialize local Git only; do not commit or push.

## Task 1 — Establish governance core

Create `README.md`, `AGENTS.md`, `.gitignore`, `_meta/purpose.md`, `_meta/roadmap.md`, `_meta/handoff.md`, `_meta/owner_private_blueprint.md`, `_meta/public_blueprint.md`, `_meta/changelog.md`, `_agent/README.md`, `skills/README.md`, `_human/README.md`, and `_pending/index.md`.

Evidence checkpoint: every mandatory path exists; `.gitignore` excludes `_meta/owner_private_blueprint.md` while leaving `_meta/public_blueprint.md` trackable.

## Task 2 — Add the website artifact

Copy the supplied standalone HTML to `_human/dashboards/agent-handoff_v18.html` without altering its interface or JavaScript behavior. Index it in `_human/README.md` and document the custom folders in the entry-point files.

Evidence checkpoint: SHA-256 hashes of the supplied and repository HTML files match.

## Task 3 — Add deterministic validation

Create `tests/validate_repository.ps1`. It must fail when required files are absent, the private blueprint is not ignored, the public blueprint is ignored, external runtime dependencies appear in the HTML, or the title/font-size/copy-control markers are missing.

Evidence checkpoint: temporarily test validation logic conceptually through its explicit assertions, then run it against the completed repository and obtain exit code 0.

## Task 4 — Initialize and inspect Git

Run `git init`, verify the private blueprint is ignored, inspect `git status --short`, and ensure no secret-like or unrelated files are staged or tracked. Do not create a commit or remote.

Evidence checkpoint: `git check-ignore _meta/owner_private_blueprint.md` succeeds and `git check-ignore _meta/public_blueprint.md` fails.

## Task 5 — Final regression and security check

Run the validation script, parse the HTML enough to confirm balanced core document markers, search the repository for likely credential assignments, and confirm there are no empty directories.

Expected result: all checks pass, no secrets are found, no empty directories exist, and the repository is ready for human review.
