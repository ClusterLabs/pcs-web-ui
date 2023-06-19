import * as shortcuts from "test/shortcuts";

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const nodeName = process.env.PCSD_NODE_1 || "";

const clusterName = "test-cluster";

const assertImportedClusterNamesAre = async (clusterNameList: string[]) => {
  expect(
    await app.dashboard.clusterList.cluster.name.locator.evaluateAll(
      (nodeList: HTMLElement[]) => nodeList.map(n => n.innerText),
    ),
  ).toEqual(clusterNameList);
};

describe("Web ui inside cockpit on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await page.goto(backend.rootUrl);
      await login(username, password);

      await app.dashboard.clusterList.locator.waitFor();
      // we expect to start with no cluster
      await assertImportedClusterNamesAre([]);

      await app.dashboard.toolbar.runSetupCluster.locator.click();
      await setupCluster({clusterName, nodeNameList: [nodeName]});
    },
    testTimeout,
  );
});

const setupCluster = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: string;
  nodeNameList: string[];
}) => {
  const {
    locator,
    nameAndNodesFooter,
    prepareNodesFooter,
    reviewFooter,
    success,
  } = app.setupCluster;
  const {fillClusterNameAndNodes} = shortcuts.setupCluster;
  await locator.waitFor({state: "visible"});

  await fillClusterNameAndNodes({clusterName, nodeNameList});
  await nameAndNodesFooter.next.locator.click();
  await prepareNodesFooter.reviewAndFinish.locator.click();
  // Task moves to next stage after imported-cluster-list response is done. The
  // request imported-cluster-list is run immediatelly after cluster setup
  // backend call is done.
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    reviewFooter.next.locator.click(),
  ]);

  await success.locator.waitFor();
  await success.startAndClose.locator.click();
};
