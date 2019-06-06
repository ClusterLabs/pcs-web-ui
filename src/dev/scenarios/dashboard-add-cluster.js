const dashboardResponses = require("app/scenes/dashboard/test/responses");
const dashboardRequests = require("app/scenes/dashboard/test/requests");

const requests = require("app/scenes/dashboard-add-cluster/test/requests");

const checkAuth = () => requests.checkAuth((req, res) => {
  const nodeList = Array.isArray(req.query.node_list)
    ? req.query.node_list
    : [req.query.node_list]
  ;

  if (JSON.stringify(nodeList) === JSON.stringify(["error"])) {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  const nodesStates = {
    a: "Online",
    ab: "Online",
    b: "Unable to authenticate",
    c: "nonsense",
  };

  const result = nodeList.reduce(
    (states, node) => ({ ...states, [node]: nodesStates[node] || "Offline" }),
    {},
  );
  res.json(result);
});

const authenticateNodes = () => requests.authenticate((req, res) => {
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

const addCluster = () => (
  requests.addCluster((req, res) => {
    const nodeName = req.body["node-name"];
    if (nodeName === "ab") {
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
  })
);

const dashboardOverview = dashboardRequests.overview((req, res) => {
  res.json(dashboardResponses.dashboard([]));
});

module.exports = {
  variousNodes: [
    dashboardOverview,
    checkAuth(),
    addCluster(),
    authenticateNodes(),
  ],
};
