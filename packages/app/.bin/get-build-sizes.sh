#!/bin/sh

print_bundle_sizes() {
  static_dir=$1/static

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
    working_directory="$(pwd)"/

    if [ "${file#"$working_directory"}" != "$file" ]; then
      print_name="${file#"$working_directory"}"
    else
      print_name="$file"
    fi

    if [ "$size" -gt "$max_size" ]; then
      echo "$print_name: $size !!! TOO BIG !!!"
    else
      echo "$print_name: $size"
    fi
  done
}
