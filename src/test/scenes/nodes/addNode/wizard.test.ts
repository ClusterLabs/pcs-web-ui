import { intercept, route, shortcuts } from "test/tools";
import { dt } from "test/tools/selectors";
import * as workflow from "test/workflow";

import { TASK, url } from "./common";

const NODE = "newnode";
const clusterName = "actions";

const PASSWORD = "pwd";
const ADDR = "192.168.0.10";
const PORT = "1234";

const enterNodeName = async (nodeName: string) => {
  await page.goto(url.NODES);
  await page.click(dt("task nodes-add-node"));
  await page.type(TASK.NODE_NAME, nodeName);
  await page.click(TASK.NEXT);
};

describe("Node add task", () => {
  afterEach(intercept.stop);

  it("should succesfully add new node", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.canAddClusterOrNodes({ nodeNameList: [NODE] }),
        route.checkAuthAgainstNodes({ nodeNameList: [NODE] }),
        route.sendKnownHosts(clusterName, NODE),
        route.clusterNodeAdd(clusterName, NODE),
      ],
    });
    await enterNodeName(NODE);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.SUCCESS);
    await page.click(TASK.NEXT); // go to adresses
    await page.click(TASK.NEXT); // go to sbd
    await page.click(TASK.NEXT); // go to rewiew
    await page.click(TASK.NEXT); // go to finish
    await page.waitForSelector(TASK.SUCCESS);
  });

  it("should display alert when cannot add node to cluster", async () => {
    const reason =
      `The node '${NODE}' is already a part of the 'ClusterName' cluster.`
      + " You may not add a node to two different clusters.";

    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.canAddClusterOrNodes({
          nodeNameList: [NODE],
          response: { status: [400, reason] },
        }),
      ],
    });
    await enterNodeName(NODE);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.CANNOT_ADD);
  });

  it("should display alert when node is offline", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.canAddClusterOrNodes({ nodeNameList: [NODE] }),
        route.checkAuthAgainstNodes({
          nodeNameList: [NODE],
          response: { json: { [NODE]: "Offline" } },
        }),
      ],
    });
    await enterNodeName(NODE);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.AUTH_FAILED);
  });

  it("should sucessfull add new node with authentication", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.canAddClusterOrNodes({ nodeNameList: [NODE] }),
        route.checkAuthAgainstNodes({
          nodeNameList: [NODE],
          response: { json: { [NODE]: "Unable to authenticate" } },
        }),
        route.sendKnownHosts(clusterName, NODE),
        route.clusterNodeAdd(clusterName, NODE),
        route.authGuiAgainstNodes({
          [NODE]: {
            password: PASSWORD,
            dest_list: [{ addr: ADDR, port: PORT }],
          },
        }),
      ],
    });
    await enterNodeName(NODE);
    await workflow.auth.fillForm(NODE, TASK.VIEW, PASSWORD, ADDR, PORT);
    await page.click(TASK.NEXT);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.SUCCESS);
    await page.click(TASK.NEXT); // go to adresses
    await page.click(TASK.NEXT); // go to sbd
    await page.click(TASK.NEXT); // go to rewiew
    await page.click(TASK.NEXT); // go to finish
    await page.waitForSelector(TASK.SUCCESS);
  });
});
