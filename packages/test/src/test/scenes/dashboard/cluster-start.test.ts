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

const launchStart = async () => {
  await shortcuts.dashboard.goToDashboard();
  await shortcuts.dashboard.importedClusters
    .inCluster(clusterName)
    .launchAction(action => action.start);
};

describe("Cluster destroy", () => {
  afterEach(intercept.stop);

  it("should be successfully destroyed", async () => {
    interceptWithDashboard([intercept.route.clusterStart({clusterName})]);

    await launchStart();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    interceptWithDashboard();

    await launchStart();
    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error", async () => {
    interceptWithDashboard([
      intercept.route.clusterStart({clusterName, response: {status: 400}}),
    ]);

    await launchStart();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
