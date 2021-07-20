#!/bin/sh

if [ "$#" -lt 1 ]; then
    echo "Please specify node_modules directory."
    exit 1
fi

BLUE='\033[0;34m'
NC='\033[0m' # No Color

NODE_MODULES_DIR=$1

FILES_TO_PATCH="\
babel-loader/lib/cache.js \
loader-utils/lib/getHashDigest.js \
webpack/lib/HashedModuleIdsPlugin.js \
webpack/lib/ModuleFilenameHelpers.js \
webpack/lib/NamedModulesPlugin.js \
webpack/lib/optimize/ConcatenatedModule.js \
webpack/lib/optimize/SplitChunksPlugin.js \
webpack/lib/SourceMapDevToolPlugin.js \
webpack/lib/WebpackOptionsDefaulter.js \
webpack/node_modules/terser-webpack-plugin/dist/index.js \
"

echo "Following files will be patched:"
for f in $FILES_TO_PATCH
do
    printf "\n${BLUE}$f${NC}:\n"
    sed "s/md4/sha256/g" $NODE_MODULES_DIR/$f | diff $NODE_MODULES_DIR/$f -
done

echo
read -p "Are the changes ok? [y|n]: " answer
if [ "$answer" = "${answer#[Yy]}" ]
then
    echo "Exiting..."
    exit 1
fi

for f in $FILES_TO_PATCH
do
    echo "Patching "$f
    sed -i "s/md4/sha256/g" $NODE_MODULES_DIR/$f
done
