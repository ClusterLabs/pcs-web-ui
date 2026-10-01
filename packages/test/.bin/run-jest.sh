#!/bin/sh

usage() {
  echo "Usage: $0 [ -p <testPathPattern>] [ -s ] [ -n ]" 1>&2
  echo "  -p      jest test path pattern" 1>&2
  echo "  -s      run test serially (no worker pool of child processes)" 1>&2
  echo "  -n      exit with success even when no tests are found" 1>&2
}

run_in_band=false
pass_with_no_tests=false
path_pattern=src/test/scenes

while getopts p:sn name; do
  case ${name} in
    p)
      path_pattern=${OPTARG}
      ;;
    s)
      run_in_band=true
      ;;
    n)
      pass_with_no_tests=true
      ;;
    *)
      usage
      exit 1
      ;;
  esac
done

echo Launching jest, please wait for a while...
npx jest \
  --config=jest.config.js \
  --runInBand="$run_in_band" \
  --testPathPattern="$path_pattern" \
  --passWithNoTests="$pass_with_no_tests" \
  --detectOpenHandles \
  --forceExit
