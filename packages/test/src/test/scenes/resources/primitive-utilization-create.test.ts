import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {tabs, utilization} = marks.cluster.resources.currentPrimitive;
const {nvsetEdit: task} = marks.task;

const resourceId = "A";
const utilizationPair = {
  name: "utilization_one",
  value: "10",
};

describe("Primitive utilization attributes create", () => {
  afterEach(intercept.stop);

  it("should be done successfully", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId)],
      }),
      additionalRouteList: [
        intercept.route.setResourceUtilization({
          clusterName,
          resourceId: resourceId,
          name: utilizationPair.name,
          value: utilizationPair.value,
        }),
      ],
    });

    await goToPrimitive(resourceId);
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
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId)],
      }),
      additionalRouteList: [
        intercept.route.setResourceUtilization({
          clusterName,
          resourceId: resourceId,
          name: utilizationPair.name,
          value: utilizationPair.value,
          response: {
            status: [
              400,
              `Unable to set utilization attribute '${utilizationPair.name}=${utilizationPair.value}'`
                + ` for resource "'${resourceId}': Some stderr...`,
            ],
          },
        }),
      ],
    });

    await goToPrimitive(resourceId);
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
