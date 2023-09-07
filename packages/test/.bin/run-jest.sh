#!/bin/sh

usage() {
	echo "Usage: $0 [ -p <testPathPattern>] [ -s ]" 1>&2
	echo "  -p      jest test path pattern" 1>&2
	echo "  -s      run test serially (no worker pool of child processes)" 1>&2
}

run_in_band=false
path_pattern=src/test/scenes

while getopts p:s name; do
	case ${name} in
	p)
		path_pattern=${OPTARG}
		;;
	s)
		run_in_band=true
		;;
	*)
		usage
		exit 1
		;;
	esac
done

npx jest \
	--config=jest.config.js \
	--runInBand="$run_in_band" \
	--testPathPattern="$path_pattern" \
	--detectOpenHandles \
	--forceExit
