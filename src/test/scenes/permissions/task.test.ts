import * as responses from "dev/responses";

import {intercept, location, route} from "test/tools";
import * as workflow from "test/workflow";

import {interceptForPermissions} from "./common";

const {
  open,
  fillName,
  selectType,
  switchPermission,
  hasNameError,
  hasPermissionError,
  run,
  close,
  waitForSuccess,
} = workflow.task.permissionEdit;

type Permission = ReturnType<
  typeof responses.permissions
>["users_permissions"][number];

const clusterName = "ok";

const basicPermission: Permission = {
  type: "group",
  name: "haclient",
  allow: ["grant", "read", "write"],
};

const openNewPermission = async () => {
  await page.goto(location.permissionList({clusterName}));
  await open();
};

const finishNewPermissionSuccessfully = async () => {
  await run();
  await waitForSuccess();
  await close();
};

describe("Permissions", () => {
  afterEach(intercept.stop);

  it("should create new permission", async () => {
    const newPermission: Permission = {
      name: "User1",
      type: "group",
      allow: ["grant"],
    };
    interceptForPermissions({
      clusterName,
      usersPermissions: [basicPermission],
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [basicPermission, newPermission],
        }),
      ],
    });
    await openNewPermission();
    await fillName(newPermission.name);
    await selectType(newPermission.type);
    await switchPermission("read"); // switch to off since it is on by default
    await switchPermission("grant"); // switch to on
    await finishNewPermissionSuccessfully();
  });

  it("should add all permissions when full is selected", async () => {
    const newPermission: Permission = {
      name: "User1",
      type: "group",
      allow: ["read", "write", "grant", "full"],
    };
    interceptForPermissions({
      clusterName,
      usersPermissions: [basicPermission],
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [basicPermission, newPermission],
        }),
      ],
    });
    await openNewPermission();
    await fillName(newPermission.name);
    await selectType(newPermission.type);
    await switchPermission("read"); // switch to off since it is on by default
    await switchPermission("full"); // switch to on
    await finishNewPermissionSuccessfully();
  });

  it("should add read permissions when write is selected", async () => {
    const newPermission: Permission = {
      name: "User1",
      type: "group",
      allow: ["read", "write"],
    };
    interceptForPermissions({
      clusterName,
      usersPermissions: [basicPermission],
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [basicPermission, newPermission],
        }),
      ],
    });
    await openNewPermission();
    await fillName(newPermission.name);
    await selectType(newPermission.type);
    await switchPermission("read"); // switch to off since it is on by default
    await switchPermission("write"); // switch to on
    await finishNewPermissionSuccessfully();
  });

  it("should refuse to continue without essential data", async () => {
    interceptForPermissions({
      clusterName,
      usersPermissions: [basicPermission],
    });
    await openNewPermission();
    await switchPermission("read"); // switch to off since it is on by default
    await run();
    await hasNameError();
    await hasPermissionError("full");
  });
});
