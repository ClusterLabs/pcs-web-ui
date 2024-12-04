#!/bin/sh

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <package_dir>" >&2
  echo "Example: $0 packages/app" >&2
  exit 1
fi

exec="$(dirname "$0")"
package_dir=$(realpath "$1")

package_build="$package_dir"/"$("$exec"/fname.sh)"
package_build_lock="$package_dir"/"$("$exec"/fname.sh -l)"

( 
  sha256sum "$package_build" | cut -d ' ' -f 1 &&
    sha256sum "$package_build_lock" | cut -d ' ' -f 1
) | tr -d '\n'
