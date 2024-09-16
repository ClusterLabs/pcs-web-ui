#!/bin/sh

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <package_dir>" >&2
  echo "Example: $0 packages/app" >&2
  exit 1
fi

package_dir="$1"
bin="$(dirname "$0")"

package_build="$package_dir"/"$("$bin"/fname.sh)"
package_build_lock="$package_dir"/"$("$bin"/fname.sh -l)"

build_hash="$(dirname "$package_build")"/.build.hash

generate_hash() {
  "$bin"/generate-hash.sh "$package_dir"
}

if [ "$(cat "$build_hash")" != "$(generate_hash)" ]; then
  echo Files not match: "$package_build" "$package_build_lock" "$build_hash"
  exit 1
fi

exit 0
