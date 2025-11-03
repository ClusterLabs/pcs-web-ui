#!/bin/sh

# shellcheck source=.bin/config.sh
. "$(dirname "$0")/../config.sh"

# Change all registry occurrences in package-lock.json files to standard npm paths.
fix_lock() {
  lock_dir=$1
  lock_file=$lock_dir/package-lock.json

  sed -i \
    "s#$(npm config get registry --prefix "$lock_dir")#$STD_NPM_REGISTRY#g" \
    "$lock_file"
  git add "$lock_file"
}

for lockDir in \
  "./" \
  "./packages/app" \
  "./packages/dev" \
  "./packages/test"; do

  fix_lock "$lockDir"
done
