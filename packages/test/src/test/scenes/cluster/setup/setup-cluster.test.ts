import * as responses from "dev/responses";

import {mock} from "test/tools";

import {
  clusterName,
  expectReports,
  mockForClusterSetup,
  nodeNameList,
} from "./common";

const {clusterSetup: task} = marks.task;

const routeClusterSetup = (
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

const routeCheckAuth = mock.route.checkAuthAgainstNodes({nodeNameList});

const launchTask = async () => {
  await goToDashboard();
  await click(marks.dashboard.toolbar.setupCluster);
};

const fillNodeNames = async (nodeNameList: string[]) => {
  await fill(task.nameAndNodes.node.name.locator.nth(0), nodeNameList[0]);
  await fill(task.nameAndNodes.node.name.locator.nth(1), nodeNameList[1]);
};

const sendMinimalSetup = async () => {
  await launchTask();
  await fill(task.nameAndNodes.clusterName, clusterName);
  await fillNodeNames(nodeNameList);
  await click(task.nameAndNodesFooter.next);
  await click(task.prepareNodesFooter.reviewAndFinish);
  await click(task.reviewFooter.next);
};

const taskClosed = async () => {
  await isAbsent(marks.task.clusterSetup);
};

describe("Cluster setup", () => {
  afterEach(mock.stop);

  it("should successfully setup cluster skipping optional steps", async () => {
    mockForClusterSetup([routeCheckAuth, routeClusterSetup()]);
    await sendMinimalSetup();
    await isVisible(task.success);
    await expectReports(0);
    await click(task.success.close);
    await taskClosed();
  });

  it("should refuse to continue without essential data", async () => {
    mock.run([mock.route.importedClusterList()]);
    await launchTask();
    await click(task.nameAndNodesFooter.next);
    await isVisible(fieldError(task.nameAndNodes.clusterName));
    await isVisible(fieldError(task.nameAndNodes.node.name.locator.last()));
  });

  it("should be possible go back from auth and change node name", async () => {
    mockForClusterSetup([
      mock.route.checkAuthAgainstNodes({
        nodeNameList,
        response: {
          json: {
            [nodeNameList[0]]: "Unable to authenticate",
            [nodeNameList[1]]: "Unable to authenticate",
          },
        },
      }),
    ]);
    await launchTask();
    await fill(task.nameAndNodes.clusterName, clusterName);
    await fillNodeNames(nodeNameList);
    await click(task.nameAndNodesFooter.next);
    await isVisible(task.prepareNodes.auth);
    await click(task.prepareNodesFooter.back);
    await isVisible(task.nameAndNodes.node.locator.first());
    // TODO currently it is not possible to have multiple
    // check_auth_against_nodes with different query and strings...
  });

  it("should be mandatory fill node addresses in links", async () => {
    mockForClusterSetup([
      mock.route.checkAuthAgainstNodes({nodeNameList}),
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
      }),
    ]);
    const {transportKnet} = task.advancedOptions;
    await launchTask();
    await fill(task.nameAndNodes.clusterName, clusterName);
    await fillNodeNames(nodeNameList);
    await click(task.nameAndNodesFooter.next);
    await click(task.prepareNodesFooter.next);
    await click(transportKnet.addKnetLink);
    await click(task.advancedOptionsFooter.next);
    await isVisible(fieldError(transportKnet.knetLink.address.locator.nth(0)));
    await isVisible(fieldError(transportKnet.knetLink.address.locator.nth(1)));
  });

  it("should display fail when backend returns an error", async () => {
    mockForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await sendMinimalSetup();
    await isVisible(task.unsuccess);
    await expectReports(1);
    await click(task.unsuccess.cancel);
    await taskClosed();
  });

  it("should get back when it fails", async () => {
    mockForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await sendMinimalSetup();
    await isVisible(task.unsuccess);
    await expectReports(1);
    await click(task.unsuccess.back);

    await isVisible(task.nameAndNodes);
  });

  it("shold display all reports", async () => {
    mockForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([
        responses.lib.report.error({message: {code: "ERROR_1"}}),
        responses.lib.report.error({message: {code: "ERROR_2"}}),
      ]),
    ]);
    await sendMinimalSetup();
    await isVisible(task.unsuccess);
    await expectReports(2);
  });
});
