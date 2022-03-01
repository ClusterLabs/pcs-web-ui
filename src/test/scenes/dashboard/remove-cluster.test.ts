import * as responses from "dev/responses";

import { intercept, location, route } from "test/tools";
import { dashboard, notification } from "test/workflow";

const clusterName = responses.clusterStatus.ok.cluster_name;
const cluster = dashboard.cluster(clusterName);

const interceptWithDashboard = (routeList: intercept.Route[] = []) => {
  intercept.run([
    route.importedClusterList({ clusterNameList: [clusterName] }),
    route.clusterStatus({ clusterStatus: responses.clusterStatus.ok }),
    ...routeList,
  ]);
};

describe("Cluster remove", () => {
  afterEach(intercept.stop);

  it("should be successfully removed", async () => {
    interceptWithDashboard([route.removeCluster({ clusterName })]);

    await page.goto(location.dashboard);
    await cluster.remove.launch();
    await notification.waitForSuccess();
  });

  it("should be cancelable", async () => {
    interceptWithDashboard();

    await page.goto(location.dashboard);
    await cluster.remove.click();
    await cluster.remove.cancel();
  });

  it("should deal with an error", async () => {
    interceptWithDashboard([route.removeCluster({ clusterName, status: 400 })]);

    await page.goto(location.dashboard);
    await cluster.remove.launch();
    await notification.waitForFail();
  });
});
