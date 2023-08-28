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
  project_root=$1
  node_modules=$2

  last_commit_hash=$(git rev-parse HEAD)

  echo "Packing modules (for commit: $last_commit_hash)..."

  tar --create --xz \
    --file "$project_root"/pcs-web-ui-node-modules-"$last_commit_hash".tar.xz \
    --directory "$project_root" \
    "$(realpath --relative-to="$project_root" "$node_modules")"
}

# Expression `eval echo $dir` is there to expand any `~` character.
project_root=$(realpath "$(eval echo "${1:-"$(pwd)"}")")
node_modules=$(realpath ./node_modules)
backup=$(realpath ./node_modules.backup)

prepare_node_modules "$node_modules" "$backup"
patch_modules "$node_modules"
pack_modules "$project_root" "$node_modules"
restore_node_modules "$node_modules" "$backup"
