#!/bin/sh

for lockDir in \
  "./" \
  "./packages/app" \
  "./packages/dev" \
  "./packages/dev-backend" \
  "./packages/test"; do

  lock="$lockDir"/package-lock.json
  sed -i "s#repository.engineering.redhat.com/nexus/repository/##g" "$lock"
  git add "$lock"
done
