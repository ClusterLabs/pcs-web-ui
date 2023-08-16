import {intercept} from "test/tools";

import {clusterStatus, goToSbd, toolbar} from "./common";

const {sbdDisable: task} = marks.task;

describe("Sbd disable", () => {
  it("should sucessfully disable sbd", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        intercept.route.sbdDisable(clusterStatus.cluster_name),
      ],
    });
    await goToSbd();
    await toolbar.launch(toolbar => toolbar.disableSbd);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
