#!/bin/sh

SCENARIO_DIR=$1
NAME=$0

usage() {
  echo "Usage: $NAME scenario-directory [scenario]" >&2
  echo "Example: $NAME src/dev/scenarios login.ts" >&2
}

run() {
  npx ts-node-dev \
    -r tsconfig-paths/register \
    -r esm  \
    --respawn \
    --transpile-only \
    --rs  \
    $SCENARIO_DIR/$1 
}


if [ "$#" -lt 1 ]; then
  usage
  exit 1
fi

if [ ! -d $SCENARIO_DIR ]; then
  echo "Scenario directory '"${SCENARIO_DIR}"' does not exist!"
  usage
  exit 1
fi

if [ "$#" -eq 2 ]; then
  SCENARIO=$SCENARIO_DIR/$2
  if [ ! -f $SCENARIO ]; then
    echo "Scenario '"${SCENARIO}"' does not exist!"
    echo "Please use one of scenarios inside '"${SCENARIO_DIR}"':"
    ls $SCENARIO_DIR | tr " " "\n"
    exit 1
  fi
  run $2
  exit 0
fi

if ! [ -x "$(command -v fzf)" ]; then
  usage
  echo "Please use one of scenarios inside '"${SCENARIO_DIR}"':"
  ls $SCENARIO_DIR | tr " " "\n"
  echo "Tip: install fzf. Then you get an interactive offer of scenarios."
  exit 1
fi


run $(ls $SCENARIO_DIR |fzf)
