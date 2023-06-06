import {dashboard} from "test/workflows";

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);

describe("Web ui inside cockpit on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await page.goto(backend.rootUrl);
      await login("user1", "hh");

      await dashboard.clusterList.waitForLoaded();
      await dataTest("dashboard.toolbar.setup-cluster").click();
      await dataTest("dashboard.setup-cluster").waitFor({state: "visible"});
    },
    testTimeout,
  );
});
