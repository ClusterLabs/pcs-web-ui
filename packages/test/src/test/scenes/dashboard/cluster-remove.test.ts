import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {launchClusterItemAction} from "./common";

const clusterName = "test-cluster";
const clusterStatus = cs.cluster(clusterName, "ok");

const mockWithDashboard = (routeList: mock.Route[] = []) => {
  mock.shortcuts.withDashboard({
    clusterStatus,
    routeList,
  });
};

const launchRemove = async () => {
  await goToDashboard();
  await launchClusterItemAction(clusterName, a => a.remove);
};

describe("Cluster remove", () => {
  afterEach(mock.stop);

  it("should be successfully removed", async () => {
    mockWithDashboard([mock.route.removeCluster({clusterName})]);

    await launchRemove();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    mockWithDashboard();

    await launchRemove();
    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error", async () => {
    mockWithDashboard([mock.route.removeCluster({clusterName, status: 400})]);

    await launchRemove();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
