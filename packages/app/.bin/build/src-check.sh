#!/bin/sh

# If assumptions are not met, build and dev server fails even so. But it can
# be harder to realize where the root cause is.

set -e

exec="$(dirname "$0")"
src_dir=$(realpath "$(eval echo "${1:-"$(realpath "$exec"/..)"}")")

path() {
  # shellcheck disable=SC2086
  echo "$src_dir"/"$("$exec"/paths.sh $1 $2)"
}

tsconfig() {
  path "$(path "appTsConfig")" "$1"
}

required_files="$(path "appHtml") $(path "appIndexJs")"

for f in $required_files; do
  if [ ! -f "$f" ]; then
    echo "Could not find required file: '$f'"
    exit 1
  fi
done

ts_base_url=$(tsconfig "compilerOptions.baseUrl")
base_url=$(path "appSrc")

if [ "$ts_base_url" != "$base_url" ]; then
  echo "Option baseUrl in .tsconfig should be the same as appSrc in paths.json."
  echo "(But they are: $ts_base_url vs $base_url)"
  echo "In other words, typescript and webpack should work with the same dir."
  echo "Please, check it especialy in webpack.config.js."
  echo "(Look at the sections resolve.module and resolve.alias)"
  echo "If this check is not appropriate anymore you can change it."
  exit 1
fi
