#!/bin/sh

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <package.json> <package-build.json>" >&2
  exit 1
fi

package=$1
package_build=$2

bin="$(dirname "$0")"

expected="$(mktemp)"
node "$bin"/package-build-remove-eslint.js "$package" > "$expected"

diff_output=$(diff "$expected" "$package_build")
diff_return_code=$?

rm "$expected"

if [ "$diff_return_code" != 0 ]; then
  echo "$diff_output"
fi
exit $diff_return_code
