import * as dashboard from "./dashboard";
import * as fenceDevices from "./fenceDevices";
import * as resources from "./resources";

const testTimeout = Number.parseInt(
  process.env.PCS_WUI_TEST_TIMEOUT ?? "70000",
  10,
);
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const nodeName = process.env.PCSD_NODE_1 || "";

const clusterName = "test-cluster";

const fenceDeviceId = "F1";
const fenceAgentName = "fence_xvm";

const resourceAgentName = "systemd:crond";
const resourceId = "A";

const {clusterList} = marks.dashboard;

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

describe("Web ui on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await goToDashboard();
      await login(username, password);

      await dashboard.loaded();
      await dashboard.importedClusterNamesAre([]);

      // setup cluster
      await dashboard.setupCluster(clusterName, nodeName);
      await dashboard.importedClusterNamesAre([clusterName]);

      // remove cluster and import its back
      await dashboard.removeCluster(clusterName);
      await dashboard.importedClusterNamesAre([]);
      await dashboard.importExistingCluster(nodeName);
      await dashboard.importedClusterNamesAre([clusterName]);

      // test the cluster
      await dashboard.clusterIsReady(clusterName);
      await dashboard.goToCluster(clusterName);

      await fenceDevices.selectTab();
      await fenceDevices.assertEmptyList();
      await fenceDevices.create(fenceDeviceId, fenceAgentName);
      await fenceDevices.assertVisibleInList(fenceDeviceId);

      await resources.selectTab();
      await resources.assertEmptyTree();
      await resources.create(resourceId, resourceAgentName);
      await resources.assertVisibleInTree(resourceId);
      await resources.openDetail(resourceId);
      await resources.assertAgentInfoInDetail();

      // destroy cluster
      await clusterToDashboardTransition();
      await dashboard.destroyCluster(clusterName);
      await dashboard.importedClusterNamesAre([]);
    },
    testTimeout,
  );
});

const clusterToDashboardTransition = async () => {
  await click(marks.clusterBreadcrumbs.dashboard);
};
