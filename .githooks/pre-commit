#!/bin/sh

for package in "app" "dev" "dev-backend" "test"; do
	lock=packages/"$package"/package-lock.json
	sed -i "s#repository.engineering.redhat.com/nexus/repository/##g" "$lock"
	git add "$lock"
done
