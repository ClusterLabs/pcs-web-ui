#!/bin/sh

npmrc_file=$1
registry=$2
cafile=$3

if [ -z "$registry" ]; then
  echo "Error: registry URL is required" >&2
  exit 1
fi

case "$registry" in
  http://* | https://*) ;;
  *)
    echo "Error: registry URL must start with http:// or https://" >&2
    echo "Provided: $registry" >&2
    exit 1
    ;;
esac

if [ -f "$npmrc_file" ]; then
  echo Updating "$npmrc_file"

  sed --in-place '/^registry=/d' "$npmrc_file"
  sed --in-place '/^cafile=/d' "$npmrc_file"
else
  echo Generating "$npmrc_file"
  touch "$npmrc_file"
fi

echo "registry=$registry" >> "$npmrc_file"

if [ -n "$cafile" ]; then
  echo "cafile=$cafile" >> "$npmrc_file"
fi
