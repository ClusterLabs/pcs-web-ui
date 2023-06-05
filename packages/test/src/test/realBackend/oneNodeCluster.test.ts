import {Path} from "app/view/dataTest";

const dataTest = (path: Path) =>
  "//*"
  + path
    .split(".")
    .map(value => `[@data-test="${value}"]`)
    .join("//*");

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);

describe("Web ui inside cockpit on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await page.goto(backend.rootUrl);
      await login("user1", "hh");

      // we expect to start with no cluster
      await locator(dataTest("dashboard.cluster-list")).waitFor();
      await locator(dataTest("dashboard.toolbar.setup-cluster")).click();
      await locator(dataTest("dashboard.setup-cluster")).waitFor({
        state: "visible",
      });
    },
    testTimeout,
  );
});
