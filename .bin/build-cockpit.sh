#!/bin/sh

export REACT_APP_PCS_WEB_UI_ENVIRONMENT="cockpit"
export REACT_APP_PCS_WEB_UI_COCKPIT_ENDPOINT="/var/run/pcsd.socket"
node scripts/build.js
cp ./cockpit/manifest.json build/

# shellcheck disable=SC1090
. "$(dirname "$0")/get-build-sizes.sh"
echo ""
