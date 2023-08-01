import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {toggle} = shortcuts.patternfly;

const {
  nodeName,
  nodeNameFooter,
  prepareNode,
  prepareNodeFooter,
  success,
  error,
} = app.task.importExistingCluster;

const {auth} = prepareNode;

export const openTask = async () => {
  await click(app.dashboard.toolbar.importExistingCluster);
  await isVisible(app.task.importExistingCluster);
};

const closeTask = async () => {
  await click(success.close);
  await isAbsent(app.task.importExistingCluster);
};

const data = {
  nodeName: "node-1",
  password: "pwd",
  addr: "192.168.0.10",
  port: "1234",
};

describe("Import existing cluster", () => {
  afterEach(intercept.stop);

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
    await closeTask();
  });

  it("should import cluster with authentication", async () => {
    intercept.run([
      route.importedClusterList(),
      route.checkAuthAgainstNodes({
        nodeNameList: [data.nodeName],
        response: {json: {[data.nodeName]: "Unable to authenticate"}},
      }),
      route.authGuiAgainstNodes({
        [data.nodeName]: {
          password: data.password,
          dest_list: [{addr: data.addr, port: data.port}],
        },
      }),
      route.existingCluster({nodeName: data.nodeName}),
    ]);
    await page.goto(backend.rootUrl);
    await openTask();
    await fill(nodeName, data.nodeName);
    await click(nodeNameFooter.checkAuthentication);
    await isVisible(auth);
    await toggle(auth.customAddrSwitch);
    await fill(auth.password, data.password);
    await fill(auth.address, data.addr);
    await fill(auth.port, data.port);
    await click(prepareNodeFooter.authenticate);
    await isVisible(prepareNode.success);
    await click(prepareNodeFooter.addExistringCluster);
    await isVisible(success);
    await closeTask();
  });

  it("should display error on backend error", async () => {
    intercept.run([
      route.importedClusterList(),
      route.checkAuthAgainstNodes({nodeNameList: [data.nodeName]}),
      route.existingCluster({
        nodeName: data.nodeName,
        response: {status: [400, "Configuration conflict detected."]},
      }),
    ]);
    await openTask();
    await fill(nodeName, data.nodeName);
    await click(nodeNameFooter.checkAuthentication);
    await isVisible(prepareNode.success);
    await click(prepareNodeFooter.addExistringCluster);
    await isVisible(error);
    await click(error.cancel);
    await isAbsent(app.task.importExistingCluster);
  });
});
