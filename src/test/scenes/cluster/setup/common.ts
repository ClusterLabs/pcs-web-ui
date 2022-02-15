import { intercept, route } from "test/tools";

export const clusterName = "new-cluster";
export const nodeNameList = ["node-1", "node-2"];

export const interceptForClusterSetup = (routeList: intercept.Route[] = []) =>
  intercept.run([
    route.importedClusterList(),
    route.resourceAgentListAgents(clusterName),
    route.can_add_cluster_or_nodes({ clusterName, nodeNameList }),
    route.sendKnownHostsToNode({ nodeNameList, targetNode: nodeNameList[0] }),
    route.rememberCluster({ clusterName, nodeNameList }),
    ...routeList,
  ]);
