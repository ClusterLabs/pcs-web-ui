#!/bin/sh

# If assumptions are not met, build and dev server fails even so. But it can
# be harder to realize where the root cause is.

query_json() {
	JSON_FILE=$1
	QUERY=$2
	node -pe "JSON.parse(process.argv[1]).$QUERY" "$(cat "$JSON_FILE")"
}

get_path() {
	PATH_KEY=$1
	query_json config/paths.json "$PATH_KEY"
}

REQUIRED_FILES="\
 $(get_path "appHtml")
 $(get_path "appIndexJs") \
"

for f in $REQUIRED_FILES; do
	if [ ! -f "$f" ]; then
		echo "Could not find required file: '$f'"
		exit 1
	fi
done

TS_BASE_URL=$(query_json tsconfig.json "compilerOptions.baseUrl")
BASE_URL=$(get_path "appSrc")

if [ "$TS_BASE_URL" != "$BASE_URL" ]; then
	echo "Option baseUrl in .tsconfig should be the same as appSrc in paths.json."
	echo "In other words, typescript and webpack should work with the same dir."
	echo "Please, check it especialy in config/webpack.config.js."
	echo "(Look at the sections resolve.module and resolve.alias)"
	echo "If this check is not appropriate anymore you can change it."
	exit 1
fi
