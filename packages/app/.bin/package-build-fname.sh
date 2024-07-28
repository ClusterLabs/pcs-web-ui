#!/bin/sh

usage() {
  echo "Usage: $0 [ -l ]" 1>&2
  echo "  -l      generate filename for package-lock instead of package" 1>&2
}

suffix=-build

while getopts :l name; do
  case ${name} in
    l)
      suffix="$suffix"-lock
      ;;
    *)
      usage
      exit 1
      ;;
  esac
done

echo package"$suffix".json
