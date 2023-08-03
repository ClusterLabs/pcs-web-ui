import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {toggle} = shortcuts.patternfly;

const {nodeAdd} = marks.task;

const clusterName = "actions";
const nodeName = "newnode";

const password = "pwd";
const addr = "192.168.0.10";
const port = "1234";

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
    await shortcuts
      .toolbar(marks.cluster.nodesToolbar)
      .launch(toolbar => toolbar.addNode);
    await fill(nodeAdd.nodeName.name, nodeName);
    await click(nodeAdd.nodeNameFooter.next);

    await toggle(nodeAdd.prepareNode.auth.useCustomAddress);
    await fill(nodeAdd.prepareNode.auth.password, password);
    await fill(nodeAdd.prepareNode.auth.address, addr);
    await fill(nodeAdd.prepareNode.auth.port, port);
    await click(nodeAdd.prepareNodeFooter.auth);
    await isVisible(nodeAdd.prepareNode.success);
    await click(nodeAdd.prepareNodeFooter.next);
    await click(nodeAdd.addressesFooter.next);
    await click(nodeAdd.sbdFooter.next);
    await click(nodeAdd.reviewFooter.next);
    await isVisible(nodeAdd.success);
    await click(nodeAdd.success.close);
  });
});
