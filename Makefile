NEXUS="https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
LAST_COMMIT_HASH=$(shell git rev-parse HEAD)

SCENARIOS_DIR=src/dev/scenarios/

ifndef NEXUS_REPO
	NEXUS_REPO=true
endif

ifndef NEXUS_CERT_PATH
	NEXUS_CERT_PATH=""
endif

ifndef TEST
	TEST=""
endif

app:
	@./packages/app/.bin/check-assumptions.sh
	@./packages/dev/.bin/dev-server.sh

build:
	@./packages/app/.bin/check-assumptions.sh
	@./packages/app/.bin/build.sh


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
	@cd ./packages/dev-backend && .bin/dev-backend.sh


#unit tests
testu:
	npx jest --watch --config=jest.config.js --testPathPattern=src/test/unit/$(TEST)

#end2end tests
teste:
	@cd ./packages/test && .bin/run-dev-tests.sh

testc:
	@cd ./packages/test && .bin/run-dev-tests.sh -t cluster

ci-cluster-test:
	@cd ./packages/test && .bin/run-jest.sh -s -p src/test/clusterBackend

clean:
	rm -rf build
	rm pcs-web-ui-node-modules-*.tar.xz

init_nexus:
ifeq ($(NEXUS_CERT_PATH),"")
	echo "Specify path of nexus certificate, please"
else
	@.bin/init_nexus.sh ./packages ${NEXUS} ${NEXUS_CERT_PATH}
endif



init:
ifeq ($(NEXUS_REPO),true)
	@echo "Use \`make init NEXUS_REPO=false\` not to use the Nexus repo."
	@.bin/init.sh ${NEXUS}
else
	@echo "If you will need reinit with the Nexus repo run \`make init\`"
	@.bin/init.sh
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

npm_install:
	@.bin/npm_install.sh ./packages

.PHONY: test build
