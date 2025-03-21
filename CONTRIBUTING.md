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
