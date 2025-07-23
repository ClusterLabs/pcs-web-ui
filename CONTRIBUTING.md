# Contributing to PCS WEB UI

## Basic workspace preparation

Clone this repository (`git clone <repository-url>`) and cd into it. Then run:

```sh
./autogen.sh
./configure
make init
```

The command `make init` (without parameters) will do 3 things:
* setup workspace to use Nexus repository (see bellow)
* setup git pre-commit hook with various checks
* install necessary `npm` packages

### Nexus repository

There is a Nexus repository mirroring Npmjs repository to reduce
`registry.npmjs.org` load. The command `make init` setup everything necessary
for using Nexus repository.

For the setup, the certificate is necessary. The `make init` command will ask
for it.

With this setup, `npm` packages in files `package-lock.json` will be resolved
with Nexus urls. The installed git pre-commit hook changes such urls to direct
`registry.npmjs.org` urls.

### Initialization without Nexus

Run `make init NEXUS_REPO=false`. Nexus can be added in the future by
`make init_nexus NEXUS_CERT_PATH=/path/to/certificate`.

## Running dev environment

First, create `Makefile`
```sh
./autogen.sh
./configure
```

Then run `make dev` to run server mocking `pcsd` responses:
* open <http://localhost:5000> to view it in the browser
* dev backend doesn't run fully featured backend mock
* it runs only scenario with limited features

## Running tests

* `make test`

### Test run configuration
If `inotifywait` is available, tests run in watch mode — they automatically
re-run when source files change.

Test behavior can be customized via environment variables.
You can set them directly or load them from a shell config file before each run.

Use the `PCS_WUI_DEV_CONF` environment variable to point to a config file.
This file is also watched by inotifywait.

Example:
```sh
PCS_WUI_DEV_CONF=$HOME/project/pcs-web-ui.tools/test-config.sh make test
```

Example configuration script content:
```sh
# Run in headless mode (by default, browser is visible)
export PCS_WUI_TESTS_HEADLESS=true

# Select test type:
# - mocked (default): uses mocked backend responses
# - standalone: uses real backend in standalone mode
# - cockpit: uses real backend in cockpit mode
export PCS_WUI_TEST_TYPE=standalone

# Real backend connection settings
export PCSD_PROTOCOL_1=https
export PCSD_HOST_1=localhost
export PCSD_PORT_1=2224

# Node name as seen by the real backend
export PCSD_NODE_1=node1.vm

# Real backend credentials
export PCSD_USERNAME_1=hacluster
export PCSD_PASSWORD_1=password

# Directory to store video recordings (set to enable)
# export PCS_WUI_TESTS_VIDEO_DIR="/tmp/pcs-web-ui-video"
unset PCS_WUI_TESTS_VIDEO_DIR

# Select specific tests to run (paths relative to packages/test/src/test/scenes)
set -- \
  acl/role-add-permissions.test.ts \
  acl/role-assign-group.test.ts

export PCS_WUI_TESTS=$*
```

See also [gitlab-ci.yml](.gitlab-ci.yml) for more examples.
