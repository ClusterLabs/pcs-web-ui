const bodyParser = require("body-parser");
const { get, post } = require("app/test/scenarios");

const parser = bodyParser.urlencoded({ extended: false });

module.exports = {
  login: handler => post("/ui/login", parser, handler),
  logout: handler => get("/ui/logout", handler),
};
