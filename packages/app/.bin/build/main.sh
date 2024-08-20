#!/bin/sh

set -e
exec="$(dirname "$0")"

src_dir=$(realpath "$(eval echo "${1:-"$(realpath "$exec"/..)"}")")
"$exec"/src-check.sh "$src_dir"

node_modules=$(realpath "$(eval echo "${2}")")
# export node_modules location for js files
export NODE_PATH="$node_modules"

output_dir=$(realpath "$(eval echo "${3:-"$(pwd)"/build}")")

pcsd_unix_socket="${4:-"/var/run/pcsd.socket"}"

mkdir -p "$output_dir"
rm -rf "${output_dir:?}/"*

echo "Starting build"
webpack_out_dir="$output_dir"/webpack-output
"$exec"/assets-compile.sh "$src_dir" "$webpack_out_dir"
"$exec"/assets-sizes.sh "$webpack_out_dir"
echo

standalone_dir="$output_dir"/for-pcsd
mkdir -p "$standalone_dir"
"$exec"/build-dir-prepare.sh "$src_dir" "$webpack_out_dir" "$standalone_dir"
"$exec"/adapter-standalone.sh "$standalone_dir"
"$exec"/link.sh "$src_dir" "$node_modules" "$standalone_dir" "/ui"
echo "Build prepared: ${standalone_dir}."

cockpit_dir="$output_dir"/for-cockpit
mkdir -p "$cockpit_dir"
"$exec"/build-dir-prepare.sh "$src_dir" "$webpack_out_dir" "$cockpit_dir"
"$exec"/adapter-cockpit.sh "$cockpit_dir" "$pcsd_unix_socket"
"$exec"/link.sh "$src_dir" "$node_modules" "$cockpit_dir" "."
echo "Build prepared: ${cockpit_dir}."
