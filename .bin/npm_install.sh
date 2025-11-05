#!/bin/sh

. "$(dirname "$0")/config.sh"

for npm_dir in $NPM_DIRS; do
  printf "%s\n" "----- $npm_dir -----"
  npm --prefix="$npm_dir" install
  printf "\n\n"
done
