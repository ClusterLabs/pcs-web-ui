const responses = require("app/scenes/dashboard/test/responses");
const endpoints = require("dev/api/endpoints");

const clustersOverview = response => endpoints.clustersOverview(
  (req, res) => { res.json(response); },
);

const clusterStatus = response => endpoints.clusterStatus(
  (req, res) => { res.json(response); },
);

module.exports = {
  displayMulti: [
    clustersOverview(responses.dashboard([
      responses.cluster.ok,
      responses.cluster.error,
    ])),
  ],
  goToCluster: [
    clustersOverview(responses.dashboard([responses.cluster.ok])),
    clusterStatus(responses.cluster.ok),
  ],
};
