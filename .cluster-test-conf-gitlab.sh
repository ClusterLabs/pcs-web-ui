#!/bin/sh

export PCSD_PROTOCOL_1=https
export PCSD_HOST_1=localhost
export PCSD_NODE_1=localhost
export PCSD_PORT_1=2224
export PCSD_USERNAME_1=hacluster
export PCSD_PASSWORD_1=hh

export PCS_WUI_TESTS_HEADLESS=true

export PCS_WUI_TESTS=$*
