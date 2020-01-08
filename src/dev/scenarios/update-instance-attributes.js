const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const clustersOverview = response => endpoints.clustersOverview(
  (req, res) => { res.json(response); },
);

const clusterStatus = (responseMap = {}) => endpoints.clusterStatus(
  (req, res) => {
    const clusterName = req.params.clusterUrlName;
    if (Object.keys(responseMap).includes(clusterName)) {
      res.json(responseMap[clusterName]);
    } else {
      res.status(404).send("Not found");
    }
  },
);
const getResourceAgentMetadata = response => endpoints.getResourceAgentMetadata(
  (req, res) => { res.json(response); },
);

const updateResource = endpoints.updateResource((req, res) => {
  /* eslint-disable no-underscore-dangle */
  const httpdAttribute = req.body._res_paramne_httpd;
  let result = {};
  if (httpdAttribute === "fail") {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  if (httpdAttribute === "invalid") {
    result = "invalid";
  } else if (httpdAttribute === "err") {
    result = {
      error: "true",
      stderr: "Stderr output",
      stdout: "Stdout output",
    };
  }
  res.json(result);
});

module.exports = {
  noConflict: [
    clustersOverview(responses.clustersOverview.withClusters([
      responses.clusterStatus.resourceTree,
    ])),
    clusterStatus({
      resourceTree: responses.clusterStatus.resourceTree,
    }),
    getResourceAgentMetadata(responses.resourceAgentMetadata.ok),
    updateResource,
  ],
};
