#!/bin/sh

set -e
exec="$(dirname "$0")"

webpack_output_dir=$1

static_dir="$webpack_output_dir"/static
node "$exec"/webpack-minify-css.js "$(ls "$static_dir"/css/main.*.css)"

# measure sizes of compiled assets
find "$static_dir" -type f \
    -not -path "$static_dir/media/*" \
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
