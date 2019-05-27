/* eslint-disable import/no-dynamic-require */
const bodyParser = require("body-parser");

const scenes = "../../src/app/scenes";
const dashboardRequests = require(`${scenes}/dashboard/test/requests`);
const dashboardResponses = require(`${scenes}/dashboard/test/responses`);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const POST = "post";
const GET = "get";

let isLoggedIn = false;

const dashboardOverview = dashboardRequests.overview((req, res) => {
  if (isLoggedIn) {
    res.json(dashboardResponses.dashboard([]));
  } else {
    res.status(401).send();
  }
});

const login = {
  url: "/ui/login",
  method: POST,
  middleParams: [urlencodedParser],
  handler: (req, res) => {
    if (req.body.username === "hacluster" && req.body.password === "hh") {
      isLoggedIn = true;
      res.send("1533967169-76"); // an ajax id, not important for this app
      return;
    }
    res.status(401).send('{"notauthorized":"true"}');
  },
};

const logout = {
  url: "/ui/logout",
  method: GET,
  handler: (req, res) => {
    isLoggedIn = false;
    res.send("OK");
  },
};

module.exports = {
  noLogged: [
    dashboardOverview,
    login,
    logout,
  ],
};
