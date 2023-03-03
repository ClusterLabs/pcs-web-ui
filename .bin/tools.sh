#!/bin/sh

query_json() {
	json_file=$1
	query=$2
	node -pe "JSON.parse(process.argv[1]).$query" "$(cat "$json_file")"
}

get_path() {
	path_key=$1
	query_json config/paths.json "$path_key"
}
