#!/bin/sh

name=$0

src_dir=$(realpath "$1")
output_dir=$(realpath "$2")
app_node_modules=$(realpath "$3")

dev_root_dir=$(realpath "$(dirname "$0")"/..)
scenario_dir="$dev_root_dir"/src/dev/scenarios

usage() {
  echo "Usage: $name" >&2
  echo "Example: "
  echo "PCSD_SCENARIO=login $name" "<src_dir> <output_dir> <node_modules>" >&2
}

run() {
  scenario_name_selected="$1"
  if [ -f "$PCS_WUI_DEV_CONF" ]; then
    # shellcheck disable=SC1090
    . "$PCS_WUI_DEV_CONF"
  fi
  mkdir -p "$output_dir"
  npx tsx watch \
    -r tsconfig-paths/register \
    "$scenario_dir/$scenario_name_selected" \
    "$src_dir" \
    "$output_dir" \
    "$app_node_modules"
}

list_scenarios() {
  find "$1" -type f -iname "*.ts" -printf '%f\n' | sed 's/\.ts$//1' | sort
}

if [ -n "$PCSD_SCENARIO" ]; then
  scenario_file_name="$PCSD_SCENARIO.ts"
  scenario="$scenario_dir/$scenario_file_name"
  if [ ! -f "$scenario" ]; then
    echo "Scenario '${scenario}' does not exist!"
    echo "Please use one of scenarios inside '${scenario_dir}':"
    list_scenarios "$scenario_dir"
    exit 1
  fi
  run "$scenario_file_name"
  exit 0
fi

if ! [ -x "$(command -v fzf)" ]; then
  usage
  echo "Please use one of scenarios inside '${scenario_dir}':"
  list_scenarios "$scenario_dir"
  echo "Tip: install fzf. Then you get an interactive offer of scenarios."
  exit 1
fi

run "$(list_scenarios "$scenario_dir" | fzf)"
