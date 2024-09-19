AUTOMAKE_OPTIONS = foreign

SUBDIRS = . packages/app/ packages/test/
MAINTAINERCLEANFILES	= \
			  aclocal.m4 \
			  autoconf \
			  autoheader \
			  automake \
			  autoscan.log \
			  compile \
			  config.guess \
			  config.sub \
			  configure \
			  configure.scan \
			  depcomp \
			  install-sh \
			  libtool \
			  libtoolize \
			  ltmain.sh \
			  Makefile.in \
			  missing

EXTRA_DIST		= \
			  autogen.sh \
			  .bin/check-no-nexus.sh \
			  .bin/init_nexus.sh \
			  .bin/init.sh \
			  .bin/lint.sh \
			  .bin/npm_install.sh \
			  .bin/pre-commit.sh \
			  .browserslistrc \
			  COPYING \
			  .gitlab-ci.yml \
			  README.md \
			  typos.toml 
			  $(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz
CLEANFILES		= \
			  $(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz

NEXUS = "https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
PROJECT_DIR = $(shell pwd)
APP_MODULES_DIR = $(shell realpath ${PROJECT_DIR}/packages/app/node_modules)

PCSD_WEBUI_DIR = @PCSD_WEBUI_DIR@
PCSD_UNIX_SOCKET = @PCSD_UNIX_SOCKET@

APP_SRC = $(abs_top_srcdir)/packages/app
APP_BUILD = $(abs_top_builddir)/packages/app

app:
	if [ ! -d $(APP_BUILD)/node_modules ]; then \
		npm ci --no-progress --prefix $(APP_BUILD); \
	fi
	@$(abs_top_srcdir)/packages/dev/.bin/dev-server.sh \
		${APP_SRC} \
		$(APP_BUILD)/node_modules \
		${abs_top_builddir}/build 

build:
	if [ "${abs_top_builddir}" != "${abs_top_srcdir}" ]; then \
		mkdir -p $(APP_BUILD); \
	  cp $(APP_SRC)/package-build.json $(APP_BUILD)/package.json; \
	  cp $(APP_SRC)/package-build-lock.json $(APP_BUILD)/package-lock.json; \
	fi

	if [ ! -d $(APP_BUILD)/node_modules ]; then \
		npm ci --no-progress --prefix $(APP_BUILD); \
	fi

	$(abs_top_srcdir)/packages/app/.bin/build/main.sh \
		${APP_SRC} \
		$(APP_BUILD)/node_modules \
		${abs_top_builddir}/build \
		$(PCSD_UNIX_SOCKET)

dev:
	@cd ./packages/dev-backend && .bin/dev-backend.sh

test:
	@cd ./packages/test && .bin/run-dev-tests.sh

test-modules-prepare:
	@cd ./packages/test && npx npm ci
	@cd ./packages/dev-backend && npx npm ci

ci-cluster-test:
	@cd ./packages/test && .bin/run-jest.sh -s -p src/test/realBackend

clean:
	rm -rf build
	rm pcs-web-ui-node-modules-*.tar.xz

init_nexus:
	@[ "${NEXUS_CERT_PATH}" ] || ( \
	  echo "Specify path of nexus certificate via NEXUS_CERT_PATH parameter, please"; \
		exit 1 )
	@.bin/init_nexus.sh ./packages ${NEXUS} ${NEXUS_CERT_PATH}

init:
	@if [ "${NEXUS_REPO}" ] && [ "${NEXUS_REPO}" = "false" ]; then \
		echo "Use \`make init NEXUS_REPO=false\` not to use the Nexus repo."; \
		.bin/init.sh ${NEXUS}; \
	else \
		echo "If you will need reinit with the Nexus repo run \`make init\`"
		.bin/init.sh
	fi

check_sources:
	@.bin/check-no-nexus.sh

lint:
	@.bin/lint.sh ./packages

fmt:
	npx prettier "packages/app/src/" --write
	packages/app/node_modules/.bin/eslint --fix --ext .js,.ts,.tsx packages/app/src/

.PHONY: bump-version
bump-version:
	@node .bin/bump-version.js $(version)
	@git tag -a -m "$(version) release" $(version) HEAD

dist-hook:
	$(abs_top_srcdir)/packages/app/.bin/package-build/fetch-and-pack.sh \
		$(APP_SRC) \
		packages/app \
		$(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz


install-exec-local:
	if [ "x${PCSD_WEBUI_DIR}" != "x" ]; then \
		mkdir -p ${PCSD_WEBUI_DIR}; \
		cp -r build/* ${PCSD_WEBUI_DIR}; \
	else \
	  echo "No install location found, skipping installation"; \
	fi

clean-local:
	if [ "${abs_top_builddir}" != "${abs_top_srcdir}" ]; then \
		rm -rf ${abs_top_builddir}/packages/app/node_modules; \
		rm -rf ${abs_top_builddir}/packages/app/package*.json; \
		rm -rf ${abs_top_builddir}/build; \
	fi

generate-package-build:
	@packages/app/.bin/package-build/generate.sh packages/app


npm_install:
	@.bin/npm_install.sh ./packages

all: build

.PHONY: test build
