#!/bin/sh

NAME=$0
SCENARIO_DIR=$1
SCENARIO_NAME=$2

usage() {
  echo "Usage: $NAME scenario-directory [scenario]" >&2
  echo "Example: $NAME src/dev/scenarios login" >&2
}

run() {
  npx ts-node-dev \
    -r tsconfig-paths/register \
    -r esm  \
    --respawn \
    --transpile-only \
    --rs  \
    "$SCENARIO_DIR/$1" 
}

list_scenarios() {
  find  "$1" -type f -iname "*.ts" -printf '%f\n' | sed 's/\.ts$//1' | sort
}


if [ "$#" -lt 1 ]; then
  usage
  exit 1
fi

if [ ! -d "$SCENARIO_DIR" ]; then
  echo "Scenario directory '${SCENARIO_DIR}' does not exist!"
  usage
  exit 1
fi

if [ "$#" -eq 2 ]; then
  SCENARIO_FILE_NAME="$SCENARIO_NAME.ts"
  SCENARIO="$SCENARIO_DIR/$SCENARIO_FILE_NAME"
  if [ ! -f "$SCENARIO" ]; then
    echo "Scenario '${SCENARIO}' does not exist!"
    echo "Please use one of scenarios inside '${SCENARIO_DIR}':"
    list_scenarios "$SCENARIO_DIR"
    exit 1
  fi
  run "$SCENARIO_FILE_NAME"
  exit 0
fi

if ! [ -x "$(command -v fzf)" ]; then
  usage
  echo "Please use one of scenarios inside '${SCENARIO_DIR}':"
  list_scenarios "$SCENARIO_DIR"
  echo "Tip: install fzf. Then you get an interactive offer of scenarios."
  exit 1
fi


run "$(list_scenarios "$SCENARIO_DIR" |fzf)"
