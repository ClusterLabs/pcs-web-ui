#!/bin/sh

node_modules=$1

backup="$node_modules".backup

rm -r "$node_modules"
if [ -d "$backup" ]; then
  mv "$backup" "$node_modules"
fi
