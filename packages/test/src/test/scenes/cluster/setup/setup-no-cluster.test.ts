import {mock} from "test/tools";

import {
  expectReports,
  mockForClusterSetupWithNoCluster,
  routeCheckAuth,
  routeClusterSetup,
  sendMinimalSetup,
} from "./common";

const {clusterSetup: task} = marks.task;
const {noCluster} = marks.cluster;

describe("Cluster setup when the host is not in a cluster", () => {
  afterEach(mock.stop);

  it("should display no cluster info", async () => {
    mock.shortcuts.withNoCluster();
    await goToCluster();
    await isVisible(noCluster);
    await isVisible(noCluster.setupCluster);
  });

  it("should successfully setup cluster", async () => {
    mockForClusterSetupWithNoCluster([routeCheckAuth, routeClusterSetup()]);
    await goToCluster();
    await click(noCluster.setupCluster);
    await sendMinimalSetup();
    await isVisible(task.success);
    await expectReports(0);
    await click(task.success.close);
    await isAbsent(marks.task.clusterSetup);
    // After a successful setup the application refreshes the cluster status.
    // The mocked cluster status keeps answering "not in a cluster", so the
    // application stays in the no cluster state here. The transition into the
    // newly created cluster is covered by the real backend test.
  });
});
