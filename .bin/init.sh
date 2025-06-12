#!/bin/sh

# This script must be run from root of project!

if [ "$#" -eq 1 ]; then
  registry=$1
  printf "Specify path to a Nexus repo certificate: " >&2
  read -r cafile

  "$(dirname "$0")"/init_nexus.sh packages "$registry" "$cafile"
fi

cp "$(dirname "$0")"/pre-commit/pre-commit.sh .git/hooks/pre-commit
"$(dirname "$0")"/npm_install.sh packages
.git/hooks/pre-commit
