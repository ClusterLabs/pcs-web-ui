import * as workflow from "test/workflow";

const host = process.env.PCSD_HOST_1 || "";
const port = process.env.PCSD_PORT_1 || 2224;
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";

describe("Test", () => {
  it("should work", async () => {
    await page.goto(`https://${host}:${port}/ui/`);
    await workflow.login.submitForm({ username, password });
    await workflow.dashboard.waitForClusterListLoaded();
    const clusterInfoList = await workflow.dashboard.getClusterNameList();
    if (clusterInfoList.length > 0) {
      throw new Error(
        "This test suite assumes no cluster imported in webui. "
          + `But imported cluster(s) found: ${clusterInfoList}`,
      );
    }
  });
});
