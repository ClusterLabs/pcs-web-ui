const bodyParser = require("body-parser");

const parser = bodyParser.urlencoded({ extended: false });

const createScenarioHandler = method => (url, ...args) => {
  if (args.length < 1) {
    throw new Error(`Missing handler for scenario.${method}("${url}").`);
  }

  return {
    url,
    method,
    middleParams: args.slice(0, -1),
    handler: args.slice(-1)[0],
  };
};

const get = createScenarioHandler("get");
const post = createScenarioHandler("post");

module.exports = {
  login: handler => post("/ui/login", parser, handler),
  logout: handler => get("/ui/logout", handler),
  clustersOverview: handler => get("/clusters_overview", handler),
  importedClusterList: handler => get("/imported-cluster-list", handler),
  clusterStatus: handler =>
    get("/managec/:clusterUrlName/cluster_status", handler),
  addCluster: handler => post("/manage/existingcluster", parser, handler),
  authenticateAgainstNodes: handler =>
    post("/manage/auth_gui_against_nodes", parser, handler),
  checkAuthAgainstNodes: handler =>
    get("/manage/check_auth_against_nodes", handler),
  getResourceAgentList: handler =>
    get("/managec/:clusterUrlName/get_resource_agent_list", handler),
  getResourceAgentMetadata: handler =>
    get("/managec/:clusterUrlName/get_resource_agent_metadata", handler),
  getFenceAgentMetadata: handler =>
    get("/managec/:clusterUrlName/get_fence_agent_metadata", handler),
  clusterProperties: handler =>
    get("/managec/:clusterUrlName/cluster_properties", handler),
  updateResource: handler =>
    post("/managec/:clusterUrlName/update_resource", parser, handler),
};
