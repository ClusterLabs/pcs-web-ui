const endpoints = require("dev/api/endpoints");
const dashboardResponses = require("app/scenes/dashboard/test/responses");

let isLoggedIn = false;

const jsonOr401 = result => (req, res) => {
  if (isLoggedIn) {
    res.json(result);
  } else {
    res.status(401).send();
  }
};

const clustersOverview = endpoints.clustersOverview(jsonOr401(
  dashboardResponses.dashboard([
    dashboardResponses.cluster.ok,
    dashboardResponses.cluster.error,
  ]),
));

const login = endpoints.login((req, res) => {
  if (req.body.username === "hacluster" && req.body.password === "hh") {
    isLoggedIn = true;
    res.send("1533967169-76"); // an ajax id, not important for this app
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
    login,
    logout,
    endpoints.clusterStatus(jsonOr401(dashboardResponses.cluster.ok)),
  ],
};
