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
pcsd_unix_socket="${4:-"/var/run/pcsd.socket"}"

# Export node_modules location for js files. E.g. webpack-minify-css.js etc.
export NODE_PATH="$node_modules"

# Sources structure
# ------------------------------------------------------------------------------
app_html="$src_dir"/public/index.html
app_index_js="$src_dir"/src/index.tsx
app_ts_config_paths_context=$src_dir
app_ts_config="$src_dir"/tsconfig.json
app_src="$src_dir"/src
app_public="$src_dir"/public

# Check sources assumptions
# ------------------------------------------------------------------------------
# If assumptions are not met, build and dev server fails even so. But it can
# be harder to realize where the root cause is.
for f in $app_html $app_index_js; do
  if [ ! -f "$f" ]; then
    echo "Could not find required file: '$f'"
    exit 1
  fi
done

ts_base_url="$src_dir"/$(
  node --print --eval="JSON.parse(process.argv[1]).compilerOptions.baseUrl" \
    "$(cat "$app_ts_config")"
)
if [ "$ts_base_url" != "$app_src" ]; then
  echo "baseUrl in .tsconfig should be the same as app_src in main.sh."
  echo "(But they are: $ts_base_url vs $app_src)"
  echo "In other words, typescript and webpack should work with the same dir."
  echo "Please, check it especialy in webpack.config.js."
  echo "(Look at the sections resolve.module and resolve.alias)"
  echo "If this check is not appropriate anymore you can change it."
  exit 1
fi

# Main build
# ------------------------------------------------------------------------------
mkdir -p "$output_dir"
rm -rf "${output_dir:?}/"*

echo "Starting build"
webpack_output_dir="$output_dir"/webpack-output
mkdir -p "$webpack_output_dir"
node "$exec"/webpack.js \
  "$app_index_js" \
  "$app_src" \
  "$app_ts_config" \
  "$app_ts_config_paths_context" \
  "$webpack_output_dir"
"$exec"/webpack-sizes.sh "$webpack_output_dir"
echo

standalone_dir="$output_dir"/for-standalone
"$exec"/app-dir-init.sh "$app_public" "$webpack_output_dir" "$standalone_dir"
"$exec"/app-adapt-standalone.sh "$standalone_dir"
"$exec"/app-link.sh "$src_dir" "$node_modules" "$standalone_dir" "/ui"
echo "Build prepared: ${standalone_dir}."

cockpit_dir="$output_dir"/for-cockpit
"$exec"/app-dir-init.sh "$app_public" "$webpack_output_dir" "$cockpit_dir"
"$exec"/app-adapt-cockpit.sh "$cockpit_dir" "$pcsd_unix_socket"
"$exec"/app-link.sh "$src_dir" "$node_modules" "$cockpit_dir" "."
echo "Build prepared: ${cockpit_dir}."
