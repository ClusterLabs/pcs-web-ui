#!/bin/sh

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <packages.json>" >&2
  echo "Example: $0 packages/app/package.json" >&2
  exit 1
fi

package=$(realpath "$(eval echo "${1}")")

dest="$(dirname "$package")"
bin="$(dirname "$0")"

package_build="$dest"/"$("$bin"/package-build-fname.sh)"
package_build_lock="$dest"/"$("$bin"/package-build-fname.sh -l)"
npmrc="$dest"/.npmrc
build_hash="$(dirname "$package")"/.build.hash

generate_hash() {
  ( 
    sha256sum "$package_build" | cut -d ' ' -f 1 &&
      sha256sum "$package_build_lock" | cut -d ' ' -f 1
  ) | tr -d '\n'
}

touch "$package_build"
touch "$package_build_lock"

if ! "$bin"/package-build-check.sh "$package" "$package_build" > /dev/null; then
  echo Regenerating "$package_build"

  node "$bin"/package-build-remove-eslint.js "$package" > "$package_build"
fi

if [ "$(cat "$build_hash")" != "$(generate_hash)" ]; then
  echo Regenerating "$package_build_lock"

  temp_dir=$(mktemp -d)
  cp "$package_build" "$temp_dir"/package.json
  if [ -f "$npmrc" ]; then
    cp "$npmrc" "$temp_dir"/.npmrc
  fi
  # Copy package-lock.json to keep it in sync with the non-build versions.
  # Npm resolving mechanism takes package-lock.json into account.
  # https://github.com/npm/npm/issues/17979#issuecomment-332701215
  cp "$dest"/package-lock.json "$temp_dir"/package-lock.json
  npm install --prefix="$temp_dir"
  cp "$temp_dir"/package-lock.json "$package_build_lock"
  rm -rf "$temp_dir"
  generate_hash > "$build_hash"
fi
