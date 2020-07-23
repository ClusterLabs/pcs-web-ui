const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

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
  endpoints.getResourceAgentList((req, res) => {
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

const updateResource = endpoints.updateResource((req, res) => {
  /* eslint-disable no-underscore-dangle */
  switch (req.body.name) {
    case "fail":
      res.status(500).send("SOMETHING WRONG");
      break;
    case "invalid":
      res.json("invalid");
      break;
    case "err":
      res.json({
        error: "true",
        stderr: "Stderr output",
        stdout: "Stdout output",
      });
      break;
    default:
      res.json({});
  }
});

module.exports = {
  all: [
    importedClusterList(
      responses.importedClusterList.withClusters([
        responses.clusterStatus.resourceTree.cluster_name,
      ]),
    ),
    clusterStatus({
      resourceTree: responses.clusterStatus.resourceTree,
    }),
    getResourceAgentList(responses.resourceAgentList.ok),
    getResourceAgentMetadata(responses.resourceAgentMetadata.ok),
    getFenceAgentMetadata(responses.fenceAgentMetadata.ok),
    clusterProperties(responses.clusterProperties.ok),
    updateResource,
  ],
};