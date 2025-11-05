#!/bin/sh

# Standard npm registry URL used across scripts
export STD_NPM_REGISTRY="https://registry.npmjs.org"

# Npm active (with package(-lock)?.json, .npmrc) dirs.
# WARNING: it works because there is no space in any path!
export NPM_DIRS=". ./packages/app ./packages/dev ./packages/test"
