#!/bin/sh

usage() {
	echo "Usage: $0 [ -t <cluster|mocked>] [ -c <path>]" 1>&2
	echo "  -t      type of tests to run (mocked or against real cluster)" 1>&2
	echo "  -c      config file; will be watched and sourced before each run" 1>&2
}

dev_dir=$(realpath "$(dirname "$0")"/../../../.dev)
dev_config="$dev_dir"/cluster-test-conf.sh

run_jest=$(dirname "$0")/run-jest.sh
run_cluster_tests=false

while getopts c:t: name; do
	case ${name} in
	c)
		dev_config=${OPTARG}
		;;
	t)
		[ "${OPTARG}" = "cluster" ] && run_cluster_tests=true
		;;
	*)
		usage
		exit 1
		;;
	esac
done

echo Launching jest, please wait for a while...

scenes_path_pattern() {
	scenes=src/test/scenes
	if [ -z ${PCS_WUI_TESTS+x} ]; then
		echo "$scenes"
	else
		echo "$scenes/($(echo "$PCS_WUI_TESTS" | tr ' ' '|'))"
	fi
}

run() {
	if [ -f "$dev_config" ]; then
		# In POSIX sh, source in place of . is undefined.
		# Can't follow non-constant source.
		# shellcheck disable=SC1090
		. "$dev_config"
	fi

	if [ "$run_cluster_tests" = true ]; then
		"$run_jest" -s -p src/test/clusterBackend
	else
		"$run_jest" -p "$(scenes_path_pattern)"
	fi
}

if [ -x "$(command -v inotifywait)" ]; then
	run
	while inotifywait -r -e MODIFY -e CREATE -e MOVE -e DELETE \
		src/ \
		"$dev_dir"/ \
		"$dev_config" \
		; do
		run
	done
else
	echo "inotifywait is not installed; running just onetime jest"
	echo "Tip: install inotifywait." \
		"Then you get a possibility to watch changes in config specified by -c"
	run
fi
