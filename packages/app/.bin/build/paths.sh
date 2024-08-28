#!/bin/sh

exec="$(dirname "$0")"

if [ "$#" -eq 2 ]; then
  json=$1
  key=$2
elif [ "$#" -eq 1 ]; then
  json="$exec"/config/paths.json
  key=$1
else
  echo "Usage: $0 [json-file] key" >&2
  exit 1
fi

node --print --eval="JSON.parse(process.argv[1]).$key" "$(cat "$json")"
