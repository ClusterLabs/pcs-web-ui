import {intercept, route} from "test/tools";

const {nodeName, nodeNameFooter, prepareNode, prepareNodeFooter, success} =
  app.importExistingCluster;

export const openTask = async () => {
  await click(app.dashboard.toolbar.importExistingCluster);
  await isVisible(app.importExistingCluster);
};

const data = {
  nodeName: "node-1",
};
// const password = "pwd";
// const addr = "192.168.0.10";
// const port = "1234";

describe("Import existing cluster", () => {
  it("should import cluster", async () => {
    intercept.run([
      route.importedClusterList(),
      route.checkAuthAgainstNodes({nodeNameList: [data.nodeName]}),
      route.existingCluster({nodeName: data.nodeName}),
    ]);
    await page.goto(backend.rootUrl);
    await openTask();
    await fill(nodeName, data.nodeName);
    await click(nodeNameFooter.checkAuthentication);
    await isVisible(prepareNode.success);
    await click(prepareNodeFooter.addExistringCluster);
    await isVisible(success);
    await click(success.close);
    await isAbsent(app.importExistingCluster);
  });
});
