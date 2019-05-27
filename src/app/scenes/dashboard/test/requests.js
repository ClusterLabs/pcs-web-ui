const { get } = require("app/test/scenarios");

module.exports = {
  overview: handler => get("/clusters_overview", handler),
  status: handler => get("/managec/:clusterUrlName/cluster_status", handler),
};
