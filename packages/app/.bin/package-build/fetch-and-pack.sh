#!/bin/sh

set -e

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <package_dir> <app_relative_path> <archive_path>" >&2
  echo "Example: $0 packages/app ./pcs-web-ui-node-modules-1.1.tar.xz" >&2
  exit 1
fi

exec="$(dirname "$0")"
package_dir=$(realpath "$1")
app_relative_path=$(realpath "$1")
archive_path=$(realpath "$3")

package="$package_dir"/package.json
package_build="$package_dir"/"$("$exec"/fname.sh)"
package_build_lock="$package_dir"/"$("$exec"/fname.sh -l)"
npmrc="$package_dir"/.npmrc

if ! "$exec"/check-package.sh "$package_dir" > /dev/null; then
  echo It seems that difference between "$package" and "$package_build" is not \
    just eslint. Please regenerate "$package_build" by running \
    '"make generate-package-build"'
  exit 1
fi

if ! "$exec"/check-lock.sh "$package_dir" > /dev/null; then
  echo It seems that "$package_build_lock" does not match "$package_build" \
    Please regenerate it by running '"make generate-package-build"'
  exit 1
fi

temp_dir=$(mktemp -d)
# We need to keep the same relative path to node_modules as from pcs-web-ui root
# directory. So, the subdirs are created, node_modules are fetched inside the
# subdirs and tar is done from temp dir. The result archive is placed where the
# caller of this script specified.
temp_app_dir="$temp_dir"/"$app_relative_path"
mkdir -p "$temp_app_dir"

cp "$package_build" "$temp_app_dir"/package.json
cp "$package_build_lock" "$temp_app_dir"/package-lock.json
if [ -f "$npmrc" ]; then
  cp "$npmrc" "$temp_app_dir"/.npmrc
fi

npm ci --prefix="$temp_app_dir"

tar --create --xz \
  --file "$archive_path" \
  --directory "$temp_dir" \
  "$(realpath --relative-to="$temp_dir" "$temp_app_dir"/node_modules)"

rm -rf "$temp_dir"
