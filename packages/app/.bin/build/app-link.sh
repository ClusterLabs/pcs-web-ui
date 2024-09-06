#!/bin/sh

set -e

src_dir=$1
node_modules=$2
build_dir=$3
out_js=$4
out_css=$5
out_media=$6
out_main=$7
out_html=$8
path_prefix=$9

exec="$(dirname "$0")"

html="$build_dir"/"$out_html"
manifest=manifest.json
ico="$out_media"/favicon.png

adapter="$build_dir"/static/js/adapter.js
marks_src="$src_dir"/src/app/view/dataTest/json
marks_build="$build_dir"/manifest_test_marks.json

make_asset() {
  _path=$1
  _ext=$2

  echo "/$_path/$(basename "$(ls "$build_dir/$_path/$out_main".*"$_ext")")"
}

# > Inject compiled assets
# ------------------------------------------------------------------------------
# There is a tag <script src="static/js/main.js"></script> in index.html.
# This function:
# * append link to built css after the tag
# * change source of the tag to built javascript

# Find script tag by src attribute.
script_src=$(echo "src=\"/$out_js/$out_main.js\"" | sed 's#/#\\/#g')

# Append css link.
css_link="<link href=\"$(make_asset "$out_css" .css)\" rel=\"stylesheet\">"
sed --in-place "/$script_src/a \    $css_link" "$html"

# Set correct correct src.
sed --in-place "s#$script_src#src=\"$(make_asset "$out_js" .js)\"#" "$html"

# Fix assets path
# ------------------------------------------------------------------------------
# All assets in index.html uses absolute path. The index.html is also used by
# development server which needs absolute paths. There is no copy/edit phase
# in development server, so it is done here.
# Here is the absolute path prefixed according to pcsd url namespace for
# webui.
# WARNING: Don't use relative path. It works well in dashboard but in the
# cluster detail the resulting url contains word "cluster" inside, so instead
# of "/ui/static/..." we get "/ui/cluster/static" and asset loading fails.
# see: https://bugzilla.redhat.com/show_bug.cgi?id=2222788
paths="$out_js|$out_css|$manifest|$ico"
sed --regexp-extended --in-place \
  "s#(src|href)=\"/($paths)#\1=\"$path_prefix/\2#" \
  "$html"

# Minimize adapter
# ------------------------------------------------------------------------------
"$node_modules"/.bin/terser "$adapter" \
  --compress ecma=5,warnings=false,comparisons=false,inline=2 \
  --output "$adapter"

# Build marks
# ------------------------------------------------------------------------------
node "$exec"/app-merge-test-marks.js "$marks_src" > "$marks_build"
