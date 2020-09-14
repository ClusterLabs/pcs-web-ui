import bodyParser from "body-parser";

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

export const login = handler => post("/ui/login", parser, handler);

export const logout = handler => get("/ui/logout", handler);

export const clustersOverview = handler => get("/clusters_overview", handler);

export const importedClusterList = handler =>
  get("/imported-cluster-list", handler);

export const clusterStatus = handler =>
  get("/managec/:clusterUrlName/cluster_status", handler);

export const addCluster = handler =>
  post("/manage/existingcluster", parser, handler);

export const authenticateAgainstNodes = handler =>
  post("/manage/auth_gui_against_nodes", parser, handler);

export const checkAuthAgainstNodes = handler =>
  get("/manage/check_auth_against_nodes", handler);

export const getAvailResourceAgents = handler =>
  get("/managec/:clusterUrlName/get_avail_resource_agents", handler);

export const getResourceAgentMetadata = handler =>
  get("/managec/:clusterUrlName/get_resource_agent_metadata", handler);

export const getFenceAgentMetadata = handler =>
  get("/managec/:clusterUrlName/get_fence_agent_metadata", handler);

export const clusterProperties = handler =>
  get("/managec/:clusterUrlName/cluster_properties", handler);

export const updateResource = handler =>
  post("/managec/:clusterUrlName/update_resource", parser, handler);

export const resourceCreate = handler =>
  post("/managec/:clusterUrlName/resource-create", parser, handler);

export const resourceUnmanage = handler =>
  post("/managec/:clusterUrlName/resource-unmanage", parser, handler);
