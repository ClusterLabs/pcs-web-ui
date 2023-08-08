import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

const clusterName = "test-cluster";
const clusterStatus = cs.cluster(clusterName, "ok");

const interceptWithDashboard = (routeList: intercept.Route[] = []) => {
  intercept.shortcuts.interceptWithDashboard({
    clusterStatus,
    routeList,
  });
};

const launchRemove = async () => {
  await shortcuts.dashboard.goToDashboard();
  await shortcuts.dashboard.importedClusters
    .inCluster(clusterName)
    .launchAction(action => action.remove);
};

describe("Cluster remove", () => {
  afterEach(intercept.stop);

  it("should be successfully removed", async () => {
    interceptWithDashboard([intercept.route.removeCluster({clusterName})]);

    await launchRemove();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    interceptWithDashboard();

    await launchRemove();
    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error", async () => {
    interceptWithDashboard([
      intercept.route.removeCluster({clusterName, status: 400}),
    ]);

    await launchRemove();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
