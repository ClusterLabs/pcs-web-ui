/* eslint-disable import/no-dynamic-require */
const bodyParser = require("body-parser");

const app = "../../src/app";
const dashboardRequests = require(`${app}/scenes/dashboard/test/requests`);
const dashboardResponses = require(`${app}/scenes/dashboard/test/responses`);
const { get, post } = require(`${app}/test/scenarios`);

const parser = bodyParser.urlencoded({ extended: false });

let isLoggedIn = false;

const dashboardOverview = dashboardRequests.overview((req, res) => {
  if (isLoggedIn) {
    res.json(dashboardResponses.dashboard([]));
  } else {
    res.status(401).send();
  }
});

const login = post("/ui/login", parser, (req, res) => {
  if (req.body.username === "hacluster" && req.body.password === "hh") {
    isLoggedIn = true;
    res.send("1533967169-76"); // an ajax id, not important for this app
    return;
  }
  res.status(401).send('{"notauthorized":"true"}');
});

const logout = get("/ui/logout", (req, res) => {
  isLoggedIn = false;
  res.send("OK");
});

module.exports = {
  noLogged: [
    dashboardOverview,
    login,
    logout,
  ],
};
