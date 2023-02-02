#!/bin/sh

export REACT_APP_PCS_WEB_UI_ENVIRONMENT="cockpit"
npx react-scripts build
cp ./cockpit/manifest.json build/
