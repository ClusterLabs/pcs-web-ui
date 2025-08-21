# PCS Web UI

Web interface for [PCS] - a Corosync and
Pacemaker configuration tool.

It can run in two modes:
| a standalone application <br> (provided by `pcsd` backend from [pcs]) | a [Cockpit] plugin |
|:---:|:---:|
| <img width="400" height="auto" alt="Image" src="https://github.com/user-attachments/assets/7299d581-0978-47b3-ad3c-42a43d7db644" /> | <img width="400" height="auto" alt="Image" src="https://github.com/user-attachments/assets/5552ed10-f63a-4106-b279-249ab51f8ef5" /> |

More screenshots can be found here: https://github.com/ClusterLabs/pcs-web-ui/issues/81

## Prerequisites

* [Node.js](http://nodejs.org/) v18+ (with NPM)
* autoconf, automake
* pkgconf
* [PCS]
  - PCS Web UI main branch can be delayed compared to PCS main branch
  - please use
    [released PCS Web UI version](https://github.com/ClusterLabs/pcs-web-ui/releases)
    and [compatible PCS version](/docs/pcs-compatibility.md)
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
