#!/bin/sh
node_modules=$1

files_to_patch="\
    babel-loader/lib/cache.js \
  "

substitution="s/md\(4\|5\)/sha256/g"

echo "Following files will be patched:"
for file in $files_to_patch; do
  printf "\n[%s]:\n\n" "$file"
  sed "$substitution" "$node_modules/$file" | diff "$node_modules/$file" -
  sed --in-place "$substitution" "$node_modules/$file"
done

echo "All files patched"
