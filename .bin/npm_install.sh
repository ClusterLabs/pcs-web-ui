#!/bin/sh

packages_dir=$1

for package in "app" "dev" "dev-backend" "test"; do
	printf "%s\n" "----- $package -----"
	npm --prefix="$packages_dir"/"$package" install
	printf "\n\n"
done
