import {intercept, route} from "test/tools";

import {clusterStatus, goToSbd, openTask} from "./common";

const {sbdDisable: task} = marks.task;

describe("Sbd disable", () => {
  it("should sucessfully disable sbd", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [route.sbdDisable(clusterStatus.cluster_name)],
    });
    await goToSbd();
    await openTask(toolbar => toolbar.disableSbd);
    await task.run.locator.highlight();
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
