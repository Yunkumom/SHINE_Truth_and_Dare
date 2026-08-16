#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
vite="${SITES_PROJECT_ROOT}/node_modules/.bin/vite"
if [[ ! -x "${vinext}" || ! -x "${vite}" ]]; then
  echo "vinext or vite is unavailable. Restore locked dependencies with npm ci before building." >&2
  exit 69
fi

echo "Building the governed Encounter Cards v46 browser artifact..."
"${vite}" build --config "${SITES_PROJECT_ROOT}/vite.encounter.config.ts"
node "${script_dir}/finalize-encounter.mjs"

if command -v timeout >/dev/null; then
  echo "Running bounded vinext build..."
  timeout \
    --signal=TERM \
    --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
    "${SITES_BUILD_TIMEOUT:-3m}" \
    "${vinext}" build
else
  echo "GNU timeout is unavailable; running vinext build without the optional outer time limit."
  "${vinext}" build
fi

"${script_dir}/validate-artifact.sh"
