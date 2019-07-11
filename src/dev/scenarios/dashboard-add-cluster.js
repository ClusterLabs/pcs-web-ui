const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const checkAuth = endpoints.checkAuthAgainstNodes((req, res) => {
  const nodeList = Array.isArray(req.query.node_list)
    ? req.query.node_list
    : [req.query.node_list]
  ;

  if (JSON.stringify(nodeList) === JSON.stringify(["error"])) {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  const nodesStates = {
    ok: "Online",
    conflict: "Online",
    "no-auth": "Unable to authenticate",
    nonsense: "nonsense",
  };

  const result = nodeList.reduce(
    (states, node) => ({ ...states, [node]: nodesStates[node] || "Offline" }),
    {},
  );
  res.json(result);
});

const authenticate = endpoints.authenticateAgainstNodes((req, res) => {
  const { nodes } = JSON.parse(req.body.data_json);

  const expectedError = Object.keys(nodes).reduce(
    (result, nodeName) => (result || nodes[nodeName].password === "error"),
    false,
  );
  if (expectedError) {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  const expectedBadFormat = Object.keys(nodes).reduce(
    (result, nodeName) => (
      result || nodes[nodeName].password === "badformat"
    ),
    false,
  );
  if (expectedBadFormat) {
    res.json("Bad format");
    return;
  }

  res.json({
    node_auth_error: Object.keys(nodes).reduce(
      (result, nodeName) => ({
        ...result,
        [nodeName]: nodes[nodeName].password === "y" ? 0 : 1,
      }),
      {},
    ),
  });
});

const addCluster = endpoints.addCluster((req, res) => {
  const nodeName = req.body["node-name"];
  if (nodeName === "conflict") {
    res.status(400).send([
      "Configuration conflict detected.",
      "Some nodes had a newer configuration than the local node."
        + " Local node's configuration was updated."
        + "  Please repeat the last action if appropriate."
      ,
    ].join("\n\n"));
  } else {
    res.send("");
  }
});

const clustersOverview = endpoints.clustersOverview((req, res) => {
  res.json(responses.clustersOverview.empty);
});

module.exports = {
  variousNodes: [
    clustersOverview,
    checkAuth,
    addCluster,
    authenticate,
  ],
};
