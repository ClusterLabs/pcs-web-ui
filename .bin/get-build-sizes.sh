#!/bin/sh

# shellcheck disable=SC1090
. "$(dirname "$0")/tools.sh"

static_dir="$(get_path "appBuild")/static"

if [ ! -d "$static_dir" ]; then
	echo "Error: $static_dir is not a directory"
	exit 1
fi

files_to_measure() {
	find "$static_dir" -type f \
		-not -path "$static_dir/media/*" \
		-not -name "*.txt" \
		-not -name "*.map"
}

max_size=$((512 * 1024))

files_to_measure | while read -r file; do
	size=$(gzip -c "$file" | wc -c)
	if [ "$size" -gt "$max_size" ]; then
		echo "$file: $size !!! TOO BIG !!!"
	else
		echo "$file: $size"
	fi
done
