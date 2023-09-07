import {mock} from "test/tools";

import {clusterStatus, goToSbd} from "./common";

const {sbdDisable: task} = marks.task;

describe("Sbd disable", () => {
  it("should sucessfully disable sbd", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [mock.route.sbdDisable(clusterStatus.cluster_name)],
    });
    await goToSbd();
    await click(marks.cluster.sbdToolbar.disableSbd);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
