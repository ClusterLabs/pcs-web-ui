import * as responses from "dev/responses";

import {mock} from "test/tools";

import {
  clusterName,
  expectReports,
  fillNodeNames,
  launchTask,
  mockForClusterSetup,
  nodeNameList,
  routeCheckAuth,
  routeClusterSetup,
  sendMinimalSetup,
} from "./common";

const {clusterSetup: task} = marks.task;

const taskClosed = async () => {
  await isAbsent(marks.task.clusterSetup);
};

describe("Cluster setup", () => {
  afterEach(mock.stop);

  it("should successfully setup cluster skipping optional steps", async () => {
    mockForClusterSetup([routeCheckAuth, routeClusterSetup()]);
    await launchTask();
    await sendMinimalSetup();
    await isVisible(task.success);
    await expectReports(0);
    await click(task.success.close);
    await taskClosed();
  });

  it("should refuse to continue without essential data", async () => {
    mockForClusterSetup();
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
    mockForClusterSetup([routeCheckAuth]);
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

  it("should omit cleared advanced link options from request", async () => {
    const addrs = ["192.168.0.1", "192.168.0.2"];
    const {transportKnet} = task.advancedOptions;
    mockForClusterSetup([
      routeCheckAuth,
      mock.route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: [
              {name: nodeNameList[0], addrs: [addrs[0]]},
              {name: nodeNameList[1], addrs: [addrs[1]]},
            ],
            transport_type: "knet",
            link_list: [{linknumber: "0"}],
          },
        },
      }),
    ]);
    await launchTask();
    await fill(task.nameAndNodes.clusterName, clusterName);
    await fillNodeNames(nodeNameList);
    await click(task.nameAndNodesFooter.next);
    await click(task.prepareNodesFooter.next);
    await click(transportKnet.addKnetLink);
    await fill(transportKnet.knetLink.address.locator.nth(0), addrs[0]);
    await fill(transportKnet.knetLink.address.locator.nth(1), addrs[1]);
    await click(transportKnet.knetLink.toggleAdvancedOptions);
    await fill(transportKnet.knetLink.link_priority, "1");
    await fill(transportKnet.knetLink.link_priority, "");
    await click(task.advancedOptionsFooter.reviewAndFinish);
    await click(task.reviewFooter.next);
    await isVisible(task.success);
  });

  it("should display fail when backend returns an error", async () => {
    mockForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([responses.lib.report.error()]),
    ]);
    await launchTask();
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
    await launchTask();
    await sendMinimalSetup();
    await isVisible(task.unsuccess);
    await expectReports(1);
    await click(task.unsuccess.back);

    await isVisible(task.nameAndNodes);
  });

  it("should display all reports", async () => {
    mockForClusterSetup([
      routeCheckAuth,
      routeClusterSetup([
        responses.lib.report.error({message: {code: "ERROR_1"}}),
        responses.lib.report.error({message: {code: "ERROR_2"}}),
      ]),
    ]);
    await launchTask();
    await sendMinimalSetup();
    await isVisible(task.unsuccess);
    await expectReports(2);
  });
});
