# Contributing to PCS WEB UI

## Basic workspace preparation

Clone this repository (`git clone <repository-url>`) and cd into it. Then run:

```sh
./autogen.sh
./configure
make init
```

The command `make init` (without parameters) will perform 3 tasks:
* set up the workspace to use a non-standard registry if requested (see below)
* install the git pre-commit hook with various checks
* install necessary `npm` packages

### Non-standard npm registry

To use an npm registry other than the default `https://registry.npmjs.org`,
provide the registry URL and optionally the path to a certificate file as
parameters. For example:
```sh
make init \
  NPM_REGISTRY=https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org \
  NPM_CAFILE=/path/to/ca.pem
```
You can also configure the registry after running `make init`. The following
commands are equivalent to the previous example:
```sh
make init
make init_registry \
  NPM_REGISTRY=https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org \
  NPM_CAFILE=/path/to/ca.pem
```

When using a custom registry, package URLs in `package-lock.json` files will
reference your chosen proxy registry. The installed git pre-commit hook
automatically normalizes these URLs back to the standard `registry.npmjs.org`
format before committing.

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
