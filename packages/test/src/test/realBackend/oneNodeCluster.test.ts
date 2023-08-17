import {assert} from "test/tools";
import * as shortcuts from "test/shortcuts";

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const nodeName = process.env.PCSD_NODE_1 || "";

const clusterName = "test-cluster";

const {importedClusters} = shortcuts.dashboard;

const waitForImportedClusterList = async () =>
  await page.waitForResponse(/.*\/imported-cluster-list$/);

const expectImportedClusterNamesAre = async (nameList: string[]) => {
  await assert.expectKeysAre(
    marks.dashboard.clusterList.cluster.name,
    nameList,
  );
};

const {task} = marks;

describe("Web ui inside cockpit on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await goToDashboard();
      await login(username, password);

      await isVisible(marks.dashboard.clusterList);
      // we expect to start with no cluster
      await expectImportedClusterNamesAre([]);

      await click(marks.dashboard.toolbar.setupCluster);
      await setupCluster(clusterName, nodeName);
      await expectImportedClusterNamesAre([clusterName]);

      await removeCluster(clusterName);
      await expectImportedClusterNamesAre([]);

      await click(marks.dashboard.toolbar.importExistingCluster);
      await importExistingCluster(nodeName);
      await expectImportedClusterNamesAre([clusterName]);

      // wait for started cluster
      // TODO refactor it from here
      // await page.waitForSelector(
      //   `xpath=${mkXPath(
      //     "cluster " + clusterName,
      //     "cluster-status-label",
      //   )}/*[text() = "inoperative" or text() = "running"]`,
      // );

      await destroyCluster(clusterName);
      await expectImportedClusterNamesAre([]);
    },
    testTimeout,
  );
});

const importExistingCluster = async (nodeName: string) => {
  await isVisible(task.clusterImportExisting);

  const {nodeNameFooter, prepareNode, prepareNodeFooter, success} =
    task.clusterImportExisting;

  await fill(task.clusterImportExisting.nodeName, nodeName);
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
  await importedClusters
    .inCluster(clusterName)
    .launchAction(actions => actions.remove);
  await isVisible(task.confirm);
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    isVisible(marks.notifications.toast.success),
    click(task.confirm.run),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const destroyCluster = async (clusterName: string) => {
  await importedClusters
    .inCluster(clusterName)
    .launchAction(actions => actions.remove);
  await isVisible(task.confirm);
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/managec\/.*\/cluster_destroy$/),
    isVisible(marks.notifications.toast.success),
    click(task.confirm.run),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const setupCluster = async (clusterName: string, oneNode: string) => {
  await isVisible(task.clusterSetup);

  await fill(task.clusterSetup.nameAndNodes.clusterName, clusterName);
  await fill(task.clusterSetup.nameAndNodes.node.name.locator.nth(0), oneNode);
  await click(task.clusterSetup.nameAndNodesFooter.next);
  await click(task.clusterSetup.prepareNodesFooter.reviewAndFinish);
  // Task moves to next stage after imported-cluster-list response is done. The
  // request imported-cluster-list is run immediatelly after cluster setup
  // backend call is done.
  await Promise.all([
    waitForImportedClusterList(),
    click(task.clusterSetup.reviewFooter.next),
  ]);

  await isVisible(task.clusterSetup.success);
  await click(task.clusterSetup.success.startAndClose);
};
