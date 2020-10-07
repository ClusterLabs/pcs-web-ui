import bodyParser from "body-parser";

const parserUrlEncoded = bodyParser.urlencoded({ extended: false });
const parserJson = bodyParser.json();

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

const manageGet = url => handler => get(`/manage/${url}`, handler);
const managePost = url => handler =>
  post(`/manage/${url}`, parserUrlEncoded, handler);

const clusterGet = url => handler =>
  get(`/managec/:clusterUrlName/${url}`, handler);
const clusterPost = url => handler =>
  post(`/managec/:clusterUrlName/${url}`, parserUrlEncoded, handler);

const lib = urlName => handler =>
  post(`/managec/:clusterUrlName/api/v1/${urlName}/v1`, parserJson, handler);

export const login = handler => post("/ui/login", parserUrlEncoded, handler);
export const logout = handler => get("/ui/logout", handler);
export const importedClusterList = handler =>
  get("/imported-cluster-list", handler);

// manage
export const existingCluster = managePost("existingcluster"); // adds existing cluster
export const authGuiAgainstNodes = managePost("auth_gui_against_nodes");
export const checkAuthAgainstNodes = manageGet("check_auth_against_nodes");

// cluster
export const clusterStatus = clusterGet("cluster_status");
export const getAvailResourceAgents = clusterGet("get_avail_resource_agents");
export const getFenceAgentMetadata = clusterGet("get_fence_agent_metadata");
export const clusterProperties = clusterGet("cluster_properties");
export const updateResource = clusterPost("update_resource");
export const resourceRefresh = clusterPost("resource_refresh");
export const resourceCleanup = clusterPost("resource_cleanup");
export const removeResource = clusterPost("remove_resource");
export const clusterStart = clusterPost("cluster_start");
export const clusterStop = clusterPost("cluster_stop");
export const getResourceAgentMetadata = clusterGet(
  "get_resource_agent_metadata",
);

// library access
export const resourceCreate = lib("resource-create");
export const resourceManage = lib("resource-manage");
export const resourceUnmanage = lib("resource-unmanage");
export const resourceDisable = lib("resource-disable");
export const resourceEnable = lib("resource-enable");
export const nodeStandbyUnstandby = lib("node-standby-unstandby");
export const nodeMaintenanceUnmaintenance = lib(
  "node-maintenance-unmaintenance",
);
