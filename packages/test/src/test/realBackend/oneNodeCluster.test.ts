import * as cluster from "./cluster";
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
const fenceAgentName = "fence_kdump";

const resourceAgentName = "systemd:crond";
const resourceId = "A";

describe("Web ui on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await goToCluster();
      // It seems login starts before cockpit login screen is fully prepared.
      await page.waitForTimeout(200);
      await login(username, password);

      // The host is expected not to be in a cluster at the beginning.
      await cluster.assertNoCluster();

      // setup cluster
      await cluster.setupFromNoCluster(clusterName, nodeName);
      await cluster.waitForReady();

      // test the cluster
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
      await cluster.selectOverviewTab();
      await cluster.destroy();
      await cluster.assertNoCluster();
    },
    testTimeout,
  );
});

afterAll(async () => {
  await page.close();
});
