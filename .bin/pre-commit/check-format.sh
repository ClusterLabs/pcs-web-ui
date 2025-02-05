#!/bin/sh

root_dir="$(realpath "$(dirname "$0")"/../../)"

npx @biomejs/biome format "$root_dir"
