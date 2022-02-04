import { workflow } from "test/tools";

declare global {
  var pcs: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}

const { host, port, username, password } = global.pcs;

describe("Test", () => {
  it("should work", async () => {
    await page.goto(`https://${host}:${port}/ui/`);
    await workflow.submitLoginForm({ username, password });
    await workflow.waitForDashboardClusterListLoaded();
    const clusterInfoList = await workflow.getDashboardClusterNameList();
    if (clusterInfoList.length > 0) {
      throw new Error(
        "This test suite assumes no cluster imported in webui. "
          + `But imported cluster(s) found: ${clusterInfoList}`,
      );
    }
  });
});
