#!/bin/sh

set -e

build_dir=$1
out_js=$2

rm "$build_dir"/"$out_js"/adapterCockpit.js
rm "$build_dir"/manifestCockpit.json
