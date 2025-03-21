# PCS WEB UI

Web interface for [pcs](https://github.com/ClusterLabs/pcs) - a Corosync and
Pacemaker configuration tool.

It can run in two modes:
* a standalone application (provided by `pcsd` backend)
* a cockpit plugin

## Prerequisites

* [Node.js](http://nodejs.org/) v16.14.0+ (with NPM)
* autoconf, automake
* pkgconf
* [pcs](https://github.com/ClusterLabs/pcs)
* [cockpit](https://cockpit-project.org/) (optional)

## Building and installation

To install pcs-web-ui run the following in terminal:

```sh
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
