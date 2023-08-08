import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";

import {clusterName, currentNodeToolbar, goToNode} from "./common";

const nodeName = "node-1";

const launchAction = async () => {
  await goToNode(nodeName);
  await currentNodeToolbar.launch(toolbar => toolbar.start);
};
const clusterStatus = cs.cluster(clusterName, "ok");

describe("Node start", () => {
  afterEach(intercept.stop);

  it("should successfully start", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        intercept.route.clusterStart({clusterName, nodeName}),
      ],
    });

    await launchAction();

    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    intercept.shortcuts.interceptWithCluster({clusterStatus});

    await launchAction();

    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error from backend", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        intercept.route.clusterStart({
          clusterName,
          nodeName,
          response: {status: [400, "Unable to start node."]},
        }),
      ],
    });

    await launchAction();

    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
