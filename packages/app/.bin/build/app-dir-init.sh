#!/bin/sh

set -e

template_dir=$1
webpack_output_dir=$2
app_dir=$3

# Maybe app_dir does not exists.
mkdir -p "$app_dir"

# Maybe there is an obsolete content.
# Using :? will cause the command to fail if the variable is null or unset.
# This prevents deleting everything in the system's root directory when
# `build_dir/compile_dir` variable is empty.
rm -rf "${app_dir:?}/"*

# Copy src "template" dir
cp -r "${template_dir:?}/"* "$app_dir"
# Dirs/files copied from src_dir (i.e. template_dir) can be readonly (e.g. when
# `make distcheck`).
chmod --recursive ug+w "$app_dir"

# Copy compiled assets
cp -r "${webpack_output_dir:?}/"* "$app_dir"
