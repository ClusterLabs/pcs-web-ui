import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

const {breadcrumbs, overview, nodes, resources, fenceDevices} =
  app.clusterDetail;

const {textIs} = shortcuts.expect;
const {inClusterFenceDevice, inClusterResource, inClusterNode, inCluster} =
  shortcuts.dashboard.clusterList;

const clusterName = "ok";
const nodeNumber = "1";
const nodeName = `node-${nodeNumber}`;
const resourceId = "R1";
const fenceDeviceId = "F1";

const inTheCluster = inCluster(clusterName);

const clusterListLoaded = async () => {
  await page.goto(backend.rootUrl);
  await isVisible(inTheCluster(cluster => cluster.loaded));
};

const expectOnTheCluster = async () => {
  await textIs(breadcrumbs.clusterName, clusterName);
};

const clusterStatus = cs.cluster(clusterName, "ok", {
  node_list: [cs.node(nodeNumber)],
  resource_list: [cs.primitive(resourceId), cs.stonith(fenceDeviceId)],
});

describe("To cluster transition", () => {
  afterEach(intercept.stop);

  it("should allow go to a cluster detail and back", async () => {
    intercept.shortcuts.interceptWithCluster({clusterStatus});
    await clusterListLoaded();

    await click(inTheCluster(cluster => cluster.name));
    await expectOnTheCluster();
    await isVisible(overview.detail);

    await click(breadcrumbs.dashboard);
    await isVisible(app.dashboard);
  });

  it("should allow to go to a node detail", async () => {
    intercept.shortcuts.interceptWithCluster({clusterStatus});
    await clusterListLoaded();

    await click(inTheCluster(cluster => cluster.loaded.nodes));
    await click(inClusterNode(clusterName)(nodeName)(({name}) => name));
    await expectOnTheCluster();
    await isVisible(nodes.detail);
    await textIs(nodes.detail.currentNode.name, nodeName);
  });

  it("should allow go to a resource detail", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      optionalRoutes: ["agentDummy"],
    });

    await clusterListLoaded();
    await click(inTheCluster(cluster => cluster.loaded.resources));
    await click(inClusterResource(clusterName)(resourceId)(({id}) => id));
    await expectOnTheCluster();
    await isVisible(resources.detail);
    await textIs(resources.detail.currentResurce.primitive.id, resourceId);
  });

  it("should allow go to a fence device detail", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      optionalRoutes: ["agentFenceApc"],
    });

    await clusterListLoaded();
    await click(inTheCluster(cluster => cluster.loaded.fenceDevices));
    await click(inClusterFenceDevice(clusterName)(fenceDeviceId)(({id}) => id));
    await expectOnTheCluster();
    await isVisible(fenceDevices.detail);
    await textIs(fenceDevices.detail.currentFenceDevice.id, fenceDeviceId);
  });
});
