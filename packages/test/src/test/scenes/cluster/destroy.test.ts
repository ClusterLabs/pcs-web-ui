import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const clusterStatus = cs.cluster("test-cluster", "ok");

const confirmTitle = "Destroy the cluster?";

const mockForClusterDestroy = (routeList: mock.Route[] = []) =>
  mock.shortcuts.withCluster({
    clusterStatus,
    additionalRouteList: routeList,
  });

const launchDestroy = async () => {
  await goToCluster();
  await dropdown(
    marks.cluster.overviewToolbar.dropdown,
    marks.cluster.overviewToolbar.dropdown.destroyCluster,
  );
};

describe("Cluster destroy", () => {
  afterEach(mock.stop);

  it("should be successfully destroyed", async () => {
    mockForClusterDestroy([mock.route.destroyCluster({})]);

    await launchDestroy();
    await appConfirm.run(confirmTitle);
    await isVisible(
      marks.notifications.toast.success.locator.getByText("Cluster destroyed"),
    );
  });

  it("should be cancelable", async () => {
    mockForClusterDestroy();

    await launchDestroy();
    await appConfirm.cancel(confirmTitle);
  });

  it("should deal with an error", async () => {
    mockForClusterDestroy([mock.route.destroyCluster({status: 400})]);

    await launchDestroy();
    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.error);
  });
});
