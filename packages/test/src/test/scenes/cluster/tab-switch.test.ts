import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {textIs} = shortcuts.expect;
const {clusterDetail} = marks;

const clusterName = "ok";

const startOnOverview = async () => {
  await goToCluster(clusterName);
  await textIs(clusterDetail.breadcrumbs.clusterName, clusterName);
  await isVisible(clusterDetail.overview);
};

describe("Cluster detail tab switch", () => {
  beforeEach(
    async () =>
      await intercept.shortcuts.interceptWithCluster({
        clusterStatus: cs.cluster(clusterName, "ok"),
      }),
  );
  afterEach(intercept.stop);

  it("should allow switch to nodes", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.nodes);
    await isVisible(clusterDetail.nodes);
  });

  it("should allow switch to resources", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.resources);
    await isVisible(clusterDetail.resources);
  });

  it("should allow switch to fence devices", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.fenceDevices);
    await isVisible(clusterDetail.fenceDevices);
  });

  it("should allow switch to sbd", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.sbd);
    await isVisible(clusterDetail.sbd);
  });

  it("should allow switch to constraits", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.constraints);
    await isVisible(clusterDetail.constraints);
  });

  it("should allow switch to properties", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.properties);
    await isVisible(clusterDetail.properties);
  });

  it("should allow switch to acl", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.acl);
    await isVisible(clusterDetail.acl);
  });

  it("should allow switch to permissions", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.permissions);
    await isVisible(clusterDetail.permissions);
  });
});
