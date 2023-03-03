#!/bin/sh

name=$0
scenario_dir=$1
scenario_name=$2

usage() {
	echo "Usage: $name scenario-directory [scenario]" >&2
	echo "Example: $name src/dev/scenarios login" >&2
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

if [ "$#" -lt 1 ]; then
	usage
	exit 1
fi

if [ ! -d "$scenario_dir" ]; then
	echo "Scenario directory '${scenario_dir}' does not exist!"
	usage
	exit 1
fi

if [ "$#" -eq 2 ]; then
	scenario_file_name="$scenario_name.ts"
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
