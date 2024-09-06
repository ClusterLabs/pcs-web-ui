#!/bin/sh

set -e
exec="$(dirname "$0")"

webpack_output_dir=$1
out_css=$2
out_media=$3
out_main=$4

node "$exec"/webpack-minify-css.js \
  "$(ls "$webpack_output_dir"/"$out_css"/"$out_main".*.css)"

# measure sizes of compiled assets
find "$webpack_output_dir" -type f \
    -not -path "$webpack_output_dir/$out_media/*" \
    -not -name "*.txt" \
    -not -name "*.map" |
  while read -r file; do
    size=$(gzip -c "$file" | wc -c)
    working_directory="$(pwd)"/

    if [ "${file#"$working_directory"}" != "$file" ]; then
      print_name="${file#"$working_directory"}"
    else
      print_name="$file"
    fi

    if [ "$size" -gt "$((512 * 1024))" ]; then
      echo "$print_name: $size !!! TOO BIG !!!"
    else
      echo "$print_name: $size"
    fi
  done
