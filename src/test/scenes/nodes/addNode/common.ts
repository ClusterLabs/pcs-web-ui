import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { url as appUrl, intercept, urls } from "test/tools";

const VIEW = dt("wizard-node-add");
export const WIZARD = {
  VIEW,
  NEXT: dt(VIEW, "wizard-next"),
  PREPARE_CLUSTER: {
    SUCCESS: dt(VIEW, "prepare-cluster-for-node-success"),
    CANNOT_ADD: dt(VIEW, "prepare-cluster-for-node-cannot-add"),
    AUTH_FAILED: dt(VIEW, "prepare-cluster-for-node-auth-failed"),
  },
  SUCCESS: dt(VIEW, "wizard-success"),
  NODE_NAME: dt(VIEW, "form-node-name", "node-name"),
};

const NODES_URL = appUrl("/cluster/actions/nodes");
export const url = {
  NODES: NODES_URL,
  WIZARD: `${NODES_URL}?wizard=node-add`,
};

export const interceptWithCluster = (routeList: intercept.Route[]) =>
  intercept.run([
    {
      url: urls.clusterStatus({ clusterName: "actions" }),
      json: responses.clusterStatus.actions,
    },
    {
      url: urls.getAvailResourceAgents({ clusterName: "actions" }),
      json: responses.resourceAgentList.ok,
    },
    {
      url: urls.clusterProperties({ clusterName: "actions" }),
      json: responses.clusterProperties.ok,
    },
    ...routeList,
  ]);
