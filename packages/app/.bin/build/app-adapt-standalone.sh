#!/bin/sh

set -e

build_dir=$1

rm "$build_dir"/static/js/adapterCockpit.js
rm "$build_dir"/manifestCockpit.json
