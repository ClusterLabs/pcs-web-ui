NEXUS="https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
LAST_COMMIT_HASH=$(shell git rev-parse HEAD)

SCENARIOS_DIR=src/dev/scenarios/

ifndef NEXUS_REPO
	NEXUS_REPO=true
endif

ifndef TEST
	TEST=""
endif

ifndef TEST_CONFIG
	TEST_CONFIG=""
endif

ifndef BUILD_USE_EXISTING_NODE_MODULES
	BUILD_USE_EXISTING_NODE_MODULES=false
endif

app:
	npx react-scripts start

# Some files are removed from build directory:
# service-worker.js
# precache-manifest.*.js (information about URLs that need to be precached)
#   It doesn't work with self signed certificates and `pcsd` daemon uses it by
#   default.
#   SecurityError: Failed to register a ServiceWorker:
#   An SSL certificate error occurred when fetching the script.
#   https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
# asset-manifest.json
#   It should be useful for integrations. However, there is not a known use case
#   for it now.
#   https://github.com/facebook/create-react-app/issues/600
# images/favicon.png
#   Current (default) pcs web ui provide its own /images/favicon. No need to
#   duplicate it.
#
build:
ifeq ($(BUILD_USE_EXISTING_NODE_MODULES), false)
	if [ -d "node_modules" ]; then mv node_modules node_modules.build-backup; fi
	npx npm ci
endif
	@npx react-scripts build
	rm -f build/service-worker.js
	rm -f build/precache-manifest.*.js
	rm -f build/asset-manifest.json
	rm -f build/images/favicon.png
	find build/images -type d -empty -delete
ifeq ($(BUILD_USE_EXISTING_NODE_MODULES), false)
	rm -rf node_modules
	if [ -d "node_modules.build-backup" ]; then mv node_modules.build-backup node_modules; fi
endif


# prepare tarball with node modules that are necessary to build the application
pack-modules:
	if [ -d "node_modules" ]; then mv node_modules node_modules.backup; fi
	npx npm ci
	@./.bin/patch-node-modules-for-fips.sh ./node_modules
	tar -Jcf pcs-web-ui-node-modules-${LAST_COMMIT_HASH}.tar.xz node_modules
	rm -r node_modules
	if [ -d "node_modules.backup" ]; then mv node_modules.backup node_modules; fi
	ls -l *.tar.xz


dev:
ifdef SCENARIO
	@./.bin/dev-server.sh $(SCENARIOS_DIR) $(SCENARIO)
else
	@./.bin/dev-server.sh $(SCENARIOS_DIR)
endif


#unit tests
testu:
	npx jest --watch --config=jest.config.js --testPathPattern=src/test/unit/$(TEST)

#end2end tests
teste:
	@./.bin/run-tests.sh

testc:
ifeq ($(TEST_CONFIG),"")
	@./.bin/run-tests.sh -t cluster -w
else
	@./.bin/run-tests.sh -t cluster  -c $(TEST_CONFIG)
endif

clean:
	rm -rf build
	rm pcs-web-ui-node-modules-*.tar.xz

init:
ifeq ($(NEXUS_REPO),true)
	@echo "Use \`make init NEXUS_REPO=false\` not to use the Nexus repo."
	@read -p "Specify path to a Nexus repo certificate: " cert; \
	echo "registry="${NEXUS} > .npmrc; \
	echo cafile=$$cert >> .npmrc
	@cp .githooks/pre-commit .git/hooks/pre-commit
else
	@echo "If you will need reinit with the Nexus repo run \`make init\`"
endif
	@npm install
ifeq ($(NEXUS_REPO),true)
	@sed -i \
	"s#repository.engineering.redhat.com/nexus/repository/##g" package-lock.json
endif

lint:
	npx eslint --fix --ext .js,.ts,.tsx src/

fmt:
	npx prettier "src/" --write
	npx eslint --fix --ext .js,.ts,.tsx src/

_install:
ifndef PCSD_DIR
	$(error PCSD_DIR has to be specified)
endif
	@if test ! -d build; then echo "Run 'make build' first"; false; fi
	mkdir -p $(PCSD_DIR)/public/ui
	cp -r build/* $(PCSD_DIR)/public/ui

install: build _install

.PHONY: test build
