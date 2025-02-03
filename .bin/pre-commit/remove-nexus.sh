#!/bin/sh

# Change all nexus occurrences in package-lock.json files to standard npm paths.
fix_lock() {
  lock_file=$1

  sed -i "s#repository.engineering.redhat.com/nexus/repository/##g" "$lock_file"
  git add "$lock_file"
}

for lockDir in \
  "./" \
  "./packages/app" \
  "./packages/dev" \
  "./packages/dev-backend" \
  "./packages/test"; do

  fix_lock "$lockDir"/package-lock.json
done
