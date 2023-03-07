#!/bin/sh

export PORT="${PORT:-3000}"
export HOST="${HOST:-0.0.0.0}"

if lsof -i :"$PORT" >/dev/null; then
	printf "Port %s is occupied.\n\n" "$PORT"
	lsof -i :"$PORT"
	exit 1
fi

node scripts/start.js
