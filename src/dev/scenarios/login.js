const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

let isLoggedIn = false;

const jsonOr401 = result => (req, res) => {
  if (isLoggedIn) {
    res.json(result);
  } else {
    res.status(401).send();
  }
};

const clustersOverview = endpoints.clustersOverview(
  jsonOr401(
    responses.clustersOverview.withClusters([
      responses.clusterStatus.ok,
      responses.clusterStatus.error,
    ]),
  ),
);

const importedClusterList = endpoints.importedClusterList(
  jsonOr401(
    responses.importedClusterList.withClusters([
      responses.clusterStatus.ok,
      responses.clusterStatus.error,
    ]),
  ),
);

const login = endpoints.login((req, res) => {
  if (req.body.username === "hacluster" && req.body.password === "hh") {
    isLoggedIn = true;
    res.send("1533967169-76"); // an ajax id, not important for this app
    return;
  }
  if (req.body.username === "user1" && req.body.password === "uu") {
    isLoggedIn = true;
    res.send("1234567890-12"); // an ajax id, not important for this app
    return;
  }
  res.status(401).send('{"notauthorized":"true"}');
});

const logout = endpoints.logout((req, res) => {
  isLoggedIn = false;
  res.send("OK");
});

module.exports = {
  noLogged: [
    clustersOverview,
    importedClusterList,
    login,
    logout,
    endpoints.clusterStatus(jsonOr401(responses.clusterStatus.ok)),
  ],
};
