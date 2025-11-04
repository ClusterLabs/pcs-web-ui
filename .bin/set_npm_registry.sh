#!/bin/sh

npmrc_file=$1
registry=$2
cafile=$3

echo Generating "$npmrc_file"
echo "registry=$registry" > "$npmrc_file"
if [ -n "$cafile" ]; then
  echo "cafile=$cafile" >> "$npmrc_file"
fi
