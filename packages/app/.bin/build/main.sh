#!/bin/sh

set -e

if [ "$#" -ne 3 ] && [ "$#" -ne 4 ]; then
  echo "Usage: $0 src_dir node_modules output_dir [pcsd_unix_socket]" >&2
  exit 1
fi

exec="$(dirname "$0")"

src_dir=$(realpath "$1")
node_modules=$(realpath "$2")
output_dir=$(realpath "$3")

# Export node_modules location for js files. Not only webpack.js but also
# minify-css.js etc.
export NODE_PATH="$node_modules"
"$exec"/src-check.sh "$src_dir"

pcsd_unix_socket="${4:-"/var/run/pcsd.socket"}"

mkdir -p "$output_dir"
rm -rf "${output_dir:?}/"*

echo "Starting build"
webpack_output_dir="$output_dir"/webpack-output
"$exec"/webpack-compile.sh "$src_dir" "$webpack_output_dir"
echo

standalone_dir="$output_dir"/for-standalone
"$exec"/app-dir-init.sh "$src_dir" "$webpack_output_dir" "$standalone_dir"
"$exec"/app-adapt-standalone.sh "$standalone_dir"
"$exec"/app-link.sh "$src_dir" "$node_modules" "$standalone_dir" "/ui"
echo "Build prepared: ${standalone_dir}."

cockpit_dir="$output_dir"/for-cockpit
"$exec"/app-dir-init.sh "$src_dir" "$webpack_output_dir" "$cockpit_dir"
"$exec"/app-adapt-cockpit.sh "$cockpit_dir" "$pcsd_unix_socket"
"$exec"/app-link.sh "$src_dir" "$node_modules" "$cockpit_dir" "."
echo "Build prepared: ${cockpit_dir}."
