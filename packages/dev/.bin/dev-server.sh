#!/bin/sh

# Dev server will be started on this HOST and PORT
export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-3000}"
# Dev server proxifies backend requests to PCSD_DEV_BACKEND.
export PCSD_DEV_BACKEND="${PCSD_DEV_BACKEND:-http://localhost:5000}"
# Dev server uses ALLOWED_HOST for preventing remotes to access local content.
# The logic (originally js using npm module "address") is extracted from CRA.
export ALLOWED_HOST="${ALLOWED_HOST:-$(ip addr show |
	grep 'inet ' |
	grep -vE 'inet 127' |
	head -n1 |
	awk '{print $2}' |
	sed 's|/.*||')}"

if lsof -i :"$PORT" >/dev/null; then
	printf "Port %s is occupied.\n\n" "$PORT"
	lsof -i :"$PORT"
	exit 1
fi

BUILD_DIR=$(realpath "$(dirname "$0")"/../build)
export BUILD_DIR

node "$(dirname "$0")"/start.js
