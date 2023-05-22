#!/bin/sh

packages_dir=$1

package_list=${PCS_UI_PACKAGES:-"app dev dev-backend test"}
flags="--fix"
omitFix=${PCS_UI_ESLINT_NOFIX:-"false"}
if [ "$omitFix" = "true" ]; then
	flags=""
fi

for package in $package_list; do
	dir="$packages_dir/$package"
	printf "%s\n" "----- $package -----"
	# shellcheck disable=SC2086
	npm exec --prefix="$dir" -- \
		eslint $flags \
		--ext .js,.ts,.tsx \
		--ignore-pattern "$dir"/node_modules* \
		"$dir"
	printf "\n\n"
done
