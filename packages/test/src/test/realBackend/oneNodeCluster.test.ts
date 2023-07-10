import * as shortcuts from "test/shortcuts";

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const nodeName = process.env.PCSD_NODE_1 || "";

const clusterName = "test-cluster";

const {clusterList} = shortcuts.dashboard;

const assertImportedClusterNamesAre = async (clusterNameList: string[]) => {
  expect(
    await app.dashboard.clusterList.cluster.name.locator.evaluateAll(
      (nodeList: HTMLElement[]) => nodeList.map(n => n.innerText),
    ),
  ).toEqual(clusterNameList);
};

const waitForImportedClusterList = async () =>
  await page.waitForResponse(/.*\/imported-cluster-list$/);

describe("Web ui inside cockpit on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await page.goto(backend.rootUrl);
      await login(username, password);

      await isVisible(app.dashboard.clusterList);
      // we expect to start with no cluster
      await assertImportedClusterNamesAre([]);

      await click(app.dashboard.toolbar.setupCluster);
      await setupCluster({clusterName, nodeNameList: [nodeName]});
      await assertImportedClusterNamesAre([clusterName]);

      await removeCluster(clusterName);
      await assertImportedClusterNamesAre([]);

      await click(app.dashboard.toolbar.importExistingCluster);
      await importExistingCluster(nodeName);
      await assertImportedClusterNamesAre([clusterName]);

      await destroyCluster(clusterName);
      await assertImportedClusterNamesAre([]);
    },
    testTimeout,
  );
});

const importExistingCluster = async (nodeName: string) => {
  await isVisible(app.importExistingCluster);

  const {nodeNameFooter, prepareNode, prepareNodeFooter, success} =
    app.importExistingCluster;

  await fill(app.importExistingCluster.nodeName, nodeName);
  await click(nodeNameFooter.checkAuthentication);
  await isVisible(prepareNode.success);

  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/cluster_status$/),
    await click(prepareNodeFooter.addExistringCluster),
  ]);
  await isVisible(success);
  await click(success.close);
};

const removeCluster = async (clusterName: string) => {
  const inParticularCluster = clusterList.inCluster(clusterName);
  const {actions} = app.dashboard.clusterList.cluster.loaded;
  await click(inParticularCluster(actions));
  await click(inParticularCluster(actions.remove));
  await isVisible(actions.remove.confirm);
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    isVisible(app.notifications.toast.success),
    click(actions.remove.confirm.run),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const destroyCluster = async (clusterName: string) => {
  const inParticularCluster = clusterList.inCluster(clusterName);
  const {actions} = app.dashboard.clusterList.cluster.loaded;
  await click(inParticularCluster(actions));
  await click(inParticularCluster(actions.destroy));
  await isVisible(actions.destroy.confirm);
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/managec\/.*\/cluster_destroy$/),
    isVisible(app.notifications.toast.success),
    click(actions.destroy.confirm.run),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const setupCluster = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: string;
  nodeNameList: string[];
}) => {
  const {nameAndNodesFooter, prepareNodesFooter, reviewFooter, success} =
    app.setupCluster;
  const {fillClusterNameAndNodes} = shortcuts.setupCluster;
  await isVisible(app.setupCluster);

  await fillClusterNameAndNodes({clusterName, nodeNameList});
  await click(nameAndNodesFooter.next);
  await click(prepareNodesFooter.reviewAndFinish);
  // Task moves to next stage after imported-cluster-list response is done. The
  // request imported-cluster-list is run immediatelly after cluster setup
  // backend call is done.
  await Promise.all([waitForImportedClusterList(), click(reviewFooter.next)]);

  await isVisible(success);
  await click(success.startAndClose);
};
