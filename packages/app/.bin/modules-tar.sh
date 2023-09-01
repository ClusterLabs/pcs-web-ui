#!/bin/sh

bin="$(dirname "$0")"

node_modules=$1
project_dir=$(realpath "$(eval echo "${2:-"$(pwd)"}")")

last_commit_mark=$("$bin"/last-commit-mark.sh)
archive_name="$project_dir"/pcs-web-ui-node-modules-"$last_commit_mark".tar.xz

echo "Packing modules into: $archive_name..."

tar --create --xz \
  --file "$archive_name" \
  --directory "$project_dir" \
  "$(realpath --relative-to="$project_dir" "$node_modules")"
