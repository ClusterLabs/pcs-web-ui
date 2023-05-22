#!/bin/sh

packages_dir=$1

package_list=${PCS_UI_PACKAGES:-"app dev dev-backend test"}

for package in $package_list; do
	printf "%s\n" "----- $package -----"
	npm --prefix="$packages_dir"/"$package" install
	printf "\n\n"
done
