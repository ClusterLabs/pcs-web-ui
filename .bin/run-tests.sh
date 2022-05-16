#!/bin/sh

DEV_CONFIG=".dev/cluster-test-conf.sh"
RUN_CLUSTER_TESTS=false
[ "$1" = "cluster" ] && RUN_CLUSTER_TESTS=true

echo Launching jest, please wait for a while...

run() {
	if [ -f "$DEV_CONFIG" ]; then
		# shellcheck disable=SC1090
		. "$DEV_CONFIG"
	fi

	if [ "$RUN_CLUSTER_TESTS" = true ]; then
		RUN_IN_BAND=true
		PATH_PATTERN="src/test/clusterBackend"
	else
		RUN_IN_BAND=false
		if [ -z ${PCS_WUI_TESTS+x} ]; then
			PATH_PATTERN="src/test/scenes"
		else
			PATH_PATTERN="src/test/scenes/($(echo "$PCS_WUI_TESTS" | tr ' ' '|'))"
		fi
	fi

	npx jest \
		--config=jest.config.js \
		--runInBand="$RUN_IN_BAND" \
		--testPathPattern="$PATH_PATTERN" \
		--detectOpenHandles \
		--forceExit
}

inotifyRun() {
	run
	while inotifywait -r -e MODIFY -e CREATE -e MOVE -e DELETE \
		src/ \
		.dev/cluster-test-conf.sh \
		; do
		run
	done
}

if [ -x "$(command -v inotifywait)" ]; then
	inotifyRun
else
	echo "inotifywait is not installed; running just onetime jest"
	echo "Tip: install inotifywait." \
		"Then you get a possibility to watch changes in .dev/cluster-test-conf.sh"
	run
fi
