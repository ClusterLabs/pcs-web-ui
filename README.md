# PCS WEB UI

Web interface for [pcs](https://github.com/ClusterLabs/pcs) - a Corosync and
Pacemaker configuration tool.

## Prerequisites

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Preparation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Development
### Running dev environment

* `make start`
* `make server SCENARIO=<backend scenario>`
    * dev backend doesn't run fully featured backend mock
    * it runs only scenario with limited features
    * all possible scenarios are listed by launching only `make server`
* Open http://localhost:3000 to view it in the browser

### Running tests

* `make tests`

## Building and instalation

* `make build`
* production build is created inside `build` directory
* content of `build` directory copy to `pcsd/public/ui/` directory
