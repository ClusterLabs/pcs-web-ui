#!/bin/sh

DEV_CONFIG=".dev/cluster-test-conf.sh"
if [ -f "$DEV_CONFIG" ]; then
	# shellcheck disable=SC1090
	. "$DEV_CONFIG"
fi

npx jest \
	--watch \
	--config=jest.config.js \
	--runInBand \
	--testPathPattern=src/test/clusterBackend
