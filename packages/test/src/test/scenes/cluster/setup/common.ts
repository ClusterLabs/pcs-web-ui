import {assert, mock} from "test/tools";

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

export const expectReports = async (count: number) => {
  await assert.countIs(marks.task.clusterSetup.report, count);
};
