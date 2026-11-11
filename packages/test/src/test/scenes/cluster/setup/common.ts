import * as cs from "dev/responses/clusterStatus/tools";
import * as responses from "dev/responses";

import {assert, mock} from "test/tools";

const {clusterSetup: task} = marks.task;

export const clusterName = "new-cluster";
export const nodeNameList = ["node-1", "node-2"];

// The cluster the backend node is part of. The setup creates a new cluster
// (`clusterName`) on other nodes.
const currentClusterStatus = cs.cluster("test-cluster", "ok");

const withSetupRoutes = (routeList: mock.Route[]) => [
  mock.route.sendKnownHostsToNode({
    nodeNameList,
    targetNode: nodeNameList[0],
  }),
  ...routeList,
];

export const mockForClusterSetup = (routeList: mock.Route[] = []) =>
  mock.shortcuts.withCluster({
    clusterStatus: currentClusterStatus,
    additionalRouteList: withSetupRoutes(routeList),
  });

export const mockForClusterSetupWithNoCluster = (
  routeList: mock.Route[] = [],
) =>
  mock.shortcuts.withNoCluster({
    additionalRouteList: withSetupRoutes(routeList),
  });

export const routeClusterSetup = (
  errorList: Parameters<typeof responses.lib.error>[0] = [],
) =>
  mock.route.clusterSetup({
    payload: {
      targetNode: nodeNameList[0],
      setupData: {
        cluster_name: clusterName,
        nodes: nodeNameList.map(nodeName => ({name: nodeName})),
        transport_type: "knet",
        link_list: [],
      },
    },
    ...(errorList.length === 0
      ? {}
      : {
          response: {
            json: responses.lib.error(errorList),
          },
        }),
  });

export const routeCheckAuth = mock.route.checkAuthAgainstNodes({nodeNameList});

export const launchTask = async () => {
  await goToCluster();
  await dropdown(
    marks.cluster.overviewToolbar.dropdown,
    marks.cluster.overviewToolbar.dropdown.setupCluster,
  );
};

export const fillNodeNames = async (nodeNameList: string[]) => {
  await fill(task.nameAndNodes.node.name.locator.nth(0), nodeNameList[0]);
  await fill(task.nameAndNodes.node.name.locator.nth(1), nodeNameList[1]);
};

// Expects the task to be already launched.
export const sendMinimalSetup = async () => {
  await fill(task.nameAndNodes.clusterName, clusterName);
  await fillNodeNames(nodeNameList);
  await click(task.nameAndNodesFooter.next);
  await click(task.prepareNodesFooter.reviewAndFinish);
  await click(task.reviewFooter.next);
};

export const expectReports = async (count: number) => {
  await assert.countIs(task.report, count);
};
