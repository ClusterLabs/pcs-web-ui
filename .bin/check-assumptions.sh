#!/bin/sh

# If required files are not there build and dev server fails even so. But it can
# be harder to realize where the root cause is.

REQUIRED_FILES="\
 public/index.html
 src/index.tsx \
"

for f in $REQUIRED_FILES; do
	if [ ! -f "$f" ]; then
		echo "Could not find required file: '$f'"
		exit 1
	fi
done
