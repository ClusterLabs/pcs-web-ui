import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const clusterStatus = cs.cluster("test-cluster", "ok");

const confirmTitle = "Start cluster?";

const mockForClusterStart = (routeList: mock.Route[] = []) =>
  mock.shortcuts.withCluster({
    clusterStatus,
    additionalRouteList: routeList,
  });

const launchStart = async () => {
  await goToCluster();
  await click(marks.cluster.overviewToolbar.startCluster);
};

describe("Cluster start", () => {
  afterEach(mock.stop);

  it("should be successfully started", async () => {
    mockForClusterStart([mock.route.clusterStart({})]);

    await launchStart();
    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    mockForClusterStart();

    await launchStart();
    await appConfirm.cancel(confirmTitle);
  });

  it("should deal with an error", async () => {
    mockForClusterStart([mock.route.clusterStart({response: {status: 400}})]);

    await launchStart();
    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.error);
  });
});
