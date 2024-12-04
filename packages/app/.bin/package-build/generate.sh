#!/bin/sh

set -e

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <package_dir>" >&2
  echo "Example: $0 packages/app" >&2
  exit 1
fi

exec="$(dirname "$0")"
package_dir=$(realpath "$1")

package="$package_dir"/package.json
package_lock="$package_dir"/package-lock.json
package_build="$package_dir"/"$("$exec"/fname.sh)"
package_build_lock="$package_dir"/"$("$exec"/fname.sh -l)"
npmrc="$package_dir"/.npmrc
build_hash="$(dirname "$package")"/.build.hash

touch "$package_build"
touch "$package_build_lock"

if ! "$exec"/check-package.sh "$package_dir" > /dev/null; then
  echo Regenerating "$package_build"

  node "$exec"/remove-eslint.js "$package" > "$package_build"
fi

if ! "$exec"/check-lock.sh "$package_dir" > /dev/null; then
  echo Regenerating "$package_build_lock"

  temp_dir=$(mktemp -d)
  cp "$package_build" "$temp_dir"/package.json
  if [ -f "$npmrc" ]; then
    cp "$npmrc" "$temp_dir"/.npmrc
  fi
  # Copy package-lock.json to keep it in sync with the non-build versions.
  # Npm resolving mechanism takes package-lock.json into account.
  # https://github.com/npm/npm/issues/17979#issuecomment-332701215
  cp "$package_lock" "$temp_dir"/package-lock.json
  npm install --prefix="$temp_dir"
  cp "$temp_dir"/package-lock.json "$package_build_lock"
  rm -rf "$temp_dir"
  "$exec"/generate-hash.sh "$package_dir" > "$build_hash"
fi
