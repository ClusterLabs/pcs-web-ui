#!/bin/sh

packages_dir=$1
registry=$2
cafile=$3

for package in "app" "dev" "test"; do
  "$(dirname "$0")"/set_npm_registry.sh \
    "$packages_dir"/"$package"/.npmrc \
    "$registry" \
    "$cafile"
done
