import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const clusterName = "test-cluster";
const clusterStatus = cs.cluster(clusterName, "ok");

const confirmTitle = `Destroy the cluster "${clusterName}"?`;

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
    await appConfirm.run(confirmTitle);
    await isVisible(
      marks.notifications.toast.success.locator.getByText(
        "Cluster removed from cluster list",
      ),
    );
    await isVisible(
      marks.notifications.toast.success.locator.getByText(
        "Cluster destroyed. Trying to remove it from cluster list...",
      ),
    );
  });

  it("should be cancelable", async () => {
    mockWithDashboard();

    await launchDestroy();
    await appConfirm.cancel(confirmTitle);
  });

  it("should deal with an error", async () => {
    mockWithDashboard([mock.route.destroyCluster({clusterName, status: 400})]);

    await launchDestroy();
    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.error);
  });
});
