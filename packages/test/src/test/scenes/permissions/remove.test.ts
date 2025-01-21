import type * as responses from "dev/responses";

import {mock} from "test/tools";

import {clusterName, goToPermissions, mockForPermissions} from "./common";

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
  await click(
    item.byName(permissionMark, name, [
      permission => permission.actions,
      permission => permission.actions.remove,
    ]),
  );
};
const confirmTitle = (permissionName: string) =>
  `Remove the permission "${permissionName}"?`;

describe("Permission remove", () => {
  afterEach(mock.stop);

  it("should be successfully removed", async () => {
    mockForPermissions({
      usersPermissions: [haclientPermission, namePermission],
      additionalRouteList: [
        mock.route.permissionsSave({
          clusterName,
          permissionList: [haclientPermission],
        }),
      ],
    });

    const permissionName = "name";
    await launchRemove(permissionName);
    await appConfirm.run(confirmTitle(permissionName));
    await isVisible(marks.notifications.toast.success);
  });

  it("should deal with an error", async () => {
    mockForPermissions({
      usersPermissions: [haclientPermission, namePermission],
      additionalRouteList: [
        mock.route.permissionsSave({
          clusterName,
          permissionList: [namePermission],
          response: {status: [400, "Error removing permission haclient"]},
        }),
      ],
    });

    const permissionName = "haclient";
    await launchRemove(permissionName);
    await appConfirm.run(confirmTitle(permissionName));
    await isVisible(marks.notifications.toast.error);
  });
});
