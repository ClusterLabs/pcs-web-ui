#!/bin/sh

export PORT="${PORT:-3000}"
export HOST="${HOST:-0.0.0.0}"
export PCSD_DEV_BACKEND="${PCSD_DEV_BACKEND:-http://localhost:5000}"

if lsof -i :"$PORT" >/dev/null; then
	printf "Port %s is occupied.\n\n" "$PORT"
	lsof -i :"$PORT"
	exit 1
fi

node scripts/start.js
