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

### Pre-commit hook

The git pre-commit hook installed by `make init` performs two actions:

1. **Registry normalization** — rewrites any non-standard npm registry URLs in
   `package-lock.json` files to the standard `registry.npmjs.org` and stages the
   changes automatically.

2. **Code quality checks** — runs Biome lint, Biome format, and a Makefile file
   listing check (verifies that newly added files are registered in the
   corresponding `Makefile.am`). If any check fails, the hook prompts to continue
   or abort the commit.

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
make typecheck
```

The project uses [Biome](https://biomejs.dev/) for linting and formatting.
TypeScript type checking is available via `make typecheck`, which runs
`tsc --noEmit` across all packages (app, dev, test). To check only a specific
package, run the underlying script directly:

```sh
.bin/typecheck.sh packages/app
```

Type checking also runs automatically in CI as part of `make
prevent_dev_mistakes`.

## Adding new source files

The project uses autotools for distribution. Source files are listed in
`Makefile.am` within each package directory (`packages/app/Makefile.am`,
`packages/test/Makefile.am`). When adding a new source file — whether application
code or a test — register it in the corresponding `Makefile.am` (alphabetically
sorted within the existing list). The same applies to documentation files in
`docs/` — they are listed in the root `Makefile.am`. Files not listed in the
appropriate `Makefile.am` will not be included in the distribution tarball.

## Adding dependencies

Every npm dependency is a tradeoff. Each package adds maintenance burden, widens
the attack surface for CVEs, and increases the risk of supply-chain issues.
Prefer local solutions when the scope is small enough — a short utility function
is often better than pulling in a new package. When a dependency is genuinely
needed, the choice should be conscious and justified.

## Running tests

* `make test`

See [testing.md](testing.md) for test categories, configuration options, and
infrastructure details.

## Continuous integration

CI runs on GitLab CI and delegates test execution to
[Testing Farm](https://docs.testing-farm.io), which provisions VMs and runs
[TMT](https://tmt.readthedocs.io) plans. Tests run on multiple RHEL and Fedora
versions (see the compose matrix in `.gitlab-ci.yml`).

The TMT pipeline executes these steps in order (defined in `tests.fmf`):

1. **autotools** — `autogen.sh`, `configure`, `make init_registry`
2. **prevent_dev_mistakes** — npm registry check, TypeScript type check, Biome
   lint and format (`make prevent_dev_mistakes`)
3. **distcheck** — `make distcheck` (builds distribution tarball)
4. **rpm_build** — builds RPM packages
5. **pcsd_integration_test_standalone** — installs built RPMs and runs end-to-end
   tests against a real pcsd instance in standalone mode
6. **pcsd_integration_test_cockpit** — same as above but through Cockpit

The `prevent_dev_mistakes` step provides fast feedback on code quality issues.
It is the CI equivalent of the checks described in
[Verifying code](#verifying-code), with the addition of the npm registry check.

Configuration files: `.gitlab-ci.yml` (GitLab CI job definition), `plans.fmf`
(TMT plan — environment, preparation, execution), `tests.fmf` (individual TMT
test steps).
