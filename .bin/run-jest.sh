#!/bin/sh

usage() {
	echo "Usage: $0 [ -p <testPathPattern>] [ -s ]" 1>&2
	echo "  -p      jest test path pattern" 1>&2
	echo "  -s      run test serially (no worker pool of child processes)" 1>&2
}

RUN_IN_BAND=false
PATH_PATTERN=src/test/scenes

while getopts p:s name; do
	case ${name} in
	p)
		PATH_PATTERN=${OPTARG}
		;;
	s)
		RUN_IN_BAND=true
		;;
	*)
		usage
		exit 1
		;;
	esac
done

npx jest \
	--config=jest.config.js \
	--runInBand="$RUN_IN_BAND" \
	--testPathPattern="$PATH_PATTERN" \
	--detectOpenHandles \
	--forceExit
