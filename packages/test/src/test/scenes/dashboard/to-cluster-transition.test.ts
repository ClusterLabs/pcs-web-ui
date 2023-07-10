import * as responses from "dev/responses";

import * as shortcuts from "test/shortcuts";
import {intercept, route} from "test/tools";

const {cluster} = app.dashboard.clusterList;
const {clusterDetail} = app;

const {clusterList} = shortcuts.dashboard;
const {textIs} = shortcuts.expect;

const clusterName = "ok";
const nodeName = "node-1";

const interceptWithDashboard = (routeList: intercept.Route[]) =>
  intercept.run([
    route.importedClusterList({
      clusterStatusList: [
        responses.clusterStatus.ok,
        responses.clusterStatus.error,
      ],
    }),
    route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
    route.resourceAgentListAgents(clusterName),
    route.stonithAgentListAgents({clusterName}),
    route.getClusterPropertiesDefinition({clusterName}),
    route.getPermissions({clusterName}),
    route.clusterStatus({clusterStatus: responses.clusterStatus.error}),
    ...routeList,
  ]);

const inTheCluster = clusterList.inCluster(clusterName);
const inTheClusterNode = clusterList.inClusterNode(clusterName)(nodeName);

const clusterListLoaded = async () => {
  await page.goto(backend.rootUrl);
  await isVisible(inTheCluster(cluster.loaded));
};

const expectOnTheCluster = async () => {
  await textIs(clusterDetail.breadcrumbs.clusterName, clusterName);
};

describe("To cluster transition", () => {
  afterEach(intercept.stop);
  it("should allow go to a cluster detail and back", async () => {
    interceptWithDashboard([]);
    await clusterListLoaded();

    await click(inTheCluster(cluster.name));
    await expectOnTheCluster();
    await isVisible(clusterDetail.overview.detail);

    await click(clusterDetail.breadcrumbs.dashboard);
    await isVisible(app.dashboard);
  });

  it("should allow to go to a node detail", async () => {
    interceptWithDashboard([]);
    await clusterListLoaded();

    await click(inTheCluster(cluster.loaded.nodes));
    await click(inTheClusterNode(cluster.loaded.nodes.list.node.name));
    await expectOnTheCluster();
    await isVisible(clusterDetail.nodes.detail);
    await textIs(clusterDetail.nodes.detail.currentNode.name, nodeName);
  });

  it("should allow go to a resource detail", async () => {
    interceptWithDashboard([
      route.resourceAgentDescribeAgent({
        clusterName: "ok",
        agentName: "ocf:heartbeat:Dummy",
        agentData: responses.resourceAgentMetadata.ocfHeartbeatDummy,
      }),
    ]);
    const resourceId = "R1";
    const inTheClusterResource =
      clusterList.inClusterResource(clusterName)(resourceId);

    await clusterListLoaded();
    await click(inTheCluster(cluster.loaded.resources));
    await click(
      inTheClusterResource(cluster.loaded.resources.list.resource.id),
    );
    await expectOnTheCluster();
    await isVisible(clusterDetail.resources.detail);
    await textIs(
      clusterDetail.resources.detail.currentResurce.primitive.id,
      resourceId,
    );
  });

  it("should allow go to a fence device detail", async () => {
    interceptWithDashboard([
      route.stonithAgentDescribeAgent({
        clusterName: "ok",
        agentName: "fence_apc",
        agentData: responses.fenceAgentMetadata.ok,
      }),
    ]);
    const fenceDeviceId = "F1";
    const inTheClusterFenceDevice =
      clusterList.inClusterFenceDevice(clusterName)(fenceDeviceId);

    await clusterListLoaded();
    await click(inTheCluster(cluster.loaded.fenceDevices));
    await click(
      inTheClusterFenceDevice(cluster.loaded.fenceDevices.list.fenceDevice.id),
    );
    await expectOnTheCluster();
    await isVisible(clusterDetail.fenceDevices.detail);
    await textIs(
      clusterDetail.fenceDevices.detail.currentFenceDevice.id,
      fenceDeviceId,
    );
  });
});
