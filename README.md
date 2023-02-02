# PCS WEB UI

Web interface for [pcs](https://github.com/ClusterLabs/pcs) - a Corosync and
Pacemaker configuration tool.

## Prerequisites

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

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

* `make build`
* production build is created inside `build` directory
* content of `build` directory copy to `pcsd/public/ui/` directory

### Building and installation for cockpit

* `make build BUILD_FOR_COCKPIT=true`
* production build is created inside `build` directory
* content of `build` directory copy (or symlink) to the path where cockpit will find it, e.g.
  - `mkdir -p ~/.local/share/cockpit`
  - `ln -snf "$PWD"/build ~/.local/share/cockpit/ha-cluster`
