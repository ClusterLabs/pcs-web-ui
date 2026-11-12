import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

const clusterStatus = cs.cluster("test-cluster", "ok");

const mockWithCluster = (routeList: mock.Route[] = []) =>
  mock.shortcuts.withCluster({
    clusterStatus,
    additionalRouteList: routeList,
  });

const {notifications} = marks;

const launchClusterStart = async () => {
  await goToCluster();
  await click(marks.cluster.overviewToolbar.startCluster);
  await appConfirm.run("Start cluster?");
};

// The toast covers the badge. Closing the toast (the notification stays in the
// drawer) is much faster than waiting until the toast hides itself.
const openDrawerFromToast = async (toast: {close: Mark}) => {
  await click(toast.close);
  await click(notifications.badge);
};

const expectNotificationsInDrawer = async ({
  success,
  error,
}: {
  success: number;
  error: number;
}) => {
  await assert.countIs(notifications.drawer.success, success);
  await assert.countIs(notifications.drawer.error, error);
};

describe("Notification drawer", () => {
  afterEach(mock.stop);

  it("should be displayed", async () => {
    mockWithCluster();

    await goToCluster();
    await click(notifications.badge);
    await isVisible(notifications.drawer);
    await expectNotificationsInDrawer({success: 0, error: 0});
  });

  it("should display cluster start success notification", async () => {
    mockWithCluster([mock.route.clusterStart({})]);

    await launchClusterStart();
    await openDrawerFromToast(notifications.toast.success);
    await expectNotificationsInDrawer({success: 1, error: 0});
  });

  it("should be able to close notification in badge", async () => {
    mockWithCluster([mock.route.clusterStart({})]);

    await launchClusterStart();
    await openDrawerFromToast(notifications.toast.success);
    await expectNotificationsInDrawer({success: 1, error: 0});
    await click(notifications.drawer.success.destroy);
    await expectNotificationsInDrawer({success: 0, error: 0});
  });

  it("should display cluster start error notification", async () => {
    mockWithCluster([mock.route.clusterStart({response: {status: 400}})]);

    await launchClusterStart();
    await openDrawerFromToast(notifications.toast.error);
    await expectNotificationsInDrawer({success: 0, error: 1});
  });
});
