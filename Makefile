NEXUS="https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
CURRENT_DIR=$(shell pwd)

ifndef NEXUS_REPO
	NEXUS_REPO=true
endif

ifndef NEXUS_CERT_PATH
	NEXUS_CERT_PATH=""
endif

app:
	@./packages/app/.bin/check-assumptions.sh
	@./packages/dev/.bin/dev-server.sh

build:
	@./packages/app/.bin/check-assumptions.sh
	@./packages/app/.bin/build.sh

# prepare tarball with node modules that are necessary to build the application
pack-modules:
	@cd ./packages/app && .bin/pack-modules.sh ${CURRENT_DIR}
	@ls -l ./*.tar.xz

dev:
	@cd ./packages/dev-backend && .bin/dev-backend.sh

test:
	@cd ./packages/test && .bin/run-dev-tests.sh

ci-cluster-test:
	@cd ./packages/test && .bin/run-jest.sh -s -p src/test/realBackend

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
	@.bin/lint.sh ./packages

fmt:
	npx prettier "packages/app/src/" --write
	packages/app/node_modules/.bin/eslint --fix --ext .js,.ts,.tsx packages/app/src/

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
