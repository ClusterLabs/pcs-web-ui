#!/bin/sh

prepare_node_modules() {
	node_modules=$1
	backup=$2

	if [ -d "$node_modules" ]; then
		mv "$node_modules" "$backup"
	fi
	npx npm ci
}

restore_node_modules() {
	node_modules=$1
	backup=$2

	rm -r "$node_modules"
	if [ -d "$backup" ]; then
		mv "$backup" "$node_modules"
	fi
}

patch_modules() {
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

}

pack_modules() {
	archive_dir=$1
	node_modules=$2

	echo "Packing modules..."
	last_commit_hash=$(git rev-parse HEAD)
	archive="$archive_dir"/pcs-web-ui-node-modules-"$last_commit_hash".tar.xz
	tar --create --xz --file "$archive" "$node_modules"
}

archive_dir="${1:-"$(pwd)"}"

node_modules=./node_modules
backup=./node_modules.backup

prepare_node_modules $node_modules $backup
patch_modules $node_modules
pack_modules "$archive_dir" $node_modules
restore_node_modules $node_modules $backup
