#!/bin/sh

packages_dir=$1
registry=$2
cafile=$3

for package in "app" "dev" "test"; do
  npmrc="$packages_dir"/"$package"/.npmrc
  echo "registry=$registry" > "$npmrc"
  echo "cafile=$cafile" >> "$npmrc"
done
