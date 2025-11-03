#!/bin/sh

# shellcheck source=.bin/config.sh
. "$(dirname "$0")/config.sh"

files_with_non_std_registry=""

for lockDir in \
  "." \
  "./packages/app" \
  "./packages/dev" \
  "./packages/test"; do

  lock="$lockDir"/package-lock.json

  # Check 1: Search for non-standard registry currently configured.
  registry="$(npm config get registry --prefix "$lockDir")"
  if [ "$registry" != "$STD_NPM_REGISTRY" ]; then
    if grep -q "$registry" "$lock"; then
      files_with_non_std_registry="$files_with_non_std_registry""\n  ""$lock"
      continue
    fi
  fi

  # Check 2: Only standard registry is used in resolved URLs. This catches cases
  # where a different proxy registry was used (e.g. in CI env vs developer env).
  if grep -E '"resolved":\s*"https?://' "$lock" |
        grep -Ev '"resolved":\s*"'"$STD_NPM_REGISTRY" > /dev/null; then
    files_with_non_std_registry="$files_with_non_std_registry""\n  ""$lock"
  fi
done

if [ "$files_with_non_std_registry" != "" ]; then
    echo Non-standart registry usage detected in following files:
    printf "%b\n" "$files_with_non_std_registry"
    echo Standard registry is "$STD_NPM_REGISTRY"
    echo Have you forget to apply git pre-commit hook?
    exit 1
fi

exit 0
