#!/bin/sh

set -e

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <package_dir> <app_relative_path> <archive_path>" >&2
  echo "Example: $0 packages/app ./pcs-web-ui-node-modules-1.1.tar.xz" >&2
  exit 1
fi

exec="$(dirname "$0")"
package_dir=$(realpath "$1")
app_relative_path="$2"
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
# subdirs and tar is done from the "root" temp dir. The result archive is
# placed where the caller of this script specified.
temp_app_dir="$temp_dir"/"$app_relative_path"
mkdir -p "$temp_app_dir"
node_modules="$temp_app_dir"/node_modules

cp "$package_build" "$temp_app_dir"/package.json
cp "$package_build_lock" "$temp_app_dir"/package-lock.json
if [ -f "$npmrc" ]; then
  cp "$npmrc" "$temp_app_dir"/.npmrc
fi

# Fetch node_modules.
echo Fetching node_modules:
npm ci --prefix="$temp_app_dir"

echo \\nPatching node_modules:
files_to_patch="\
    babel-loader/lib/cache.js \
  "
substitution="s/md\(4\|5\)/sha256/g"
for file in $files_to_patch; do
  printf "\n[%s]:\n\n" "$file"
  set +e
  sed "$substitution" "$node_modules/$file" | diff "$node_modules/$file" -
  set -e
  sed --in-place "$substitution" "$node_modules/$file"
done

echo \\nPacking node_modules to "$archive_path":
tar --create --xz \
  --file "$archive_path" \
  --directory "$temp_dir" \
  "$(realpath --relative-to="$temp_dir" "$node_modules")"

rm -rf "$temp_dir"
