import * as responses from "dev/responses";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.clusterDetail;
const {textIs} = shortcuts.expect;
const {clusterDetail} = app;

const clusterName = "ok";

const startOnOverview = async () => {
  await goToCluster(clusterName);
  await textIs(clusterDetail.breadcrumbs.clusterName, clusterName);
  await isVisible(clusterDetail.overview.detail);
};

describe("Cluster detail tab switch", () => {
  beforeEach(
    intercept.start([
      route.importedClusterList({
        clusterStatusList: [responses.clusterStatus.ok],
      }),
      route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
      route.resourceAgentListAgents("ok"),
      route.stonithAgentListAgents({clusterName: "ok"}),
      route.getClusterPropertiesDefinition({clusterName: "ok"}),
      route.getPermissions({clusterName}),
    ]),
  );
  afterEach(intercept.stop);

  it("should allow switch to nodes", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.nodes);
    await isVisible(clusterDetail.nodes.detail);
  });

  it("should allow switch to resources", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.resources);
    await isVisible(clusterDetail.resources.detail);
  });

  it("should allow switch to fence devices", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.fenceDevices);
    await isVisible(clusterDetail.fenceDevices.detail);
  });

  it("should allow switch to sbd", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.sbd);
    await isVisible(clusterDetail.sbd.detail);
  });

  it("should allow switch to constraits", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.constraints);
    await isVisible(clusterDetail.constraints.detail);
  });

  it("should allow switch to properties", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.properties);
    await isVisible(clusterDetail.properties.detail);
  });

  it("should allow switch to acl", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.acl);
    await isVisible(clusterDetail.acl.detail);
  });

  it("should allow switch to permissions", async () => {
    await startOnOverview();
    await click(clusterDetail.tabs.permissions);
    await isVisible(clusterDetail.permissions.detail);
  });
});
