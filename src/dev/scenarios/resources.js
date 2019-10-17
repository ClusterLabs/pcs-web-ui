const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const clustersOverview = response => endpoints.clustersOverview(
  (req, res) => { res.json(response); },
);

const clusterStatus = response => endpoints.clusterStatus(
  (req, res) => { res.json(response); },
);

const getResourceAgentMetadata = response => endpoints.getResourceAgentMetadata(
  (req, res) => { res.json(response); },
);

module.exports = {
  tree: [
    clustersOverview(responses.clustersOverview.withClusters([
      responses.clusterStatus.resourceTree,
    ])),
    clusterStatus(responses.clusterStatus.resourceTree),
    getResourceAgentMetadata(responses.resourceAgentMetadata.ok),
  ],
};
