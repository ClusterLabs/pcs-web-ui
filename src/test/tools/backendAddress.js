const HOST = "http://localhost:3000";
const url = (urlPath = "/") => `${HOST}/ui${urlPath}`;

module.exports = {
  HOST,
  url,
};
