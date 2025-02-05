#!/bin/sh

root_dir="$(realpath "$(dirname "$0")"/../../)"

npx @biomejs/biome lint --error-on-warnings "$root_dir"
