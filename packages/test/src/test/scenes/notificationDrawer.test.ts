import * as responses from "dev/responses";

import {intercept, location, route} from "test/tools";
import {dt} from "test/tools/selectors";
import {dashboard, notification} from "test/workflow";
import {getConfirmDialog, getDropdownMenu} from "test/components";

import {interceptForPermissions} from "./permissions/common";

const clusterName = responses.clusterStatus.ok.cluster_name;
const cluster = dashboard.cluster(clusterName);

type Permission = ReturnType<
  typeof responses.permissions
>["users_permissions"][number];

const okPermission: Permission = {
  type: "user",
  name: "ok",
  allow: [],
};
const errorPermission: Permission = {
  type: "group",
  name: "error",
  allow: [],
};

const interceptWithDashboard = (routeList: intercept.Route[] = []) => {
  intercept.run([
    route.importedClusterList({clusterNameList: [clusterName]}),
    route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
    ...routeList,
  ]);
};

describe("Notification drawer", () => {
  afterEach(intercept.stop);

  it("should be desplayed empty", async () => {
    interceptWithDashboard([route.removeCluster({clusterName})]);

    await page.goto(location.dashboard);
    await page.click(dt("notification-badge"));
    await page.waitForSelector(dt("drawer-empty"));
  });

  it("should desplay cluster remove success notification", async () => {
    interceptWithDashboard([route.removeCluster({clusterName})]);

    await page.goto(location.dashboard);
    await cluster.remove.launch();
    await notification.waitForSuccess();
    await page.click(dt("notification-badge"));
    await page.waitForSelector(dt("notification-success-cluster-remove"));
  });

  it("should desplay cluster remove danger notification", async () => {
    interceptWithDashboard([route.removeCluster({clusterName, status: 400})]);

    await page.goto(location.dashboard);
    await cluster.remove.launch();
    await notification.waitForFail();
    await page.click(dt("notification-badge"));
    await page.waitForSelector(dt("notification-danger-cluster-remove"));
  });

  it("should delete permission remove success notification", async () => {
    interceptForPermissions({
      clusterName: "ok",
      usersPermissions: [okPermission, errorPermission],
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [errorPermission],
        }),
      ],
    });

    const menu = getDropdownMenu("permission-list", "permission-ok");
    const confirmDialog = getConfirmDialog("remove");

    await page.goto(location.permissionList({clusterName}));
    await menu.launchItem("permission-remove");
    await confirmDialog.confirm();

    await page.click(dt("notification-badge"));
    await page.waitForSelector(dt("notification-success-permission-remove"));
    await page.click(dt("destroy-permission-remove"));
    await page.waitForSelector(dt("drawer-empty"));
  });
});
