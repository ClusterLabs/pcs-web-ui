#!/bin/sh

# shellcheck source=.bin/config.sh
. "$(dirname "$0")/../config.sh"

# All registry occurrences in package-lock.json files to standard npm paths.
for npm_dir in $NPM_DIRS; do
  lock_file=$npm_dir/package-lock.json

  # Strip trailing slash from detected registry so that the replacement
  # does not eat the path separator in resolved URLs
  # (e.g. "https://registry.npmjs.org/" -> "https://registry.npmjs.org").
  current_registry=$(npm config get registry --prefix "$npm_dir" | sed 's#/$##')

  sed -i \
    "s#$current_registry#$STD_NPM_REGISTRY#g" \
    "$lock_file"
  git add "$lock_file"
done
