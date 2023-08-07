import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {toolbar} from "./common";

const {toggle} = shortcuts.patternfly;
const {goToDashboard} = shortcuts.dashboard;

const {
  nodeName,
  nodeNameFooter,
  prepareNode,
  prepareNodeFooter,
  success,
  error,
} = marks.task.clusterImportExisting;

const {auth} = prepareNode;

export const launchTask = async () => {
  await toolbar.launch(toolbar => toolbar.importExistingCluster);
};

const closeTask = async () => {
  await click(success.close);
  await isAbsent(marks.task.clusterImportExisting);
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
    await goToDashboard();
    await launchTask();
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
    await goToDashboard();
    await launchTask();
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
    await goToDashboard();
    await launchTask();
    await fill(nodeName, data.nodeName);
    await click(nodeNameFooter.checkAuthentication);
    await isVisible(prepareNode.success);
    await click(prepareNodeFooter.addExistringCluster);
    await isVisible(error);
    await click(error.cancel);
    await isAbsent(marks.task.clusterImportExisting);
  });
});
