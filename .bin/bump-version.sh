#!/bin/sh

set -e

version="$1"

node .bin/bump-version.js "$version"
sed --in-place \
  "s/\#\# \[Unreleased\]/\#\# \[$version\] - $(date +%Y-%m-%d)/" \
  CHANGELOG.md
git commit -a -m "bump new version ($version)"
git tag -a -m "$version release" "$version" HEAD
