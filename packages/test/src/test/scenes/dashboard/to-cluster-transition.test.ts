import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

const {clusterBreadcrumbs} = marks;
const {overview, nodes, resources, fenceDevices} = marks.cluster;
const {cluster: importedCluster} = marks.dashboard.clusterList;

const clusterName = "ok";
const nodeNumber = "1";
const nodeName = `node-${nodeNumber}`;
const resourceId = "R1";
const fenceDeviceId = "F1";

const inTheCluster = (search: (c: typeof importedCluster) => Mark) =>
  item.byName(importedCluster, clusterName, search);

const clusterListLoaded = async () => {
  await goToDashboard();
  await isVisible(item.byName(importedCluster, clusterName, c => c.nodeCount));
};

const expectOnTheCluster = async () => {
  await assert.textIs(clusterBreadcrumbs.clusterName, clusterName);
};

const clusterStatus = cs.cluster(clusterName, "ok", {
  node_list: [cs.node(nodeNumber)],
  resource_list: [cs.primitive(resourceId), cs.stonith(fenceDeviceId)],
});

describe("To cluster transition", () => {
  afterEach(mock.stop);

  it("should allow go to a cluster detail and back", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await clusterListLoaded();

    await click(item.byName(importedCluster, clusterName, c => c.name));
    await expectOnTheCluster();
    await isVisible(overview);

    await click(clusterBreadcrumbs.dashboard);
    await isVisible(marks.dashboard);
  });

  it("should allow to go to a node detail", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await clusterListLoaded();

    await click(inTheCluster(c => c.nodeCount));
    await click(inTheCluster(c => item.byName(c.node, nodeName, n => n.name)));
    await expectOnTheCluster();
    await isVisible(nodes);
    await assert.textIs(nodes.currentNode.name, nodeName);
  });

  it("should allow go to a resource detail", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      optionalRoutes: ["agentDummy"],
    });

    await clusterListLoaded();
    await click(inTheCluster(c => c.resourceCount));
    await click(
      inTheCluster(c => item.byId(c.resource, resourceId, r => r.id)),
    );
    await expectOnTheCluster();
    await isVisible(resources);
    await assert.textIs(resources.currentPrimitive.id, resourceId);
  });

  it("should allow go to a fence device detail", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      optionalRoutes: ["agentFenceApc"],
    });

    await clusterListLoaded();
    await click(inTheCluster(c => c.fenceDeviceCount));
    await click(
      inTheCluster(c => item.byId(c.fenceDevice, fenceDeviceId, f => f.id)),
    );
    await expectOnTheCluster();
    await isVisible(fenceDevices);
    await assert.textIs(fenceDevices.currentFenceDevice.id, fenceDeviceId);
  });
});
