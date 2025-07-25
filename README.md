# PCS Web UI

Web interface for [PCS] - a Corosync and
Pacemaker configuration tool.

It can run in two modes:
* a standalone application (provided by `pcsd` backend from [pcs])
* a [Cockpit] plugin

## Prerequisites

* [Node.js](http://nodejs.org/) v18+ (with NPM)
* autoconf, automake
* pkgconf
* [PCS]
* [Cockpit] (optional)

## Building and installation

To install PCS Web UI run the following in terminal:

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

Make sure to also install PCS if you haven't installed it yet. Pcsd needs to be running in order for PCS Web UI to work, even for the Cockpit plugin:
```sh
systemctl enable --now pcsd
```

[PCS]: https://github.com/ClusterLabs/pcs
[Cockpit]: https://cockpit-project.org/
