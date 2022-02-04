#!/bin/sh

get_config() {
  npx ts-node --skip-project .bin/get-cluster-tests-config.ts
}


npx jest --watch --config=jest.config.js --runInBand \
  --testPathPattern=src/test/clusterBackend  \
  --globals="'$(get_config)'"

