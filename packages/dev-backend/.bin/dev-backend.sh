#!/bin/sh

name=$0

dev_root_dir=$(realpath "$(dirname "$0")"/..)
scenario_dir="$dev_root_dir"/src/dev/scenarios

usage() {
	echo "Usage: $name" >&2
	echo "Example: PCSD_SCENARIO=login $name" >&2
}

run() {
	scenario_name_selected="$1"
	dev_config=".dev/cluster-test-conf.sh"
	if [ -f "$dev_config" ]; then
		# shellcheck disable=SC1090
		. "$dev_config"
	fi
	npx ts-node-dev \
		-r tsconfig-paths/register \
		-r esm \
		--respawn \
		--transpile-only \
		--rs \
		"$scenario_dir/$scenario_name_selected"
}

list_scenarios() {
	find "$1" -type f -iname "*.ts" -printf '%f\n' | sed 's/\.ts$//1' | sort
}

if [ -n "$PCSD_SCENARIO" ]; then
	scenario_file_name="$PCSD_SCENARIO.ts"
	scenario="$scenario_dir/$scenario_file_name"
	if [ ! -f "$scenario" ]; then
		echo "Scenario '${scenario}' does not exist!"
		echo "Please use one of scenarios inside '${scenario_dir}':"
		list_scenarios "$scenario_dir"
		exit 1
	fi
	run "$scenario_file_name"
	exit 0
fi

if ! [ -x "$(command -v fzf)" ]; then
	usage
	echo "Please use one of scenarios inside '${scenario_dir}':"
	list_scenarios "$scenario_dir"
	echo "Tip: install fzf. Then you get an interactive offer of scenarios."
	exit 1
fi

run "$(list_scenarios "$scenario_dir" | fzf)"
