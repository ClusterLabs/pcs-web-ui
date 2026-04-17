# Contributing to PCS WEB UI

## Applicable policies
Pull request must comply with the following policies:
* [AI policy](https://github.com/ClusterLabs/pcs/wiki/Policy-on-Use-of-Artificial-Intelligence-in-Pull-Requests)

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

## Verifying code

To check code quality quickly without running a full build or test suite:

```sh
npx biome lint --error-on-warnings ./
npx biome format ./
```

The project uses [Biome](https://biomejs.dev/) for linting and formatting. There
is no separate TypeScript type-checking step — type errors surface during `make
build` or indirectly through tests (`make test`).

## Adding new source files

The project uses autotools for distribution. Source files are listed in
`Makefile.am` within each package directory (`packages/app/Makefile.am`,
`packages/test/Makefile.am`). When adding a new source file — whether application
code or a test — register it in the corresponding `Makefile.am` (alphabetically
sorted within the existing list). The same applies to documentation files in
`docs/` — they are listed in the root `Makefile.am`. Files not listed in the
appropriate `Makefile.am` will not be included in the distribution tarball.

## Running tests

* `make test`

See [testing.md](testing.md) for test categories, configuration options, and
infrastructure details.
