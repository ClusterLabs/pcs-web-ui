import {waitForResponse} from "./waitForResponse";
import {assert} from "test/tools";

const {dashboardToolbar, dashboard} = marks;
const {clusterSetup, clusterImportExisting} = marks.task;

export const loaded = async () => {
  await isVisible(dashboard.clusterList);
};

export const importedClusterNamesAre = async (nameList: string[]) => {
  await assert.expectKeysAre(dashboard.clusterList.cluster.name, nameList);
};

export const setupCluster = async (clusterName: string, oneNode: string) => {
  await click(dashboardToolbar.setupCluster);

  await fill(clusterSetup.nameAndNodes.clusterName, clusterName);
  await fill(clusterSetup.nameAndNodes.node.name.locator.nth(0), oneNode);
  await click(clusterSetup.nameAndNodesFooter.next);
  await click(clusterSetup.prepareNodesFooter.reviewAndFinish);
  // Task moves to next stage after imported-cluster-list response is done. The
  // request imported-cluster-list is run immediatelly after cluster setup
  // backend call is done.
  await Promise.all([
    waitForImportedClusterList(),
    click(clusterSetup.reviewFooter.next),
  ]);

  await isVisible(clusterSetup.success);
  await click(clusterSetup.success.startAndClose);
};

export const removeCluster = async (clusterName: string) => {
  await launchClusterItemAction(clusterName, a => a.remove);
  await Promise.all([
    waitForImportedClusterList(),
    waitForResponse(/.*\/manage\/removecluster$/),
    isVisible(marks.notifications.toast.success),
    appConfirm.run(`Remove the cluster "${clusterName}"?`),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

export const importExistingCluster = async (nodeName: string) => {
  await click(dashboardToolbar.importExistingCluster);

  const {nodeNameFooter, prepareNode, prepareNodeFooter, success} =
    clusterImportExisting;

  await fill(clusterImportExisting.nodeName, nodeName);
  await click(nodeNameFooter.checkAuthentication);
  await isVisible(prepareNode.success);

  await Promise.all([
    waitForImportedClusterList(),
    waitForResponse(/.*\/cluster_status$/),
    await click(prepareNodeFooter.addExistringCluster),
  ]);
  await isVisible(success);
  await click(success.close);
};

export const destroyCluster = async (clusterName: string) => {
  await launchClusterItemAction(clusterName, a => a.destroy);
  const {success} = marks.notifications.toast;
  await Promise.all([
    waitForImportedClusterList(),
    waitForResponse(/.*\/managec\/.*\/cluster_destroy$/),
    isVisible(success.locator.getByText("Cluster removed from cluster list")),
    isVisible(success.locator.getByText("Cluster destroyed.")),
    appConfirm.run(`Destroy the cluster "${clusterName}"?`),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

export const goToCluster = async (clusterName: string) => {
  await click(
    item.byName(marks.dashboard.clusterList.cluster, clusterName, c => c.name),
  );
};

export const clusterIsReady = async (clusterName: string) => {
  await isVisible(
    item.byName(dashboard.clusterList.cluster, clusterName, c =>
      c.status.locatorRelative.locator(
        'xpath=//*[text() = "inoperative" or text() = "running"]',
      ),
    ),
  );
};

const waitForImportedClusterList = async () =>
  await waitForResponse(/.*\/imported-cluster-list$/);

const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof dashboard.clusterList.cluster.actions) => Mark,
) => {
  await click(
    item.byName(dashboard.clusterList.cluster, clusterName, [
      c => c.actions,
      c => search(c.actions),
    ]),
  );
};
