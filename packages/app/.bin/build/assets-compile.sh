#!/bin/sh

set -e
exec="$(dirname "$0")"

src_dir=$1
build_dir=$2

mkdir -p "$build_dir"
node "$exec"/build.js "$src_dir" "$build_dir"
node "$exec"/minify-css.js "$(ls "$build_dir"/static/css/main.*.css)"
