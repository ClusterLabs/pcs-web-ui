NEXUS="https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org"
LAST_COMMIT_HASH=$(shell git rev-parse HEAD)

ifndef NEXUS_REPO
	NEXUS_REPO=true
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
	@npx react-scripts build
	rm -f build/service-worker.js
	rm -f build/precache-manifest.*.js
	rm -f build/asset-manifest.json
	rm -f build/images/favicon.png
	find build/images -type d -empty -delete


# prepare tarball with node modules that are necessary to build the application
pack-modules:
	if [ -d "node_modules" ]; then mv node_modules node_modules.backup; fi
	PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npx npm ci
	rm -r \
	node_modules/puppeteer \
	node_modules/electron \
	node_modules/electron-download \
	node_modules/nightmare \
	node_modules/mocha \
	node_modules/@pollyjs \
	node_modules/chai \
	node_modules/nodemon \

	tar -Jcf pcs-web-ui-node-modules-${LAST_COMMIT_HASH}.tar.xz node_modules
	rm -r node_modules
	if [ -d "node_modules.backup" ]; then mv node_modules.backup node_modules; fi
	ls -l *.tar.xz


dev:
	@NODE_PATH=src/ node src/dev/backend.js --scenario=$(SCENARIO) --interactive


test:
	npx react-scripts test --env=jsdom --testPathPattern=src/app


testa:
	npx react-scripts test --env=jsdom --runInBand


tests:
	NODE_PATH=src/ npx mocha src/test/bootstrap.js \
		--no-timeouts --recursive --watch --watch-files src/app/,src/test/ src/test/scenes/*.js

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

.PHONY: test build
