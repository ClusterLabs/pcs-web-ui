/* eslint-disable no-console */
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const parserUrlEncoded = bodyParser.urlencoded({ extended: false });
const parserJson = bodyParser.json();

export type Handler = (req: Request, res: Response) => void;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type R = any;
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`${process.env.SCENARIO}: Listening on port ${port}`);
  console.log(
    app._router.stack
      .filter((r: R) => r.route)
      .map((r: R) => `${r.route.stack[0].method}: ${r.route.path}`),
  );
});

const getDelay = (envDelay: string | undefined, defaultDelay: number) => {
  const delay = Number.parseInt(envDelay || `${defaultDelay}`, 10);
  if (Number.isNaN(delay)) {
    return defaultDelay;
  }
  return delay;
};

const delayed = (handler: Handler): Handler => (req, res) => {
  setTimeout(
    () => handler(req, res),
    getDelay(process.env.DELAY, 100)
      + Math.floor(getDelay(process.env.DELAY_RND, 100) * Math.random()),
  );
};

const clusterGet = (url: string) => (handler: Handler) =>
  app.get(`/managec/:clusterUrlName/${url}`, delayed(handler));

const clusterPost = (url: string) => (handler: Handler) =>
  app.post(
    `/managec/:clusterUrlName/${url}`,
    parserUrlEncoded,
    delayed(handler),
  );

const manageGet = (url: string) => (handler: Handler) =>
  app.get(`/manage/${url}`, delayed(handler));

const managePost = (url: string) => (handler: Handler) =>
  app.post(`/manage/${url}`, parserUrlEncoded, delayed(handler));

export const login = (handler: Handler) =>
  app.post("/ui/login", parserUrlEncoded, delayed(handler));

export const importedClusterList = (handler: Handler) =>
  app.get("/imported-cluster-list", delayed(handler));

const lib = (url: string) => (handler: Handler) =>
  app.post(
    `/managec/:clusterUrlName/api/v1/${url}/v1`,
    parserJson,
    delayed(handler),
  );

// manage
export const existingCluster = managePost("existingcluster"); // adds existing cluster
export const authGuiAgainstNodes = managePost("auth_gui_against_nodes");
export const checkAuthAgainstNodes = manageGet("check_auth_against_nodes");
export const canAddClusterOrNodes = manageGet("can-add-cluster-or-nodes");

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
export const sendKnownHosts = clusterPost("send-known-hosts");
export const resourceClone = clusterPost("resource_clone");
export const resourceUnclone = clusterPost("resource_unclone");
export const getResourceAgentMetadata = clusterGet(
  "get_resource_agent_metadata",
);

// library access
export const resourceCreate = lib("resource-create");
export const resourceManage = lib("resource-manage");
export const resourceUnmanage = lib("resource-unmanage");
export const resourceDisable = lib("resource-disable");
export const resourceEnable = lib("resource-enable");
export const clusterAddNodes = lib("cluster-add-nodes");
export const clusterRemoveNodes = lib("cluster-remove-nodes");
export const nodeStandbyUnstandby = lib("node-standby-unstandby");
export const nodeMaintenanceUnmaintenance = lib(
  "node-maintenance-unmaintenance",
);
