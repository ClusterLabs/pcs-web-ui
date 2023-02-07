#!/bin/sh

export REACT_APP_PCS_WEB_UI_ENVIRONMENT="cockpit"
export REACT_APP_PCS_WEB_UI_COCKPIT_ENDPOINT="/var/run/pcsd.socket"
npx react-scripts build
cp ./cockpit/manifest.json build/
