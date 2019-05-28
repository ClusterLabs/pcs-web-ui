const bodyParser = require("body-parser");
const { get, post } = require("app/test/scenarios");

const parser = bodyParser.urlencoded({ extended: false });

module.exports = {
  addCluster: handler => post("/manage/existingcluster", parser, handler),
  authenticate: handler => post(
    "/manage/auth_gui_against_nodes",
    parser,
    handler,
  ),
  checkAuth: handler => get("/manage/check_auth_against_nodes", handler),
};
