#!/bin/sh

node --print --eval="JSON.parse(process.argv[1]).$2" "$(cat "$1")"
