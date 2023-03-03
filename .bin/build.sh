#!/bin/sh

# shellcheck disable=SC1090
. "$(dirname "$0")/tools.sh"
node_modules=$(get_path "appNodeModules")
node_modules_backup="${node_modules}.build-backup"
if [ "$BUILD_USE_EXISTING_NODE_MODULES" = "true" ]; then
	install_node_modules=0
else
	install_node_modules=1
fi

if [ "$BUILD_FOR_COCKPIT" = "true" ]; then
	echo "Building for usage inside cockpit"
	export REACT_APP_PCS_WEB_UI_ENVIRONMENT="cockpit"
	export REACT_APP_PCS_WEB_UI_COCKPIT_ENDPOINT="/var/run/pcsd.socket"
else
	echo "Building for standalone usage"
fi

if [ "$install_node_modules" -eq 1 ]; then
	if [ -d "$node_modules" ]; then
		mv "$node_modules" "${node_modules_backup}"
	fi
	npx npm ci
fi

# It is possible to use TSC_COMPILE_ON_ERROR=true when typescript errors
# should not interupt the build
node scripts/build.js

if [ "$BUILD_FOR_COCKPIT" = "true" ]; then
	cp ./cockpit/manifest.json build/
fi

# shellcheck disable=SC1090
. "$(dirname "$0")/get-build-sizes.sh"
echo ""

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

if [ "$install_node_modules" -eq 1 ]; then
	rm -rf "$node_modules"
	if [ -d "$node_modules_backup" ]; then
		mv "$node_modules_backup" "$node_modules"
	fi
fi
