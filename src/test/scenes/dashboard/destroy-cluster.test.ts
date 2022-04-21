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

describe("Cluster destroy", () => {
  afterEach(intercept.stop);

  it("should be successfully destroyed", async () => {
    interceptWithDashboard([
      route.destroyCluster({ clusterName }),
      route.removeCluster({ clusterName }),
    ]);

    await page.goto(location.dashboard);
    await cluster.destroy.launch();
    await notification.waitForSuccess();
  });

  it("should be cancelable", async () => {
    interceptWithDashboard();

    await page.goto(location.dashboard);
    await cluster.destroy.click();
    await cluster.destroy.cancel();
  });

  it("should deal with an error", async () => {
    interceptWithDashboard([
      route.destroyCluster({ clusterName, status: 400 }),
    ]);

    await page.goto(location.dashboard);
    await cluster.destroy.launch();
    await notification.waitForFail();
  });
});
