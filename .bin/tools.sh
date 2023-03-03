#!/bin/sh

query_json() {
	JSON_FILE=$1
	QUERY=$2
	node -pe "JSON.parse(process.argv[1]).$QUERY" "$(cat "$JSON_FILE")"
}

get_path() {
	PATH_KEY=$1
	query_json config/paths.json "$PATH_KEY"
}
