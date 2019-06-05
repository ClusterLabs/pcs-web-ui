/* eslint-disable import/no-dynamic-require */
const app = "../../src/app";
const loginRequests = require(`${app}/scenes/login/test/requests`);
const dashboardRequests = require(`${app}/scenes/dashboard/test/requests`);
const dashboardResponses = require(`${app}/scenes/dashboard/test/responses`);

let isLoggedIn = false;

const jsonOr401 = result => (req, res) => {
  if (isLoggedIn) {
    res.json(result);
  } else {
    res.status(401).send();
  }
};

const dashboardOverview = dashboardRequests.overview(jsonOr401(
  dashboardResponses.dashboard([
    dashboardResponses.cluster.ok,
    dashboardResponses.cluster.error,
  ]),
));

const login = loginRequests.login((req, res) => {
  if (req.body.username === "hacluster" && req.body.password === "hh") {
    isLoggedIn = true;
    res.send("1533967169-76"); // an ajax id, not important for this app
    return;
  }
  res.status(401).send('{"notauthorized":"true"}');
});

const logout = loginRequests.logout((req, res) => {
  isLoggedIn = false;
  res.send("OK");
});

module.exports = {
  noLogged: [
    dashboardOverview,
    login,
    logout,
    dashboardRequests.status(jsonOr401(dashboardResponses.cluster.ok)),
  ],
};
