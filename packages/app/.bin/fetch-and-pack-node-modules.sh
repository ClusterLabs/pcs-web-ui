#!/bin/sh

set -e

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <package_dir> <app_relative_path> <archive_path>" >&2
  echo "Example: $0 packages/app ./pcs-web-ui-node-modules-1.1.tar.xz" >&2
  exit 1
fi

package_dir=$(realpath "$1")
app_relative_path="$2"
archive_path=$(realpath "$3")

package="$package_dir"/package.json
package_lock="$package_dir"/package-lock.json
npmrc="$package_dir"/.npmrc

temp_dir=$(mktemp -d)
# We need to keep the same relative path to node_modules as from pcs-web-ui root
# directory. So, the subdirs are created, node_modules are fetched inside the
# subdirs and tar is done from the "root" temp dir. The result archive is
# placed where the caller of this script specified.
temp_app_dir="$temp_dir"/"$app_relative_path"
mkdir -p "$temp_app_dir"
node_modules="$temp_app_dir"/node_modules

cp "$package" "$temp_app_dir"/package.json
cp "$package_lock" "$temp_app_dir"/package-lock.json
if [ -f "$npmrc" ]; then
  cp "$npmrc" "$temp_app_dir"/.npmrc
fi

# Fetch node_modules.
echo Fetching node_modules:
npm ci --prefix="$temp_app_dir"

echo
echo Packing node_modules to "$archive_path":
tar --create --xz \
  --file "$archive_path" \
  --directory "$temp_dir" \
  "$(realpath --relative-to="$temp_dir" "$node_modules")"

rm -rf "$temp_dir"
