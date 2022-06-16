#!/bin/sh

if [ "$#" -lt 1 ]; then
	echo "Please specify node_modules directory."
	exit 1
fi

BLUE='\033[0;34m'
NC='\033[0m' # No Color

NODE_MODULES_DIR=$1

FILES_TO_PATCH="\
  react-scripts/config/webpack/persistentCache/createEnvironmentHash.js
  babel-loader/lib/cache.js \
"

SUBSTITUTION="s/md\(4\|5\)/sha256/g"

echo "Following files will be patched:"
for f in $FILES_TO_PATCH; do
	printf "\n${BLUE}$f${NC}:\n"
	sed "$SUBSTITUTION" "$NODE_MODULES_DIR/$f" | diff "$NODE_MODULES_DIR/$f" -
done

echo
read -p "Are the changes ok? [y|n]: " answer
if [ "$answer" = "${answer#[Yy]}" ]; then
	echo "Exiting..."
	exit 1
fi

for f in $FILES_TO_PATCH; do
	echo "Patching $f"
	sed -i "$SUBSTITUTION" "$NODE_MODULES_DIR/$f"
done
