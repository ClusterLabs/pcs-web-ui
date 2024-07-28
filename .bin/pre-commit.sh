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

# Deal with reduced packages (for building process).
app=packages/app
bin="$app"/.bin

packages_build="$app"/$("$bin"/package-build-fname.sh)
packages_build_lock="$app"/$("$bin"/package-build-fname.sh -l)

"$bin"/package-build-gen.sh "$app"/package.json
git add "$packages_build" "$packages_build_lock"

fix_lock "$packages_build_lock"
