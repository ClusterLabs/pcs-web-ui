#!/bin/sh

spec_template=$1
version=$2
date="$3"
pcsd_webui_dir="$4"

expressions="s/@date@/$date/g"
delete_global(){
  expressions="${expressions};/^%glo.*${1}.*$/d"
}
replace(){
  expressions="${expressions};s|@${1}@|${2}|g"
}

replace pcsd-webui-dir "$pcsd_webui_dir"

if echo "$version" | grep '-' --quiet; then
  # The version structure (modified `git describe`, e.g. 0.1.20+34-89788-dirty):
  #   git tag (e.g. 0.1.20)
  #   +commits ahead last tag (git-version-gen made "+" from first "-" e.g. -34)
  #   -hash of the current commit (e.g. -8978888c)
  #   -dirty (optional)
  replace version "${version%%+*}"
  replace current_commit "$(echo "$version" | sed 's/[^-]*-\([^-]*\).*/\1/')"
  replace commits_ahead_tag "$(echo "$version" | sed 's/[^+]*+\([^-]*\).*/\1/')"
else
  # If the current commit is annotated tag, the version is the tag, e.g. 0.1.20
  replace version "$version"
  delete_global current_commit
  delete_global commits_ahead_tag
fi

if echo "$version" | grep '\-dirty$' --quiet; then
  replace dirty dirty
else
  delete_global dirty
fi

if [ -z "$CI_BRANCH" ]; then
  delete_global cibranch
else
  replace cibranch "$CI_BRANCH"
fi

sed --expression "$expressions" "$spec_template"
