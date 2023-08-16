import * as responses from "dev/responses";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

import {clusterName, goToPermissions, interceptForPermissions} from "./common";

type Permission = ReturnType<
  typeof responses.permissions
>["users_permissions"][number];

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

const {permission: permissionMark} = marks.cluster.permissions;

const launchRemove = async (name: string) => {
  await goToPermissions();
  const thePermission = shortcuts.common
    .item(permissionMark)
    .byKey(permissionMark.name, name);
  await click(thePermission.locator(permission => permission.actions));
  await click(thePermission.locator(permission => permission.actions.remove));
};

describe("Permission remove", () => {
  afterEach(intercept.stop);

  it("should be successfully removed", async () => {
    interceptForPermissions({
      usersPermissions: [haclientPermission, namePermission],
      additionalRouteList: [
        intercept.route.permissionsSave({
          clusterName,
          permissionList: [haclientPermission],
        }),
      ],
    });

    await launchRemove("name");
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should deal with an error", async () => {
    interceptForPermissions({
      usersPermissions: [haclientPermission, namePermission],
      additionalRouteList: [
        intercept.route.permissionsSave({
          clusterName,
          permissionList: [namePermission],
          response: {status: [400, "Error removing permission haclient"]},
        }),
      ],
    });

    await launchRemove("haclient");
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
