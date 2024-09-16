#!/bin/sh

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <package_dir>" >&2
  echo "Example: $0 packages/app" >&2
  exit 1
fi

exec="$(dirname "$0")"
dest=$(realpath "$1")

package="$dest"/package.json
package_build="$dest"/"$("$exec"/fname.sh)"

exec="$(dirname "$0")"

expected="$(mktemp)"
node "$exec"/remove-eslint.js "$package" > "$expected"

diff_output=$(diff "$expected" "$package_build")
diff_return_code=$?

rm "$expected"

if [ "$diff_return_code" != 0 ]; then
  echo "$diff_output"
fi
exit $diff_return_code
