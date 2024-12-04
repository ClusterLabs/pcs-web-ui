#!/bin/sh

set -e

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 src_dir node_modules output_dir" >&2
  exit 1
fi

exec="$(dirname "$0")"

build_system="$(realpath "$exec"/../../app/.bin/build)"
in_json="$build_system"/in-json.sh

src_dir=$(realpath "$1")
node_modules=$(realpath "$2")
output_dir=$(realpath "$3")

export NODE_PATH="$node_modules"

structure() {
  "$in_json" "$build_system"/structure.json "$1"."$2"
}

# Source / output files structure
# ------------------------------------------------------------------------------
template_dir=$src_dir/$(structure template dir)

out_js=$(structure output js)
out_css=$(structure output css)
out_media=$(structure output media)
out_main=$(structure output main)

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

webpack_output_dir="$output_dir"/webpack-output
node "$exec"/start.js \
  "$template_dir" \
  "$src_dir" \
  "$webpack_output_dir" \
  "$out_js" \
  "$out_css" \
  "$out_media" \
  "$out_main"
