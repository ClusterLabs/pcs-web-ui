import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {toggle} = shortcuts.patternfly;

const {addNode} = marks.task;

const clusterName = "actions";
const nodeName = "newnode";

const password = "pwd";
const addr = "192.168.0.10";
const port = "1234";

const openTask = async () => {
  await click(marks.cluster.nodesToolbar.addNode);
  await isVisible(addNode);
};

describe("Add node task", () => {
  it("should successfully add new node with authentication", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.canAddClusterOrNodes({nodeNameList: [nodeName]}),
        route.checkAuthAgainstNodes({
          nodeNameList: [nodeName],
          response: {json: {[nodeName]: "Unable to authenticate"}},
        }),
        route.sendKnownHosts(clusterName, nodeName),
        route.clusterNodeAdd(clusterName, nodeName),
        route.authGuiAgainstNodes({
          [nodeName]: {password, dest_list: [{addr, port}]},
        }),
      ],
    });
    await goToCluster(clusterName, tabs => tabs.nodes);
    await openTask();
    await fill(addNode.nodeName.name, nodeName);
    await click(addNode.nodeNameFooter.next);

    await toggle(addNode.prepareNode.auth.useCustomAddress);
    await fill(addNode.prepareNode.auth.password, password);
    await fill(addNode.prepareNode.auth.address, addr);
    await fill(addNode.prepareNode.auth.port, port);
    await click(addNode.prepareNodeFooter.auth);
    await isVisible(addNode.prepareNode.success);
    await click(addNode.prepareNodeFooter.next);
    await click(addNode.addressesFooter.next);
    await click(addNode.sbdFooter.next);
    await click(addNode.reviewFooter.next);
    await isVisible(addNode.success);
    await click(addNode.success.close);
  });
});
