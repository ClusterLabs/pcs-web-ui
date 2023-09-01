NEXUS="https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
PROJECT_DIR=$(shell pwd)
APP_MODULES_DIR=$(shell realpath ${PROJECT_DIR}/packages/app/node_modules)

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
	./packages/app/.bin/check-assumptions.sh
	@cd ./packages/app && .bin/build.sh ${PROJECT_DIR}

# prepare tarball with node modules that are necessary to build the application
modules-pack:
	@cd ./packages/app \
		&& .bin/modules-prepare.sh ${APP_MODULES_DIR} \
		&& .bin/modules-patch.sh ${APP_MODULES_DIR} \
		&& .bin/modules-tar.sh ${APP_MODULES_DIR} ${PROJECT_DIR} \
		&& .bin/modules-restore.sh ${APP_MODULES_DIR} \
	@ls -l ./*.tar.xz

modules-prepare:
	@cd ./packages/app  && echo y |  .bin/modules-prepare.sh ${APP_MODULES_DIR} 

modules-patch:
	@cd ./packages/app  && .bin/modules-patch.sh ${APP_MODULES_DIR} 

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
