#!/bin/sh

# shellcheck source=.bin/config.sh
. "$(dirname "$0")/../config.sh"

# All registry occurrences in package-lock.json files to standard npm paths.
for npm_dir in $NPM_DIRS; do
  lock_file=$npm_dir/package-lock.json

  sed -i \
    "s#$(npm config get registry --prefix "$npm_dir")#$STD_NPM_REGISTRY#g" \
    "$lock_file"
  git add "$lock_file"
done
