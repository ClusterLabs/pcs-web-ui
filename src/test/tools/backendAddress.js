const HOST = "http://localhost:3000";
const url = (urlPath = "/") => `${HOST}/ui${urlPath}`;
const link = (pathRest) => `/ui${pathRest}`;

module.exports = {
  HOST,
  url,
  link,
};
