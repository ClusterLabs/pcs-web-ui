import { dashboard, login, notification, task } from "test/workflow";

const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const node = process.env.PCSD_NODE_1 || "";
const port = process.env.PCSD_PORT_1 || 2224;
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";

const clusterName = "test-cluster";

describe("Test", () => {
  it("should work", async () => {
    await page.goto(`${protocol}://${host}:${port}/ui/`);

    await login.submitForm({ username, password });

    await dashboard.clusterList.waitForLoaded();
    await assertClusterNameListIs([]); // we expect to start with no cluster

    await setupCluster({ clusterName, nodeNameList: [node] });
    await assertClusterNameListIs([clusterName]);

    await destroyCluster(clusterName);
    await assertClusterNameListIs([]); // we expect to start with no cluster
  }, 30000);
});

const assertClusterNameListIs = async (clusterNameList: string[]) => {
  expect(await dashboard.clusterList.getNameList()).toEqual(clusterNameList);
};

const destroyCluster = async (clusterName: string) => {
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    notification.waitForSuccess(),
    dashboard.cluster(clusterName).destroy.launch(),
  ]);
};

const setupCluster = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: string;
  nodeNameList: string[];
}) => {
  const {
    close,
    fillClusterNameAndNodes,
    nextFrom,
    open,
    reviewAndFinish,
    waitForSuccess,
  } = task.clusterSetup;
  await open();
  await fillClusterNameAndNodes({ clusterName, nodeNameList });
  await nextFrom("Cluster name and nodes");
  await reviewAndFinish();
  await Promise.all([
    page.waitForResponse(/.*\/imported-cluster-list$/),
    nextFrom("Review"),
  ]);
  await waitForSuccess();
  await close();
};
