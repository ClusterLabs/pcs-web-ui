start:
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

server:
	NODE_PATH=src/ npx nodemon --watch dev/ --watch src/app dev/backend.js $(SCENARIO)

test:
	npx react-scripts test --env=jsdom --testPathPattern=src/app

testi:
	npx react-scripts test --runInBand --testPathPattern=src/__tests__/integration

testa:
	npx react-scripts test --env=jsdom --runInBand

tests:
	NODE_PATH=src/ npx mocha src/app/test/bootstrap.js --no-timeouts --recursive src/app/scenes/**/test/*.js
