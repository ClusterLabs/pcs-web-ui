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

# Export node_modules location for js files. E.g. webpack-minify-css.js etc.
export NODE_PATH="$node_modules"

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
template_ico=$(structure template ico)

out_js=$(structure output js)
out_css=$(structure output css)
out_media=$(structure output media)
out_main=$(structure output main)
out_marks=$(structure output marks)

# Webpack compiles assets for all apps
# ------------------------------------------------------------------------------
mkdir -p "$output_dir"
rm -rf "${output_dir:?}/"*

echo "Starting build"
webpack_output_dir="$output_dir"/webpack-output
mkdir -p "$webpack_output_dir"
node "$exec"/webpack.js \
  "$src_dir" \
  "$webpack_output_dir" \
  "$out_js" \
  "$out_css" \
  "$out_media" \
  "$out_main"

node "$exec"/webpack-minify-css.js \
  "$(ls "$webpack_output_dir"/"$out_css"/"$out_main".*.css)"

# measure sizes of compiled assets
find "$webpack_output_dir" -type f \
    -not -path "$webpack_output_dir/$out_media/*" \
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
  cp -r "${template_dir:?}/"* "$_app_dir"
  # Dirs/files copied from src_dir (i.e. template_dir) can be readonly (e.g.
  # when `make distcheck`).
  chmod --recursive ug+w "$_app_dir"

  # Copy compiled assets
  cp -r "${webpack_output_dir:?}/"* "$_app_dir"
}

app_link() {
  _build_dir=$1
  _path_prefix=$2
  make_asset() {
    _path=$1
    _ext=$2

    echo "/$_path/$(basename "$(ls "$_build_dir/$_path/$out_main".*"$_ext")")"
  }
  # Inject compiled assets
  # --------------------------------------------------------------------------
  # There is a tag <script src="static/js/main.js"></script> in index.html.
  # This function:
  # * append link to built css after the tag
  # * change source of the tag to built javascript

  # Find script tag by src attribute.
  script_src=$(echo "src=\"/$out_js/$out_main.js\"" | sed 's#/#\\/#g')

  # Append css link.
  css_link="<link href=\"$(make_asset "$out_css" .css)\" rel=\"stylesheet\">"
  sed --in-place \
    "/$script_src/a \    $css_link" \
    "$_build_dir"/"$template_index"

  # Set correct correct src.
  sed --in-place \
    "s#$script_src#src=\"$(make_asset "$out_js" .js)\"#" \
    "$_build_dir"/"$template_index"

  # Fix assets path
  # --------------------------------------------------------------------------
  # All assets in index.html uses absolute path. The index.html is also used by
  # development server which needs absolute paths. There is no copy/edit phase
  # in development server, so it is done here.
  # Here is the absolute path prefixed according to pcsd url namespace for
  # webui.
  # WARNING: Don't use relative path. It works well in dashboard but in the
  # cluster detail the resulting url contains word "cluster" inside, so instead
  # of "/ui/static/..." we get "/ui/cluster/static" and asset loading fails.
  # see: https://bugzilla.redhat.com/show_bug.cgi?id=2222788
  paths="$out_js|$out_css|$template_manifest|$template_ico"
  sed --regexp-extended --in-place \
    "s#(src|href)=\"/($paths)#\1=\"$_path_prefix/\2#" \
    "$_build_dir"/"$template_index"

  # Minimize adapter
  # --------------------------------------------------------------------------
  "$node_modules"/.bin/terser "$_build_dir"/"$template_adapter" \
    --compress ecma=5,warnings=false,comparisons=false,inline=2 \
    --output "$_build_dir"/"$template_adapter"

  # Build marks
  # --------------------------------------------------------------------------
  node "$exec"/app-merge-test-marks.js "$app_marks" > "$_build_dir"/"$out_marks"
}

# Make standalone application from webpack output
# ------------------------------------------------------------------------------
standalone_dir="$output_dir"/for-standalone
app_dir_init "$standalone_dir"
rm "$standalone_dir"/"$template_adapter_cockpit"
rm "$standalone_dir"/"$template_manifest_cockpit"
app_link "$standalone_dir" "/ui"
echo "Build prepared: ${standalone_dir}."

# Make cockpit application from webpack output
# ------------------------------------------------------------------------------
cockpit_dir="$output_dir"/for-cockpit
app_dir_init "$cockpit_dir"
sed --in-place \
  '/<script.*adapter/i \    <script src="../base1/cockpit.js"></script>' \
  "$cockpit_dir"/"$template_index"
sed --in-place \
  "s#^var pcsdSocket = \".*\";#var pcsdSocket = \"$pcsd_unix_socket\";#" \
  "$cockpit_dir"/"$template_adapter_cockpit"
mv \
  "$cockpit_dir"/"$template_adapter_cockpit" \
  "$cockpit_dir"/"$template_adapter"
mv \
  "$cockpit_dir"/"$template_manifest_cockpit" \
  "$cockpit_dir"/"$template_manifest"
app_link "$cockpit_dir" "."
echo "Build prepared: ${cockpit_dir}."
