#!/bin/sh

usage() {
	echo "Usage: $0 [ -t <cluster|mocked>] [ -c <path>]" 1>&2
	echo "  -t      type of tests to run (mocked or against real cluster)" 1>&2
	echo "  -c      config file; will be watched and sourced before each run" 1>&2
}

RUN_JEST=$(dirname "$0")/run-jest.sh
RUN_CLUSTER_TESTS=false

while getopts c:t name; do
	case ${name} in
	c)
		DEV_CONFIG=${OPTARG}
		;;
	t)
		[ "${OPTARG}" = "cluster" ] && RUN_CLUSTER_TESTS=true
		;;
	*)
		usage
		exit 1
		;;
	esac
done

echo Launching jest, please wait for a while...

scenes_path_pattern() {
	SCENES=src/test/scenes
	if [ -z ${PCS_WUI_TESTS+x} ]; then
		echo "$SCENES"
	else
		echo "$SCENES/($(echo "$PCS_WUI_TESTS" | tr ' ' '|'))"
	fi
}

run() {
	if [ -f "$DEV_CONFIG" ]; then
		# In POSIX sh, source in place of . is undefined.
		# Can't follow non-constant source.
		# shellcheck disable=SC1090
		. "$DEV_CONFIG"
	fi

	if [ "$RUN_CLUSTER_TESTS" = true ]; then
		"$RUN_JEST" -s -p src/test/clusterBackend
	else
		"$RUN_JEST" -p "$(scenes_path_pattern)"
	fi
}

if [ -x "$(command -v inotifywait)" ]; then
	run
	while inotifywait -r -e MODIFY -e CREATE -e MOVE -e DELETE \
		src/ \
		"$DEV_CONFIG" \
		; do
		run
	done
else
	echo "inotifywait is not installed; running just onetime jest"
	echo "Tip: install inotifywait." \
		"Then you get a possibility to watch changes in config specified by -c"
	run
fi
