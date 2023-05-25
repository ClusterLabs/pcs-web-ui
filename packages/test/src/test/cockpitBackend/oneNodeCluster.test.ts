import {dt} from "test/tools/selectors";

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);

const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const port = process.env.PCSD_PORT_1 || 9090;

describe("Web ui inside cockpit on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      console.log(`${protocol}://${host}:${port}/ha-cluster/`);
      await page.goto(`${protocol}://${host}:${port}/ha-cluster/`);
      await page.waitForTimeout(200);
      await page.type('//*[@id="login-user-input"]', "user1");
      await page.type('//*[@id="login-password-input"]', "hh");
      await page.click('//*[@id="login-button"]');

      // we expect to start with no cluster
      const frame = page.frameLocator('[name$="/ha-cluster"]');
      await frame.locator(dt("cluster-list")).waitFor();
      await frame.locator(dt("task dashboard-setup-cluster")).click();
      await frame.locator(dt("task-cluster-setup")).waitFor({state: "visible"});
    },
    testTimeout,
  );
});
