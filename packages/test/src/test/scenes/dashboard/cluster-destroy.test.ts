import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const clusterName = "test-cluster";
const clusterStatus = cs.cluster(clusterName, "ok");

const mockWithDashboard = (routeList: mock.Route[] = []) => {
  mock.shortcuts.withDashboard({
    clusterStatus,
    routeList,
  });
};

const launchDestroy = async () => {
  await goToDashboard();
  await click(
    item.byName(marks.dashboard.clusterList.cluster, clusterName, [
      c => c.actions,
      c => c.actions.destroy,
    ]),
  );
};

describe("Cluster destroy", () => {
  afterEach(mock.stop);

  it("should be successfully destroyed", async () => {
    mockWithDashboard([
      mock.route.destroyCluster({clusterName}),
      mock.route.removeCluster({clusterName}),
    ]);

    await launchDestroy();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    mockWithDashboard();

    await launchDestroy();
    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error", async () => {
    mockWithDashboard([mock.route.destroyCluster({clusterName, status: 400})]);

    await launchDestroy();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
