const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const clustersOverview = response => endpoints.clustersOverview(
  (req, res) => { res.json(response); },
);

const clusterStatus = response => endpoints.clusterStatus(
  (req, res) => { res.json(response); },
);

module.exports = {
  displayMulti: [
    clustersOverview(responses.clustersOverview.withClusters([
      responses.clusterStatus.ok,
      responses.clusterStatus.error,
      responses.clusterStatus.big,
      responses.clusterStatus.ok2,
    ])),
  ],
  goToCluster: [
    clustersOverview(responses.clustersOverview.withClusters([
      responses.clusterStatus.ok,
    ])),
    clusterStatus(responses.clusterStatus.ok),
  ],
};
