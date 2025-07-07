# PCS WEB UI

Web interface for [pcs] - a Corosync and
Pacemaker configuration tool.

It can run in two modes:
* a standalone application (provided by `pcsd` backend from [pcs])
* a cockpit plugin

## Prerequisites

* [Node.js](http://nodejs.org/) v18+ (with NPM)
* autoconf, automake
* pkgconf
* [pcs]
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
* `--with-pcsd-webui-dir` to specify standalone installation directory
* `--with-cockpit-dir` to specify cockpit plugin installation directory

Make sure to also install pcs if you haven't installed it yet. Pcsd needs to be running in order for pcs-web-ui to work, even for the cockpit plugin:
```sh
systemctl enable --now pcsd
```

[pcs]: https://github.com/ClusterLabs/pcs
