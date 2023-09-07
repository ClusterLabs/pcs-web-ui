import * as responses from "dev/responses";

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

    await launchRemove("name");
    await click(marks.task.confirm.run);
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

    await launchRemove("haclient");
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
