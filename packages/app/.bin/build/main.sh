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

in_json="$exec"/in-json.sh

structure() {
  "$in_json" "$exec"/structure.json "$1"."$2"
}

# Source / output files structure
# ------------------------------------------------------------------------------
app_marks="$src_dir"/$(structure app marks)

template_dir=$src_dir/$(structure template dir)
template_index=$(structure template index)
template_adapter=$(structure template adapter)
template_adapter_cockpit=$(structure template adapterCockpit)
template_manifest=$(structure template manifest)
template_manifest_cockpit=$(structure template manifestCockpit)

out_media=$(structure output media)
out_marks=$(structure output marks)

# esbuild compiles assets for all apps
# ------------------------------------------------------------------------------
mkdir -p "$output_dir"
rm -rf "${output_dir:?}/"*

echo "Starting build"
build_output_dir="$output_dir"/build-output
mkdir -p "$build_output_dir"
node --no-warnings=ExperimentalWarning "$exec"/esbuild.js \
  "$src_dir" \
  "$node_modules" \
  "$build_output_dir"

# measure sizes of compiled assets
find "$build_output_dir" -type f \
    -not -path "$build_output_dir/$out_media/*" \
    -not -name "*.txt" \
    -not -name "*.map" |
  while read -r file; do
    size=$(gzip -c "$file" | wc -c)
    working_directory="$(pwd)"/

    if [ "${file#"$working_directory"}" != "$file" ]; then
      print_name="${file#"$working_directory"}"
    else
      print_name="$file"
    fi

    if [ "$size" -gt "$((512 * 1024))" ]; then
      echo "$print_name: $size !!! TOO BIG !!!"
    else
      echo "$print_name: $size"
    fi
  done
echo

# Make all applications
# ------------------------------------------------------------------------------
app_dir_init() {
  _app_dir=$1
  # Maybe app_dir does not exists.
  mkdir -p "$_app_dir"

  # Maybe there is an obsolete content.
  # Using :? will cause the command to fail if the variable is null or unset.
  # This prevents deleting everything in the system's root directory when
  # `build_dir/compile_dir` variable is empty.
  rm -rf "${_app_dir:?}/"*

  # Copy src "template" dir
  cp -rf "${template_dir:?}/"* "$_app_dir"
  # Dirs/files copied from src_dir (i.e. template_dir) can be readonly (e.g.
  # when `make distcheck`).
  chmod --recursive ug+w "$_app_dir"

  # Copy compiled assets
  cp -rf "${build_output_dir:?}/"* "$_app_dir"
}

minimize_adapter() {
  _build_dir=$1

  "$node_modules"/.bin/esbuild "$_build_dir"/"$template_adapter" \
    --minify \
    --format=iife \
    --allow-overwrite \
    --log-level=error \
    --outfile="$_build_dir"/"$template_adapter"
}

build_marks() {
  _build_dir=$1
  node "$exec"/app-merge-test-marks.js "$app_marks" > "$_build_dir"/"$out_marks"
}

# Make standalone application from build output
# ------------------------------------------------------------------------------
standalone_dir="$output_dir"/for-standalone
app_dir_init "$standalone_dir"
rm -f "$standalone_dir"/"$template_adapter_cockpit"
rm -f "$standalone_dir"/"$template_manifest_cockpit"
node --no-warnings=ExperimentalWarning \
  "$exec"/fix_assets_in_index.js  "$standalone_dir" "/ui"
build_marks "$standalone_dir"
minimize_adapter "$standalone_dir"
echo "Build prepared: ${standalone_dir}."

# Make cockpit application from build output
# ------------------------------------------------------------------------------
cockpit_dir="$output_dir"/for-cockpit
app_dir_init "$cockpit_dir"
sed --in-place \
  '/<script.*adapter/i \    <script src="../base1/cockpit.js"></script>' \
  "$cockpit_dir"/"$template_index"
sed --in-place \
  "s#^var pcsdSocket = \".*\";#var pcsdSocket = \"$pcsd_unix_socket\";#" \
  "$cockpit_dir"/"$template_adapter_cockpit"
mv -f \
  "$cockpit_dir"/"$template_adapter_cockpit" \
  "$cockpit_dir"/"$template_adapter"
mv -f \
  "$cockpit_dir"/"$template_manifest_cockpit" \
  "$cockpit_dir"/"$template_manifest"
node  --no-warnings=ExperimentalWarning \
  "$exec"/fix_assets_in_index.js "$cockpit_dir" "."
build_marks "$cockpit_dir"
minimize_adapter "$cockpit_dir"
echo "Build prepared: ${cockpit_dir}."
