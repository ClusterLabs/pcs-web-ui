import * as cs from "dev/responses/clusterStatus/tools";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, goToNodes, toolbar} from "./common";

const {nodeAdd: task} = marks.task;

const nodeName = "newnode";

const password = "pwd";
const addr = "192.168.0.10";
const port = "1234";

describe("Add node task", () => {
  it("should successfully add new node with authentication", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
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
    await goToNodes();
    await toolbar.launch(toolbar => toolbar.addNode);
    await fill(task.nodeName.name, nodeName);
    await click(task.nodeNameFooter.next);

    await shortcuts.patternfly.toggle(task.prepareNode.auth.useCustomAddress);
    await fill(task.prepareNode.auth.password, password);
    await fill(task.prepareNode.auth.address, addr);
    await fill(task.prepareNode.auth.port, port);
    await click(task.prepareNodeFooter.auth);
    await isVisible(task.prepareNode.success);
    await click(task.prepareNodeFooter.next);
    await click(task.addressesFooter.next);
    await click(task.sbdFooter.next);
    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
  });
});
