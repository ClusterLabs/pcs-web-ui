#!/bin/sh

set -e

build_dir=$1
pcsd_socket=$2

mv "$build_dir"/manifestCockpit.json "$build_dir"/manifest.json

sed --in-place \
  "s#^var pcsdSocket = \".*\";#var pcsdSocket = \"$pcsd_socket\";#" \
  "$build_dir"/static/js/adapterCockpit.js

mv "$build_dir"/static/js/adapterCockpit.js "$build_dir"/static/js/adapter.js

sed --in-place \
  '/<script.*adapter/i \    <script src="../base1/cockpit.js"></script>' \
  "$build_dir"/index.html
