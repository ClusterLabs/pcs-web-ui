import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const {clusterStop: task} = marks.task;

const clusterStatus = cs.cluster("test-cluster", "ok");

const mockForClusterStop = (routeList: mock.Route[] = []) =>
  mock.shortcuts.withCluster({
    clusterStatus,
    additionalRouteList: routeList,
  });

const launchTask = async () => {
  await goToCluster();
  await click(marks.cluster.overviewToolbar.stopCluster);
};

describe("Cluster stop", () => {
  afterEach(mock.stop);

  it("should be successfully stopped", async () => {
    mockForClusterStop([mock.route.clusterStop({})]);

    await launchTask();
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should be cancelable", async () => {
    mockForClusterStop();

    await launchTask();
    await click(task.cancel);
    await isAbsent(task);
  });

  it("should deal with an error", async () => {
    mockForClusterStop([mock.route.clusterStop({response: {status: 400}})]);

    await launchTask();
    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
