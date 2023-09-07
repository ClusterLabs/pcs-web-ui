#!/bin/sh

last_commit_hash=$(git rev-parse HEAD)

tag=$(git describe --tags --exact-match "$last_commit_hash" 2> /dev/null)

if [ -n "$tag" ]; then
  echo "$tag"
else
  echo "$last_commit_hash"
fi
