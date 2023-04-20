#!/bin/sh

if [ "$#" -lt 1 ]; then
	echo "Please specify node_modules directory."
	exit 1
fi

blue='\033[0;34m'
nc='\033[0m' # No Color

node_modules_dir=$1

files_to_patch="\
  babel-loader/lib/cache.js \
"

SUBSTITUTION="s/md\(4\|5\)/sha256/g"

echo "Following files will be patched:"
for f in $files_to_patch; do
	printf "\n${blue}$f${nc}:\n"
	sed "$SUBSTITUTION" "$node_modules_dir/$f" | diff "$node_modules_dir/$f" -
done

echo
read -p "Are the changes ok? [y|n]: " answer
if [ "$answer" = "${answer#[Yy]}" ]; then
	echo "Exiting..."
	exit 1
fi

for f in $files_to_patch; do
	echo "Patching $f"
	sed -i "$SUBSTITUTION" "$node_modules_dir/$f"
done
