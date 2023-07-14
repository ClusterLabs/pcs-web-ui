import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

export const clusterName = "new-cluster";
export const nodeNameList = ["node-1", "node-2"];

export const interceptForClusterSetup = (routeList: intercept.Route[] = []) =>
  intercept.run([
    route.importedClusterList(),
    route.resourceAgentListAgents(clusterName),
    route.canAddClusterOrNodes({clusterName, nodeNameList}),
    route.sendKnownHostsToNode({nodeNameList, targetNode: nodeNameList[0]}),
    route.rememberCluster({clusterName, nodeNameList}),
    ...routeList,
  ]);

export const openTask = async () => {
  await click(app.dashboard.toolbar.setupCluster);
  await isVisible(app.setupCluster);
};

export const expectReports = shortcuts.task.expectReports(
  app.setupCluster.report,
).count;
