#!/bin/sh

registry=$1
cafile=$2

. "$(dirname "$0")/config.sh"

for npm_dir in $NPM_DIRS; do
  "$(dirname "$0")"/set_npm_registry.sh "$npm_dir"/.npmrc "$registry" "$cafile"
done
