import {assert} from "test/tools";

const testTimeout = Number.parseInt(
  process.env.PCS_WUI_TEST_TIMEOUT ?? "70000",
  10,
);
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const nodeName = process.env.PCSD_NODE_1 || "";

const clusterName = "test-cluster";

const {clusterList} = marks.dashboard;

// biome-ignore lint/suspicious/noExplicitAny:
async function waitForResponse(urlPattern: RegExp): Promise<any> {
  return page.evaluate(
    pattern =>
      new Promise(resolve => {
        // If there is iframe we are in cockpit and we need listen to events
        // inside iframe. Else, in standalone mode, we need to listen to global
        // `document`.
        const doc =
          (
            document.querySelector(
              'iframe[name$="/ha-cluster"]',
            ) as HTMLIFrameElement
          )?.contentWindow?.document ?? document;

        const listener = (event: CustomEvent) => {
          if (pattern.test(event.detail.url)) {
            doc.removeEventListener("pcsd-response", listener);
            resolve(event.detail);
          }
        };
        doc.addEventListener("pcsd-response", listener);
      }),
    urlPattern,
  );
}

const waitForImportedClusterList = async () =>
  await page.waitForResponse(/.*\/imported-cluster-list$/);

const expectImportedClusterNamesAre = async (nameList: string[]) => {
  await assert.expectKeysAre(clusterList.cluster.name, nameList);
};

export const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof clusterList.cluster.actions) => Mark,
) => {
  await click(
    item.byName(clusterList.cluster, clusterName, [
      c => c.actions,
      c => search(c.actions),
    ]),
  );
};

const {task} = marks;

describe("Web ui on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await goToDashboard();
      await login(username, password);

      await isVisible(clusterList);
      // we expect to start with no cluster
      await expectImportedClusterNamesAre([]);

      await click(marks.dashboardToolbar.setupCluster);
      await setupCluster(clusterName, nodeName);
      await expectImportedClusterNamesAre([clusterName]);

      await removeCluster(clusterName);
      await expectImportedClusterNamesAre([]);

      await click(marks.dashboardToolbar.importExistingCluster);
      await importExistingCluster(nodeName);
      await expectImportedClusterNamesAre([clusterName]);

      await isVisible(
        marks.dashboard.clusterList.cluster.status.locator.locator(
          'xpath=//*[text() = "inoperative" or text() = "running"]',
        ),
      );

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
  await launchClusterItemAction(clusterName, a => a.remove);
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    isVisible(marks.notifications.toast.success),
    appConfirm.run(`Remove the cluster "${clusterName}"?`),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const destroyCluster = async (clusterName: string) => {
  await launchClusterItemAction(clusterName, a => a.destroy);
  const {success} = marks.notifications.toast;
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/managec\/.*\/cluster_destroy$/),
    isVisible(success.locator.getByText("Cluster removed from cluster list")),
    isVisible(success.locator.getByText("Cluster destroyed.")),
    appConfirm.run(`Destroy the cluster "${clusterName}"?`),
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
