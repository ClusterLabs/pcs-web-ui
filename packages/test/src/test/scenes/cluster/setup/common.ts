import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

export const clusterName = "new-cluster";
export const nodeNameList = ["node-1", "node-2"];

export const mockForClusterSetup = (routeList: mock.Route[] = []) =>
  mock.run([
    mock.route.importedClusterList(),
    mock.route.resourceAgentListAgents(clusterName),
    mock.route.canAddClusterOrNodes({clusterName, nodeNameList}),
    mock.route.sendKnownHostsToNode({
      nodeNameList,
      targetNode: nodeNameList[0],
    }),
    mock.route.rememberCluster({clusterName, nodeNameList}),
    ...routeList,
  ]);

export const toolbar = shortcuts.toolbar(marks.dashboard.toolbar);
export const expectReports = shortcuts.task.expectReports(
  marks.task.clusterSetup.report,
).count;
