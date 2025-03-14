#!/bin/sh

files_with_nexus=""

for lockDir in \
  "." \
  "./packages/app" \
  "./packages/dev-backend" \
  "./packages/test"; do

  lock="$lockDir"/package-lock.json
  if grep -q "repository.engineering.redhat.com/nexus/repository/" "$lock"; then
    files_with_nexus="$files_with_nexus""\n  ""$lock"
  fi
done

if [ "$files_with_nexus" != "" ]; then
    echo Nexus repository usage detected in following files: "$files_with_nexus"
    echo Have you forget to apply git pre-commit hook?
    exit 1
fi

exit 0
