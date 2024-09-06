#!/bin/sh

set -e

build_dir=$1
out_js=$2
out_html=$3
pcsd_socket=$4

html="$build_dir"/"$out_html"

mv "$build_dir"/manifestCockpit.json "$build_dir"/manifest.json

sed --in-place \
  "s#^var pcsdSocket = \".*\";#var pcsdSocket = \"$pcsd_socket\";#" \
  "$build_dir"/"$out_js"/adapterCockpit.js

mv "$build_dir"/"$out_js"/adapterCockpit.js "$build_dir"/"$out_js"/adapter.js

sed --in-place \
  '/<script.*adapter/i \    <script src="../base1/cockpit.js"></script>' "$html"
