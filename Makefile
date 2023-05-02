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
	# @./.bin/check-assumptions.sh
	@./packages/dev/.bin/dev-server.sh

build:
	@./.bin/check-assumptions.sh
	@./.bin/build.sh


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
	@./.bin/dev-backend.sh $(SCENARIOS_DIR) $(SCENARIO)
else
	@./.bin/dev-backend.sh $(SCENARIOS_DIR)
endif


#unit tests
testu:
	npx jest --watch --config=jest.config.js --testPathPattern=src/test/unit/$(TEST)

#end2end tests
teste:
	@./.bin/run-dev-tests.sh -c ./.dev/cluster-test-conf.sh

testc:
	@./.bin/run-dev-tests.sh -t cluster -c ./.dev/cluster-test-conf.sh

ci-cluster-test:
	@./.bin/run-jest.sh -s -p src/test/clusterBackend

clean:
	rm -rf build
	rm pcs-web-ui-node-modules-*.tar.xz

init_nexus:
ifeq ($(NEXUS_CERT_PATH),"")
	echo "Specify path of nexus certificate, please"
else
	echo "registry="${NEXUS} > .npmrc
	echo cafile=${NEXUS_CERT_PATH} >> .npmrc
endif



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
