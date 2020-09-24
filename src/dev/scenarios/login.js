import * as endpoints from "dev/api/endpoints";
import * as responses from "dev/api/responses/all";

let isLoggedIn = false;

const jsonOr401 = result => (_req, res) => {
  if (isLoggedIn) {
    res.json(result);
  } else {
    res.status(401).send();
  }
};

const importedClusterList = endpoints.importedClusterList(
  jsonOr401(
    responses.importedClusterList.withClusters([
      responses.clusterStatus.ok.cluster_name,
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

const logout = endpoints.logout((_req, res) => {
  isLoggedIn = false;
  res.send("OK");
});

module.exports = {
  noLogged: [
    importedClusterList,
    login,
    logout,
    endpoints.clusterStatus(jsonOr401(responses.clusterStatus.ok)),
  ],
};
