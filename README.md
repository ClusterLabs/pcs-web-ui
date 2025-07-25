# PCS Web UI

Web interface for [PCS] - a Corosync and
Pacemaker configuration tool.

It can run in two modes:
| a standalone application <br> (provided by `pcsd` backend from [pcs]) | a [Cockpit] plugin |
|:---:|:---:|
| <img width="400" height="auto" alt="Image" src="https://github.com/user-attachments/assets/af54d3d2-d5d6-4f51-b8f3-8c1dc502f575" /> | <img width="400" height="auto" alt="Image" src="https://github.com/user-attachments/assets/fc638b75-7d0e-4cc4-be53-b3f155aadd5a" /> |

More screenshots can be found here: https://github.com/ClusterLabs/pcs-web-ui/issues/81

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
