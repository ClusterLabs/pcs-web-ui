import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { url as backendUrl, intercept, location } from "test/tools";

const VIEW = dt("task-node-add");
export const TASK = {
  VIEW,
  NEXT: dt(VIEW, "task-next"),
  PREPARE_CLUSTER: {
    SUCCESS: dt(VIEW, "prepare-cluster-for-node-success"),
    CANNOT_ADD: dt(VIEW, "prepare-cluster-for-node-cannot-add"),
    AUTH_FAILED: dt(VIEW, "prepare-cluster-for-node-auth-failed"),
  },
  SUCCESS: dt(VIEW, "task-success"),
  NODE_NAME: dt(VIEW, "form-node-name", "node-name"),
};

const NODES_URL = location.nodeList({ clusterName: "actions" });
export const url = {
  NODES: NODES_URL,
  TASK: `${NODES_URL}?task=nodeAdd`,
};

export const interceptWithCluster = (routeList: intercept.Route[]) =>
  intercept.run([
    {
      url: backendUrl.clusterStatus({ clusterName: "actions" }),
      json: responses.clusterStatus.actions,
    },
    {
      url: backendUrl.getAvailResourceAgents({ clusterName: "actions" }),
      json: responses.resourceAgentList.ok,
    },
    {
      url: backendUrl.clusterProperties({ clusterName: "actions" }),
      json: responses.clusterProperties.ok,
    },
    ...routeList,
  ]);
