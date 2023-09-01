#!/bin/sh

bin="$(dirname "$0")"

# load scripts: get_path
# shellcheck source=./tools.sh
. "$bin"/tools.sh
# shellcheck source=./get-build-sizes.sh
. "$bin"/get-build-sizes.sh

prepare_build_dir() {
  build_dir=$1
  public_dir=$2

  mkdir -p "$build_dir"
  # Using :? will cause the command to fail if the variable is null or unset.
  # This prevents deleting everything in the system's root directory when
  # `build_dir` variable is empty.
  rm -rf "${build_dir:?}/"*
  cp -r "${public_dir:?}/"* "$build_dir"
}

inject_built_assets() {
  # There is a tag <script src="static/js/main.js"></script> in index.html.
  # This function:
  # * append link to built css after the tag
  # * change source of the tag to built javascript
  build_dir=$1
  html="$build_dir/$2"
  js_path=$3
  css_path=$4
  name=$5

  make_asset() {
    path=$1
    ext=$2

    echo "/$path/$(basename "$(ls "$build_dir/$path/$name".*"$ext")")"
  }

  # Find script tag by src attribute.
  script_src=$(echo "src=\"/$js_path/$name.js\"" | sed 's#/#\\/#g')

  # Append css link.
  css_link="<link href=\"$(make_asset "$css_path" .css)\" rel=\"stylesheet\">"
  sed --in-place "/$script_src/a \    $css_link" "$html"

  # Set correct correct src.
  sed --in-place "s#$script_src#src=\"$(make_asset "$js_path" .js)\"#" "$html"
}

fix_asset_paths() {
  # All assets in index.html uses absolute path. The index.html is also used by
  # development server which needs absolute paths. There is no copy/edit phase
  # in development server, so it is done here.
  # Here is the absolute path prefixed according to pcsd url namespace for
  # webui.
  # WARNING: Don't use relative path. It works well in dashboard but in the
  # cluster detail the resulting url contains word "cluster" inside, so instead
  # of "/ui/static/..." we get "/ui/cluster/static" and asset loading fails.
  # see: https://bugzilla.redhat.com/show_bug.cgi?id=2222788
  html=$1
  path_prefix=$2
  js_path="$3/"
  css_path="$4/"
  manifest=$5
  ico=$6

  paths="$js_path|$css_path|$manifest|$ico"
  sed --regexp-extended --in-place \
    "s#(src|href)=\"/($paths)#\1=\"$path_prefix/\2#" \
    "$html"
}

minimize_adapter() {
  adapter_path=$1

  npx terser "$adapter_path" \
    --compress ecma=5,warnings=false,comparisons=false,inline=2 \
    --output "$adapter_path"
}

adapt_for_environment() {
  for_cockpit=$1
  build_dir=$2
  html="$build_dir/$3"
  manifest="$build_dir/$4"
  manifest_cockpit="$build_dir/$5"
  adapter="$build_dir/$6"
  adapter_cockpit="$build_dir/$7"
  pcsd_socket=$8

  if [ "$for_cockpit" = "true" ]; then
    echo "Adapting for usage inside cockpit."

    mv "$manifest_cockpit" "$manifest"

    sed --in-place \
      "s#^var pcsdSocket = \".*\";#var pcsdSocket = \"$pcsd_socket\";#" \
      "$adapter_cockpit"
    mv "$adapter_cockpit" "$adapter"

    sed --in-place \
      '/<script.*adapter/i \    <script src="../base1/cockpit.js"></script>' \
      "$html"
  else
    echo "Adapting for standalone usage."
    rm "$adapter_cockpit"
    rm "$manifest_cockpit"
  fi
}

# Expression `eval echo $dir` is there to expand any `~` character.
project_dir=$(realpath "$(eval echo "${1:-"$(pwd)"}")")
use_current_node_modules=${BUILD_USE_CURRENT_NODE_MODULES:-"false"}
url_prefix=${PCSD_BUILD_URL_PREFIX:-"/ui"}
node_modules=$(get_path "appNodeModules")
export BUILD_DIR="${BUILD_DIR:-"$project_dir"/build}"

if [ "$use_current_node_modules" = "true" ] && [ ! -d "$node_modules" ]; then
  echo "Current node modules should be used but directory $node_modules does" \
    "not exist"
  exit 1
fi

echo "Starting build"

if [ "$use_current_node_modules" != "true" ]; then
  "$bin"/modules-prepare.sh "$node_modules"
fi

echo "Node modules prepared: ${node_modules}."

prepare_build_dir "$BUILD_DIR" "$(get_path "appPublic")"

echo "Build dir prepared: ${BUILD_DIR}."
echo "Going to build assets."

node "$bin"/build.js

echo "Assets compiled."

inject_built_assets "$BUILD_DIR" index.html static/js static/css main

echo "Compiled assets injected to html page."

adapt_for_environment \
  "${BUILD_FOR_COCKPIT:-"false"}" \
  "$BUILD_DIR" \
  index.html \
  manifest.json \
  manifestCockpit.json \
  static/js/adapter.js \
  static/js/adapterCockpit.js \
  "${PCSD_UINIX_SOCKET:-"/var/run/pcsd.socket"}"

echo "Adapted for environment"

fix_asset_paths "$BUILD_DIR"/index.html "$url_prefix" \
  static/js \
  static/css \
  manifest.json \
  static/media/favicon.png

echo "Prefixed asset paths: '${url_prefix}'."

minimize_adapter "$BUILD_DIR"/static/js/adapter.js

echo "Environment adapter minimized"

node "$bin"/merge-test-marks.js \
  "$(realpath "$bin"/../src/app/view/dataTest/json)" \
  > "$BUILD_DIR"/manifest_test_marks.json

echo "Marks prepared"

if [ "$use_current_node_modules" != "true" ]; then
  "$bin"/modules-restore.sh "$node_modules"
fi

printf "\n%s\n" "$(print_bundle_sizes "$BUILD_DIR")"
