import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, location, route } from "test/tools";
import { getConfirmDialog, getDropdownMenu } from "test/components";

import { interceptForPermissions } from "./common";

type Permission = ReturnType<
  typeof responses.permissions
>["users_permissions"][number];

const clusterName = "ok";

const namePermission: Permission = {
  type: "user",
  name: "name",
  allow: ["read"],
};

const haclientPermission: Permission = {
  type: "group",
  name: "haclient",
  allow: ["grant", "read", "write"],
};

const tryRemovingPermission = async (name: string) => {
  const menu = getDropdownMenu("permission-list", `permission-${name}`);
  const confirmDialog = getConfirmDialog("remove");

  await page.goto(location.permissionList({ clusterName }));
  await menu.launchItem("permission-remove");
  await confirmDialog.confirm();
};

describe("Permission remove", () => {
  afterEach(intercept.stop);

  it("should be successfully removed", async () => {
    interceptForPermissions({
      clusterName,
      usersPermissions: [haclientPermission, namePermission],
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [haclientPermission],
        }),
      ],
    });

    await tryRemovingPermission("name");
    await page.waitForSelector(dt("notification-success"));
  });

  it("should deal with an error", async () => {
    interceptForPermissions({
      clusterName,
      usersPermissions: [haclientPermission, namePermission],
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [namePermission],
          response: { status: [400, "Error removing permission haclient"] },
        }),
      ],
    });

    await tryRemovingPermission("haclient");
    await page.waitForSelector(dt("notification-danger"));
  });
});
