import * as responses from "dev/responses";

import {intercept, location, route} from "test/tools";
import {dashboard, notification} from "test/workflow";

const clusterName = responses.clusterStatus.ok.cluster_name;
const cluster = dashboard.cluster(clusterName);

const interceptWithDashboard = (routeList: intercept.Route[] = []) => {
  intercept.run([
    route.importedClusterList({clusterNameList: [clusterName]}),
    route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
    ...routeList,
  ]);
};

describe("Cluster stop", () => {
  afterEach(intercept.stop);

  it("should be successfully removed", async () => {
    interceptWithDashboard([route.clusterStop({clusterName})]);

    await page.goto(location.dashboard);
    await cluster.stop.launch();
    await notification.waitForSuccess();
  });

  it("should be cancelable", async () => {
    interceptWithDashboard();

    await page.goto(location.dashboard);
    await cluster.stop.click();
    await cluster.stop.cancel();
  });

  it("should deal with an error", async () => {
    interceptWithDashboard([
      route.clusterStop({clusterName, response: {status: 400}}),
    ]);

    await page.goto(location.dashboard);
    await cluster.stop.launch();
    await notification.waitForFail();
  });
});
