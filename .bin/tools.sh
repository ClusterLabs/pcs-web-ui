#!/bin/sh

app_dir=$(realpath "$(dirname "$0")"/../packages/app)

query_json() {
	json_file=$1
	query=$2

	node -pe "JSON.parse(process.argv[1]).$query" "$(cat "$json_file")"
}

get_path() {
	path_key=$1

	query_json "$app_dir"/.bin/config/paths.json "$path_key"
}
