#!/bin/sh

set -e
exec="$(dirname "$0")"

# load scripts: get_path
# shellcheck source=./tools.sh
. "$exec"/tools.sh

src_dir=$1/"$(get_path "appPublic")"
compiled_assets_dir=$2
build_dir=$3

# Using :? will cause the command to fail if the variable is null or unset.
# This prevents deleting everything in the system's root directory when
# `build_dir/compile_dir` variable is empty.
rm -rf "${build_dir:?}/"*
cp -r "${src_dir:?}/"* "$build_dir"
cp -r "${compiled_assets_dir:?}/"* "$build_dir"

# dirs/files copied from src_dir can be readonly (e.g. when `make distcheck`)
chmod --recursive ug+w "$build_dir"
