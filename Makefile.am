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
			  .bin/npm_install.sh \
			  .bin/render-spec.sh \
			  .browserslistrc \
			  rpm/pcs-web-ui.spec.in \
			  COPYING \
			  .gitlab-ci.yml \
			  make/git-version-gen \
			  README.md \
			  typos.toml 
			  $(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz\
			  .version

CLEANFILES		= \
			  $(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz

TARFILES		= \
			  $(PACKAGE_NAME)-$(VERSION).tar.bz2 \
			  $(PACKAGE_NAME)-$(VERSION).tar.gz \
			  $(PACKAGE_NAME)-$(VERSION).tar.xz \
			  $(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz
SPEC			= rpm/$(PACKAGE_NAME).spec

NEXUS = "https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
PROJECT_DIR = $(shell pwd)
APP_MODULES_DIR = $(shell realpath ${PROJECT_DIR}/packages/app/node_modules)

APP_SRC = $(abs_top_srcdir)/packages/app
APP_BUILD = $(abs_top_builddir)/packages/app
RPM_DIR = $(abs_top_builddir)/rpm
BUILD_DIR = $(abs_top_builddir)/build
METAINFO_FILE = org.clusterlabs.cockpit_pcs_web_ui.metainfo.xml

app:
	if [ ! -d $(APP_BUILD)/node_modules ]; then \
		npm ci --no-progress --prefix $(APP_BUILD); \
	fi
	@$(abs_top_srcdir)/packages/dev/.bin/dev-server.sh \
		${APP_SRC} \
		$(APP_BUILD)/node_modules \
		$(BUILD_DIR)

build:
	if [ "${abs_top_builddir}" != "${abs_top_srcdir}" ]; then \
		mkdir -p $(APP_BUILD); \
	  cp $(APP_SRC)/package.json $(APP_BUILD)/package.json; \
	  cp $(APP_SRC)/package-lock.json $(APP_BUILD)/package-lock.json; \
	fi

	if [ ! -d $(APP_BUILD)/node_modules ]; then \
		npm ci --no-progress --prefix $(APP_BUILD); \
	fi

	$(abs_top_srcdir)/packages/app/.bin/build/main.sh \
		${APP_SRC} \
		$(APP_BUILD)/node_modules \
		$(BUILD_DIR) \
		$(PCSD_UNIX_SOCKET)

dev:
	@cd ./packages/dev-backend && .bin/dev-backend.sh

test:
	@cd ./packages/test && .bin/run-dev-tests.sh

test-modules-prepare:
	@cd ./packages/test && npm ci
	@cd ./packages/dev-backend && npm ci

ci-cluster-test:
	@cd ./packages/test && .bin/run-jest.sh -s -p src/test/realBackend

clean:
	rm -rf build
	rm -f pcs-web-ui-node-modules-*.tar.xz

init_nexus:
	@[ "${NEXUS_CERT_PATH}" ] || ( \
	  echo "Specify path of nexus certificate via NEXUS_CERT_PATH parameter, please"; \
		exit 1 )
	@.bin/init_nexus.sh ./packages ${NEXUS} ${NEXUS_CERT_PATH}

init:
	@if [ "${NEXUS_REPO}" ] && [ "${NEXUS_REPO}" = "false" ]; then \
		echo "If you will need reinit with the Nexus repo run \`make init\`"; \
		.bin/init.sh; \
	else \
		echo "Use \`make init NEXUS_REPO=false\` not to use the Nexus repo."; \
		.bin/init.sh ${NEXUS}; \
	fi

check_sources:
	@.bin/check-no-nexus.sh

lint:
	@npx biome lint --error-on-warnings ./

fmt:
	npx biome format --write ./

.PHONY: bump-version
bump-version:
	@node .bin/bump-version.js $(version)
	@git commit -a -m "bump new version ($(version))"
	@git tag -a -m "$(version) release" $(version) HEAD

dist-hook:
	$(abs_top_srcdir)/packages/app/.bin/fetch-and-pack-node-modules.sh \
		$(APP_SRC) \
		packages/app \
		$(PACKAGE_NAME)-node-modules-$(VERSION).tar.xz
	echo $(VERSION) > $(distdir)/.tarball-version
	echo $(SOURCE_EPOCH) > $(distdir)/source_epoch


install-exec-local:
if ENABLE_STANDALONE
	mkdir -p $(DESTDIR)/$(PCSD_WEBUI_DIR)
	cp -r $(BUILD_DIR)/for-standalone/* $(DESTDIR)/$(PCSD_WEBUI_DIR)
endif

if ENABLE_COCKPIT
	mkdir -p $(DESTDIR)/$(COCKPIT_DIR)/ha-cluster
	mkdir -p $(DESTDIR)/$(METAINFO_DIR)
	cp -r $(BUILD_DIR)/for-cockpit/* $(DESTDIR)/$(COCKPIT_DIR)/ha-cluster
	cp $(APP_SRC)/$(METAINFO_FILE) $(DESTDIR)/$(METAINFO_DIR)
endif

uninstall-local:
	rm -rf $(DESTDIR)/$(PCSD_WEBUI_DIR)/*
	rm -rf $(DESTDIR)/$(COCKPIT_DIR)/ha-cluster
	rm -f $(DESTDIR)/$(METAINFO_DIR)/$(METAINFO_FILE)

clean-local:
	if [ "${abs_top_builddir}" != "${abs_top_srcdir}" ]; then \
		rm -rf $(APP_BUILD)/node_modules; \
		rm -rf $(APP_BUILD)//package*.json; \
		rm -rf $(BUILD_DIR); \
		rm -f ${abs_top_builddir}/.version; \
	fi

npm_install:
	@.bin/npm_install.sh ./packages

all: build

BUILT_SOURCES	= .version
.version:
	echo $(VERSION) > $@-t && mv $@-t $@

VERSIONGENOPTS		= \
			  --fallback $(VERSION) .tarball-version .gitarchivever --prefix ""

$(SPEC): $(SPEC).in .version config.status
	rm -f $@-t $@
	date="`LC_ALL=C $(UTC_DATE_AT)$(SOURCE_EPOCH) "+%a %b %d %Y"`" && \
	full_version="`cd $(abs_srcdir); make/git-version-gen $(VERSIONGENOPTS)`" && \
	.bin/render-spec.sh \
	  $@.in \
	  $$full_version \
	  "$$date" \
	  $(PCSD_WEBUI_DIR) \
	  $(COCKPIT_DIR) \
	  $(PCSD_UNIX_SOCKET) \
	  $(METAINFO_DIR)/$(METAINFO_FILE) \
	  > $@-t
	chmod a-w $@-t
	mv $@-t $@
	rm -f $@-t*

RPMBUILDOPTS    = \
			--define "_sourcedir $(RPM_DIR)" \
		  --define "_specdir $(RPM_DIR)" \
		  --define "_builddir $(RPM_DIR)" \
		  --define "_srcrpmdir $(RPM_DIR)" \
		  --define "_rpmdir $(RPM_DIR)"

$(TARFILES):
	$(MAKE) dist
	cp $(TARFILES) $(RPM_DIR)

srpm: clean
	$(MAKE) $(SPEC) $(TARFILES)
	rpmbuild $(RPMBUILDOPTS) --nodeps -bs $(SPEC)

rpm: clean
	$(MAKE) $(SPEC) $(TARFILES)
	rpmbuild $(RPMBUILDOPTS) -ba $(SPEC)

.PHONY: test build
