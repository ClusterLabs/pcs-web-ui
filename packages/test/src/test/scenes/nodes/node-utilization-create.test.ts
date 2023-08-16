import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";

import {clusterName, goToNode} from "./common";

const {tabs, utilization} = marks.cluster.nodes.currentNode;
const {nvsetEdit: task} = marks.task;

const nodeName = "node-1";
const utilizationPair = {
  name: "node-utilization-1",
  value: "10",
};

describe("Node utilization attributes create", () => {
  afterEach(intercept.stop);

  it("should be done successfully", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
      additionalRouteList: [
        intercept.route.setNodeUtilization({
          clusterName,
          nodeName,
          name: utilizationPair.name,
          value: utilizationPair.value,
        }),
      ],
    });

    await goToNode(nodeName);
    await click(tabs.utilization);
    await click(utilization.toolbar.create);

    await fill(task.name, utilizationPair.name);
    await fill(task.value, utilizationPair.value);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should display error when occurred utilization create", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
      additionalRouteList: [
        intercept.route.setNodeUtilization({
          clusterName,
          nodeName,
          name: utilizationPair.name,
          value: utilizationPair.value,
          response: {
            status: [
              400,
              `Unable to set utilization '${utilizationPair.name}=${utilizationPair.value}'`
                + ` for node "'${nodeName}': Some stderr...`,
            ],
          },
        }),
      ],
    });

    await goToNode(nodeName);
    await click(tabs.utilization);
    await click(utilization.toolbar.create);

    await fill(task.name, utilizationPair.name);
    await fill(task.value, utilizationPair.value);

    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
