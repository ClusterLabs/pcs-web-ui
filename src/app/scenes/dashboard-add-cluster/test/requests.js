const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const GET = "get";
const POST = "post";

const checkAuth = handler => ({
  url: "/manage/check_auth_against_nodes",
  method: GET,
  handler,
});

const addCluster = handler => ({
  url: "/manage/existingcluster",
  method: POST,
  middleParams: [urlencodedParser],
  handler,
});

const authenticate = handler => ({
  url: "/manage/auth_gui_against_nodes",
  method: POST,
  middleParams: [urlencodedParser],
  handler,
});

module.exports = {
  addCluster,
  authenticate,
  checkAuth,
};
