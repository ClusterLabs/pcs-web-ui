import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToDashboard, importedClusters} = shortcuts.dashboard;

const {forceableConfirm: task} = marks.task;

const clusterName = "test-cluster";
const clusterStatus = cs.cluster(clusterName, "ok");

const mockWithDashboard = (routeList: mock.Route[] = []) => {
  mock.run([
    mock.route.importedClusterList({clusterNameList: [clusterName]}),
    mock.route.clusterStatus({clusterStatus}),
    ...routeList,
  ]);
};

const launchTask = async () => {
  await goToDashboard();
  await importedClusters
    .inCluster(clusterName)
    .launchAction(action => action.stop);
};

describe("Cluster stop", () => {
  afterEach(mock.stop);

  it("should be successfully removed", async () => {
    mockWithDashboard([mock.route.clusterStop({clusterName})]);

    await launchTask();
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should be cancelable", async () => {
    mockWithDashboard();

    await launchTask();
    await click(task.cancel);
    await isAbsent(task);
  });

  it("should deal with an error", async () => {
    mockWithDashboard([
      mock.route.clusterStop({clusterName, response: {status: 400}}),
    ]);

    await launchTask();
    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
