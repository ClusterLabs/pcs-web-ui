#!/bin/sh

root_dir="$(realpath "$(dirname "$0")"/..)"

if [ $# -eq 0 ]; then
  set -- packages/app packages/dev packages/test
fi

exit_code=0
for pkg in "$@"; do
  printf "Typechecking %s...\n" "$pkg"
  (cd "$root_dir/$pkg" && npx tsc --noEmit) || exit_code=$?
done

exit $exit_code
