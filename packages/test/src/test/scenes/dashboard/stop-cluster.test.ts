import * as responses from "dev/responses";

import {intercept, location, route} from "test/tools";
import {dashboard, task} from "test/workflow";

const clusterName = responses.clusterStatus.ok.cluster_name;
const cluster = dashboard.cluster(clusterName);
const taskStop = task.clusterStop;

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
    await cluster.stop.open();
    await taskStop.run();
    await taskStop.waitForSuccess();
    await taskStop.close();
  });

  it("should be cancelable", async () => {
    interceptWithDashboard();

    await page.goto(location.dashboard);
    await cluster.stop.open();
    await taskStop.cancel();
  });

  it("should deal with an error", async () => {
    interceptWithDashboard([
      route.clusterStop({clusterName, response: {status: 400}}),
    ]);

    await page.goto(location.dashboard);
    await cluster.stop.open();
    await taskStop.run();
    await taskStop.waitForError();
  });
});
