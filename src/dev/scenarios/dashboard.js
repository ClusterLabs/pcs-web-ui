const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const clustersOverview = response =>
  endpoints.clustersOverview((req, res) => {
    res.json(response);
  });

const importedClusterList = response =>
  endpoints.importedClusterList((req, res) => {
    res.json(response);
  });

const clusterStatus = (responseMap = {}) =>
  endpoints.clusterStatus((req, res) => {
    const clusterName = req.params.clusterUrlName;
    if (Object.keys(responseMap).includes(clusterName)) {
      res.json(responseMap[clusterName]);
    } else {
      res.status(404).send("Not found");
    }
  });

const getResourceAgentMetadata = response =>
  endpoints.getResourceAgentMetadata((req, res) => {
    res.json(response);
  });

const getResourceAgentList = response =>
  endpoints.getAvailResourceAgents((req, res) => {
    res.json(response);
  });

const getFenceAgentMetadata = response =>
  endpoints.getFenceAgentMetadata((req, res) => {
    res.json(response);
  });

const clusterProperties = response =>
  endpoints.clusterProperties((req, res) => {
    res.json(response);
  });

module.exports = {
  displayMulti: [
    clustersOverview(
      responses.clustersOverview.withClusters([
        responses.clusterStatus.ok,
        responses.clusterStatus.error,
        responses.clusterStatus.big,
        responses.clusterStatus.ok2,
        responses.clusterStatus.empty,
        responses.clusterStatus.resourceTree,
      ]),
    ),
    importedClusterList(
      responses.importedClusterList.withClusters([
        responses.clusterStatus.ok.cluster_name,
        responses.clusterStatus.error.cluster_name,
        responses.clusterStatus.big.cluster_name,
        responses.clusterStatus.ok2.cluster_name,
        responses.clusterStatus.empty.cluster_name,
        responses.clusterStatus.resourceTree.cluster_name,
      ]),
    ),
    clusterStatus({
      ok: responses.clusterStatus.ok,
      error: responses.clusterStatus.error,
      big: responses.clusterStatus.big,
      ok2: responses.clusterStatus.ok2,
      empty: responses.clusterStatus.empty,
      resourceTree: responses.clusterStatus.resourceTree,
    }),
    getResourceAgentList(responses.resourceAgentList.ok),
    getResourceAgentMetadata(responses.resourceAgentMetadata.ok),
    getFenceAgentMetadata(responses.fenceAgentMetadata.ok),
    clusterProperties(responses.clusterProperties.ok),
  ],
};
