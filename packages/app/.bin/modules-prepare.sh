#!/bin/sh
node_modules=$1

if [ -d "$node_modules" ]; then
  mv "$node_modules" "$node_modules".backup
fi
npm ci
