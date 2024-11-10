# PCS WEB UI

Web interface for [pcs](https://github.com/ClusterLabs/pcs) - a Corosync and
Pacemaker configuration tool.

## Prerequisites

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* autoconf, automake

## Preparation

* `git clone <repository-url>` this repository
* change into the new directory
* `make init`

## Development

### Running dev environment

* `make app`
* `make dev`
    * dev backend doesn't run fully featured backend mock
    * it runs only scenario with limited features
* Open http://localhost:3000 to view it in the browser

### Running tests

* `make tests`

## Building and installation

To install pcs-web-ui run the following in terminal:
```shell
./autogen.sh
./configure
make
make install
```

### Fine-tuning the installation

You can add following flags to `./configure`:

* `--disable-cockpit` to disable cockpit installation
* `--disable-standalone` to disable standalone installation
* `-- with-pcsd-webui-dir` to specify standalone installation directory
* `--with-cockpit-dir` to specify cockpit plugin installation directory
