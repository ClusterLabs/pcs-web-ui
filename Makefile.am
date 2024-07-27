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

NEXUS = "https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
PROJECT_DIR = $(shell pwd)
APP_MODULES_DIR = $(shell realpath ${PROJECT_DIR}/packages/app/node_modules)

PCSD_WEBUI_DIR = @PCSD_WEBUI_DIR@

app:
	@./packages/app/.bin/check-assumptions.sh
	@./packages/dev/.bin/dev-server.sh

build:
	if [ "${abs_top_builddir}" != "${abs_top_srcdir}" ]; then \
	  cp $(srcdir)/packages/app/package-build.json ${abs_top_builddir}/package.json; \
	  cp $(srcdir)/packages/app/package-build-lock.json ${abs_top_builddir}/package-lock.json; \
	fi
	if [ ! -d ${abs_top_builddir}/node_modules ]; then \
		npm ci --prefix ${abs_top_builddir}; \
	fi
	$(srcdir)/packages/app/.bin/check-assumptions.sh
	$(srcdir)/packages/app/.bin/build.sh ${abs_top_builddir}/node_modules ${abs_top_builddir}/build

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

install-exec-local:
	if [ "x${PCSD_WEBUI_DIR}" != "x" ]; then \
		mkdir -p ${PCSD_WEBUI_DIR}; \
		cp -r build/* ${PCSD_WEBUI_DIR}; \
	else \
	  echo "No install location found, skipping installation"; \
	fi

clean-local:
	if [ "${abs_top_builddir}" != "${abs_top_srcdir}" ]; then \
		rm -rf ${abs_top_builddir}/node_modules; \
		rm -rf ${abs_top_builddir}/build; \
		rm -rf ${abs_top_builddir}/package*.json; \
	fi

generate-package-build:
	@packages/app/.bin/package-build-gen.sh packages/app/package.json


npm_install:
	@.bin/npm_install.sh ./packages

all: build

.PHONY: test build
