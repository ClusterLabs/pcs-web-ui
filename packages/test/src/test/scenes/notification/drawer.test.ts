import * as responses from "dev/responses";

import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {countIs} = shortcuts.expect;

const clusterName = responses.clusterStatus.ok.cluster_name;

const mockWithDashboard = (routeList: mock.Route[] = []) => {
  mock.run([
    mock.route.importedClusterList({clusterNameList: [clusterName]}),
    mock.route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
    ...routeList,
  ]);
};

const {notifications} = marks;

const launchClusterRemove = async () => {
  await shortcuts.dashboard.goToDashboard();
  await shortcuts.dashboard.importedClusters
    .inCluster(clusterName)
    .launchAction(action => action.remove);
  await click(marks.task.confirm.run);
};

const expectNotificationsInDrawer = async ({
  success,
  error,
}: {
  success: number;
  error: number;
}) => {
  await countIs(notifications.drawer.success, success);
  await countIs(notifications.drawer.error, error);
};

describe("Notification drawer", () => {
  afterEach(mock.stop);

  it("should be displayed", async () => {
    mockWithDashboard();

    await shortcuts.dashboard.goToDashboard();
    await click(notifications.badge);
    await isVisible(notifications.drawer);
    await expectNotificationsInDrawer({success: 0, error: 0});
  });

  it("should display cluster remove success notification", async () => {
    mockWithDashboard([mock.route.removeCluster({clusterName})]);

    await launchClusterRemove();
    await isVisible(notifications.toast.success);
    await click(notifications.badge);
    await expectNotificationsInDrawer({success: 1, error: 0});
  });

  it("should be able to close notification in badge", async () => {
    mockWithDashboard([mock.route.removeCluster({clusterName})]);

    await launchClusterRemove();
    await isVisible(notifications.toast.success);
    await click(notifications.badge);
    await expectNotificationsInDrawer({success: 1, error: 0});
    await click(notifications.drawer.success.destroy);
    await expectNotificationsInDrawer({success: 0, error: 0});
  });

  it("should display cluster remove error notification", async () => {
    mockWithDashboard([mock.route.removeCluster({clusterName, status: 400})]);

    await launchClusterRemove();
    await isVisible(notifications.toast.error);
    await click(notifications.badge);
    await expectNotificationsInDrawer({success: 0, error: 1});
  });
});
