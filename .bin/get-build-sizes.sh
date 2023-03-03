#!/bin/sh

# shellcheck disable=SC1090
. "$(dirname "$0")/tools.sh"

STATIC_DIR="$(get_path "appBuild")/static"

if [ ! -d "$STATIC_DIR" ]; then
	echo "Error: $STATIC_DIR is not a directory"
	exit 1
fi

files_to_measure() {
	find "$STATIC_DIR" -type f \
		-not -path "$STATIC_DIR/media/*" \
		-not -name "*.txt" \
		-not -name "*.map"
}

MAX_SIZE=$((512 * 1024))

files_to_measure | while read -r file; do
	size=$(gzip -c "$file" | wc -c)
	if [ "$size" -gt "$MAX_SIZE" ]; then
		echo "$file: $size !!! TOO BIG !!!"
	else
		echo "$file: $size"
	fi
done
