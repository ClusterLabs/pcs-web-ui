import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

const {breadcrumbs, overview, nodes, resources, fenceDevices} = marks.cluster;

const {textIs} = shortcuts.expect;
const {inCluster} = shortcuts.dashboard.importedClusters;

const clusterName = "ok";
const nodeNumber = "1";
const nodeName = `node-${nodeNumber}`;
const resourceId = "R1";
const fenceDeviceId = "F1";

const clusterListLoaded = async () => {
  await page.goto(backend.rootUrl);
  await isVisible(inCluster(clusterName).get(cluster => cluster.loaded));
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

    await click(inCluster(clusterName).get(cluster => cluster.name));
    await expectOnTheCluster();
    await isVisible(overview);

    await click(breadcrumbs.dashboard);
    await isVisible(marks.dashboard);
  });

  it("should allow to go to a node detail", async () => {
    intercept.shortcuts.interceptWithCluster({clusterStatus});
    await clusterListLoaded();

    await click(inCluster(clusterName).get(cluster => cluster.loaded.nodes));
    await click(
      inCluster(clusterName)
        .inNode(nodeName)
        .get(({name}) => name),
    );
    await expectOnTheCluster();
    await isVisible(nodes);
    await textIs(nodes.currentNode.name, nodeName);
  });

  it("should allow go to a resource detail", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      optionalRoutes: ["agentDummy"],
    });

    await clusterListLoaded();
    await click(
      inCluster(clusterName).get(cluster => cluster.loaded.resources),
    );
    await click(
      inCluster(clusterName)
        .inResource(resourceId)
        .get(({id}) => id),
    );
    await expectOnTheCluster();
    await isVisible(resources);
    await textIs(resources.currentPrimitive.id, resourceId);
  });

  it("should allow go to a fence device detail", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      optionalRoutes: ["agentFenceApc"],
    });

    await clusterListLoaded();
    await click(
      inCluster(clusterName).get(cluster => cluster.loaded.fenceDevices),
    );
    await click(
      inCluster(clusterName)
        .inFenceDevice(fenceDeviceId)
        .get(({id}) => id),
    );
    await expectOnTheCluster();
    await isVisible(fenceDevices);
    await textIs(fenceDevices.currentFenceDevice.id, fenceDeviceId);
  });
});
