#!/bin/sh

# load scripts: get_path
# shellcheck disable=SC1090
. "$(dirname "$0")/tools.sh"

prepare_build_dir() {
	build_dir=$1
	public_dir=$2

	mkdir -p "$build_dir"
	# Using :? will cause the command to fail if the variable is null or unset.
	# This prevents deleting everything in the system's root directory when
	# `build_dir` variable is empty.
	rm -rf "${build_dir:?}/"*
	cp -r "${public_dir:?}/"* "$build_dir"
}

prepare_for_environment() {
	for_cockpit=$1
	html_index_path=$2
	manifest_path=$3
	manifest_cockpit_path=$4
	adapter_path=$5
	adapter_cockpit_path=$6
	pcsd_socket=$7

	if [ "$for_cockpit" = "true" ]; then
		echo "Building for usage inside cockpit."

		mv "$manifest_cockpit_path" "$manifest_path"

		sed -i \
			"s#^var pcsdSocket = \".*\";#var pcsdSocket = \"$pcsd_socket\";#" \
			"$adapter_cockpit_path"
		mv "$adapter_cockpit_path" "$adapter_path"

		sed -i \
			'/<script.*adapter.js/i <script src="../base1/cockpit.js"></script>' \
			"$html_index_path"
	else
		echo "Building for standalone usage."
		rm "$adapter_cockpit_path"
		rm "$manifest_cockpit_path"
	fi

	# minimize adapter
	npx terser "$adapter_path" \
		--compress ecma=5,warnings=false,comparisons=false,inline=2 \
		--output "$adapter_path"
}

prepare_node_modules() {
	use_current_node_modules=$1
	node_modules=$2
	node_modules_backup=$3

	if [ "$use_current_node_modules" != "true" ]; then
		if [ -d "$node_modules" ]; then
			mv "$node_modules" "${node_modules_backup}"
		fi
		npx npm ci
	fi
}

restore_node_modules() {
	use_current_node_modules=$1
	node_modules=$2
	node_modules_backup=$3

	if [ "$use_current_node_modules" != "true" ]; then
		rm -rf "$node_modules"
		if [ -d "$node_modules_backup" ]; then
			mv "$node_modules_backup" "$node_modules"
		fi
	fi
}

node_modules=$(get_path "appNodeModules")
node_modules_backup="${node_modules}.build-backup"
build_dir=$(get_path "appBuild")

prepare_node_modules \
	"$BUILD_USE_CURRENT_NODE_MODULES" \
	"$node_modules" \
	"$node_modules_backup"

prepare_build_dir "$build_dir" "$(get_path "appPublic")"

prepare_for_environment \
	"${BUILD_FOR_COCKPIT:-false}" \
	"$build_dir"/index.html \
	"$build_dir"/manifest.json \
	"$build_dir"/manifestCockpit.json \
	"$build_dir"/static/js/adapter.js \
	"$build_dir"/static/js/adapterCockpit.js \
	"/var/run/pcsd.socket"

node scripts/build.js

restore_node_modules \
	"$BUILD_USE_CURRENT_NODE_MODULES" \
	"$node_modules" \
	"$node_modules_backup"

# shellcheck disable=SC1090
echo ""
. "$(dirname "$0")/get-build-sizes.sh"

# Some files are removed from build directory:
# service-worker.js
# precache-manifest.*.js (information about URLs that need to be precached)
#   It doesn't work with self signed certificates and `pcsd` daemon uses it by
#   default.
#   SecurityError: Failed to register a ServiceWorker:
#   An SSL certificate error occurred when fetching the script.
#   https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
# asset-manifest.json
#   It should be useful for integrations. However, there is not a known use case
#   for it now.
#   https://github.com/facebook/create-react-app/issues/600
# images/favicon.png
#   Current (default) pcs web ui provide its own /images/favicon. No need to
#   duplicate it.
#
rm -f build/precache-manifest.*.js
rm -f build/images/favicon.png
find build/images -type d -empty -delete
