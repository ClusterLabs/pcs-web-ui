import { intercept, route, workflow } from "test/tools";

import { WIZARD, interceptWithCluster, url } from "./common";

const NODE = "newnode";
const CLUSTER = "actions";

const PASSWORD = "pwd";
const ADDR = "192.168.0.10";
const PORT = "1234";

const enterNodeName = async (nodeName: string) => {
  await page.goto(url.WIZARD);
  await page.type(WIZARD.NODE_NAME, nodeName);
  await page.click(WIZARD.NEXT);
};

describe("Node add wizard", () => {
  afterEach(intercept.stop);

  it("should succesfully add new node", async () => {
    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE),
      route.check_auth_against_nodes(NODE),
      route.send_known_hosts(CLUSTER, NODE),
      route.clusterNodeAdd(CLUSTER, NODE),
    ]);
    await enterNodeName(NODE);
    await page.waitForSelector(WIZARD.PREPARE_CLUSTER.SUCCESS);
    await page.click(WIZARD.NEXT); // go to adresses
    await page.click(WIZARD.NEXT); // go to sbd
    await page.click(WIZARD.NEXT); // go to rewiew
    await page.click(WIZARD.NEXT); // go to finish
    await page.waitForSelector(WIZARD.SUCCESS);
  });

  it("should display alert when cannot add node to cluster", async () => {
    const reason =
      `The node '${NODE}' is already a part of the 'ClusterName' cluster.`
      + " You may not add a node to two different clusters.";

    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE, { status: [400, reason] }),
    ]);
    await enterNodeName(NODE);
    await page.waitForSelector(WIZARD.PREPARE_CLUSTER.CANNOT_ADD);
  });

  it("should display alert when node is offline", async () => {
    interceptWithCluster([
      route.can_add_cluster_or_nodes(NODE, { text: "" }),
      route.check_auth_against_nodes(NODE, { json: { [NODE]: "Offline" } }),
    ]);
    await enterNodeName(NODE);
    await page.waitForSelector(WIZARD.PREPARE_CLUSTER.AUTH_FAILED);
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
    await workflow.sendAuthForm(WIZARD.VIEW, PASSWORD, ADDR, PORT);
    await page.waitForSelector(WIZARD.PREPARE_CLUSTER.SUCCESS);
    await page.click(WIZARD.NEXT); // go to adresses
    await page.click(WIZARD.NEXT); // go to sbd
    await page.click(WIZARD.NEXT); // go to rewiew
    await page.click(WIZARD.NEXT); // go to finish
    await page.waitForSelector(WIZARD.SUCCESS);
  });
});
