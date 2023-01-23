import {mkXPath} from "test/tools/selectors";
import {
  breadcrumb,
  cluster,
  dashboard,
  login,
  notification,
  task,
} from "test/workflow";

const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const nodeName = process.env.PCSD_NODE_1 || "";
const port = process.env.PCSD_PORT_1 || 2224;
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const recordVideo =
  process.env.PCS_WUI_TESTS_VIDEO_RECORD?.toLowerCase() === "true";
const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);

const clusterName = "test-cluster";
const fenceDeviceName = "F1";
const fenceAgentName = "fence_xvm";

const resourceAgentName = "Dummy"; //"ocf:heartbeat:Dummy";
const resourceName = "A";

describe("Web ui on one node cluster", () => {
  afterEach(async () => {
    if (recordVideo) {
      await page.context().close();
    }
  });
  it(
    "should succeed with essential features",
    async () => {
      await page.goto(`${protocol}://${host}:${port}/ui/`);

      await login.submitForm({username, password});

      await dashboard.clusterList.waitForLoaded();
      // we expect to start with no cluster
      await dashboard.clusterList.assertNamesAre([]);

      await setupCluster({clusterName, nodeNameList: [nodeName]});
      await dashboard.clusterList.assertNamesAre([clusterName]);

      await removeCluster(clusterName);
      await dashboard.clusterList.assertNamesAre([]);

      await importExistingCluster(nodeName);
      await dashboard.clusterList.assertNamesAre([clusterName]);
      // wait for started cluster
      // TODO refactor it from here
      await page.waitForSelector(
        `xpath=${mkXPath(
          "cluster " + clusterName,
          "cluster-status-label",
        )}/*[text() = "inoperative" or text() = "running"]`,
      );

      await dashboard.clusterList.goToCluster(clusterName);

      await cluster.selectTab("fence-devices");
      await cluster.fenceDevices.assertNamesAre([]);
      await createFenceDevice(fenceDeviceName, fenceAgentName);
      await cluster.fenceDevices.assertNamesAre([fenceDeviceName]);

      await cluster.selectTab("resources");
      await cluster.resources.assertNamesAre([]);
      await createResource(resourceName, resourceAgentName);
      await cluster.resources.assertNamesAre([resourceName]);

      await breadcrumb.gotoDashboard();
      await destroyCluster(clusterName);
      await dashboard.clusterList.assertNamesAre([]);
    },
    testTimeout,
  );
});

const createFenceDevice = async (
  fenceDeviceName: string,
  agentName: string,
) => {
  const {fillNameAndAgent, nextFrom, open, waitForSuccess, close} =
    task.fenceDeviceCreate;

  await open();
  await fillNameAndAgent(fenceDeviceName, agentName);
  await nextFrom("Name and type");
  await nextFrom("Instance attributes");
  await nextFrom("Settings");
  await Promise.all([
    page.waitForResponse(/.*\/cluster_status$/),
    nextFrom("Review"),
    waitForSuccess(),
  ]);
  await close();
};

const createResource = async (resourceName: string, agentName: string) => {
  const {fillNameAndAgent, nextFrom, open, waitForSuccess, close} =
    task.resourceCreate;

  await open();
  await fillNameAndAgent(resourceName, agentName);
  await nextFrom("Name and type");
  await nextFrom("Instance attributes");
  await nextFrom("Settings");
  await Promise.all([
    page.waitForResponse(/.*\/cluster_status$/),
    nextFrom("Review"),
    waitForSuccess(),
  ]);
  await close();
};

const removeCluster = async (clusterName: string) => {
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    notification.waitForSuccess(),
    dashboard.cluster(clusterName).remove.launch(),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const destroyCluster = async (clusterName: string) => {
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    notification.waitForSuccess(),
    dashboard.cluster(clusterName).destroy.launch(),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const importExistingCluster = async (nodeName: string) => {
  const {
    close,
    fillNodeName,
    nextFrom,
    open,
    waitForSuccess,
    waitForCheckNodeSuccess,
  } = task.importExistingCluster;

  await open();
  await fillNodeName(nodeName);
  await nextFrom("Enter node name");
  await waitForCheckNodeSuccess();
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    page.waitForResponse(/.*\/cluster_status$/),
    nextFrom("Check node name"),
  ]);
  await waitForSuccess();
  await close();
};

const setupCluster = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: string;
  nodeNameList: string[];
}) => {
  const {
    startAndClose,
    fillClusterNameAndNodes,
    nextFrom,
    open,
    reviewAndFinish,
    waitForSuccess,
  } = task.clusterSetup;
  await open();
  await fillClusterNameAndNodes({clusterName, nodeNameList});
  await nextFrom("Cluster name and nodes");
  await reviewAndFinish();
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    nextFrom("Review"),
  ]);
  await waitForSuccess();
  await startAndClose();
};
