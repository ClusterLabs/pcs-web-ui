const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);

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
      await login("user1", "hh");

      await app.dashboard.clusterList.locator.waitFor();
      // we expect to start with no cluster
      await assertImportedClusterNamesAre([]);

      await app.dashboard.toolbar.setupCluster.locator.click();
      await app.dashboard.setupCluster.locator.waitFor({state: "visible"});
    },
    testTimeout,
  );
});
