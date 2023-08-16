import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {clusterName, currentNodeToolbar, goToNode} from "./common";

const nodeName = "node-1";

const launchAction = async () => {
  await goToNode(nodeName);
  await currentNodeToolbar.launch(toolbar => toolbar.start);
};
const clusterStatus = cs.cluster(clusterName, "ok");

describe("Node start", () => {
  afterEach(mock.stop);

  it("should successfully start", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [mock.route.clusterStart({clusterName, nodeName})],
    });

    await launchAction();

    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    mock.shortcuts.withCluster({clusterStatus});

    await launchAction();

    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error from backend", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.clusterStart({
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
