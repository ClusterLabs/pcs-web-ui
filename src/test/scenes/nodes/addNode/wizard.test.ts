import { intercept, route, workflow } from "test/tools";

import { TASK, interceptWithCluster, url } from "./common";

const NODE = "newnode";
const CLUSTER = "actions";

const PASSWORD = "pwd";
const ADDR = "192.168.0.10";
const PORT = "1234";

const enterNodeName = async (nodeName: string) => {
  await page.goto(url.TASK);
  await page.type(TASK.NODE_NAME, nodeName);
  await page.click(TASK.NEXT);
};

describe("Node add task", () => {
  afterEach(intercept.stop);

  it("should succesfully add new node", async () => {
    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE),
      route.check_auth_against_nodes(NODE),
      route.send_known_hosts(CLUSTER, NODE),
      route.clusterNodeAdd(CLUSTER, NODE),
    ]);
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

    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE, { status: [400, reason] }),
    ]);
    await enterNodeName(NODE);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.CANNOT_ADD);
  });

  it("should display alert when node is offline", async () => {
    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE, { text: "" }),
      route.check_auth_against_nodes(NODE, { json: { [NODE]: "Offline" } }),
    ]);
    await enterNodeName(NODE);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.AUTH_FAILED);
  });

  it("should sucessfull add new node with authentication", async () => {
    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE),
      route.check_auth_against_nodes(NODE, {
        json: { [NODE]: "Unable to authenticate" },
      }),
      route.send_known_hosts(CLUSTER, NODE),
      route.clusterNodeAdd(CLUSTER, NODE),
      route.auth_gui_against_nodes({
        [NODE]: {
          password: PASSWORD,
          dest_list: [{ addr: ADDR, port: PORT }],
        },
      }),
    ]);
    await enterNodeName(NODE);
    await workflow.fillAuthForm(NODE, TASK.VIEW, PASSWORD, ADDR, PORT);
    await page.click(TASK.NEXT);
    await page.waitForSelector(TASK.PREPARE_CLUSTER.SUCCESS);
    await page.click(TASK.NEXT); // go to adresses
    await page.click(TASK.NEXT); // go to sbd
    await page.click(TASK.NEXT); // go to rewiew
    await page.click(TASK.NEXT); // go to finish
    await page.waitForSelector(TASK.SUCCESS);
  });
});
