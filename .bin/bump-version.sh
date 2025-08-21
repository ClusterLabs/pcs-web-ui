#!/bin/sh

set -e

version="$1"
pcs_versions="$2"

# Also avoids version duplicity; not so easy in other places, so call it first.
node .bin/pcs-compatibility-add.js "$version" "$pcs_versions"
node .bin/pcs-compatibility-export.js
node .bin/bump-version.js "$version"
sed --in-place \
  "s/\#\# \[Unreleased\]/\#\# \[$version\] - $(date +%Y-%m-%d)/" \
  CHANGELOG.md
git commit -a -m "bump new version ($version)"
git tag -a -m "$version release" "$version" HEAD
