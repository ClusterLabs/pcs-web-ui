#!/bin/sh

set -e

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 src_dir node_modules output_dir" >&2
  exit 1
fi

exec="$(dirname "$0")"
src_dir=$(realpath "$1")
node_modules=$(realpath "$2")
output_dir=$(realpath "$3")

export NODE_PATH="$node_modules"

# Sources structure (multiple parts needs to agree on this)
# ------------------------------------------------------------------------------
app_index_js="$src_dir"/src/index.tsx
app_ts_config_paths_context=$src_dir
app_ts_config="$src_dir"/tsconfig.json
app_src="$src_dir"/src
app_public="$src_dir"/public

# Output structure (multiple parts needs to agree on this)
# ------------------------------------------------------------------------------
out_js="static/js"
out_css="static/css"
out_media="static/media"
out_main="main"

# Dev server will be started on this HOST and PORT
export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-3000}"
# Dev server proxifies backend requests to PCSD_DEV_BACKEND.
export PCSD_DEV_BACKEND="${PCSD_DEV_BACKEND:-http://localhost:5000}"
# Dev server uses ALLOWED_HOST for preventing remotes to access local content.
# The logic (originally js using npm module "address") is extracted from CRA.
export ALLOWED_HOST="${ALLOWED_HOST:-$(ip addr show |
  grep 'inet ' |
  grep -vE 'inet 127' |
  head -n1 |
  awk '{print $2}' |
  sed 's|/.*||')}"

if lsof -i :"$PORT" > /dev/null; then
  printf "Port %s is occupied.\n\n" "$PORT"
  lsof -i :"$PORT"
  exit 1
fi

BUILD_DIR=$(realpath "$(dirname "$0")"/../build)
export BUILD_DIR

webpack_output_dir="$output_dir"/webpack-output
node "$exec"/start.js \
  "$app_public" \
  "$app_index_js" \
  "$app_src" \
  "$app_ts_config" \
  "$app_ts_config_paths_context" \
  "$webpack_output_dir" \
  "$out_js" \
  "$out_css" \
  "$out_media" \
  "$out_main"
