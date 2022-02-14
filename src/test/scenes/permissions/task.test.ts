import * as responses from "dev/responses";

import { intercept, location, route } from "test/tools";
import { mkXPath } from "test/tools/selectors";
import * as workflow from "test/workflow";

import { interceptForPermissions } from "./common";

const { formSwitch, hasFieldError, radioGroup } = workflow.form;

type Permission = ReturnType<
  typeof responses.permissions
>["users_permissions"][number];

const clusterName = "ok";

const view = "permission-edit";
const task = {
  toolbarItem: mkXPath("permission-create"),
  view: mkXPath(view),
  name: mkXPath(view, "name"),
  type: mkXPath(view, "type"),
  read: mkXPath(view, "read"),
  write: mkXPath(view, "write"),
  grant: mkXPath(view, "grant"),
  full: mkXPath(view, "full"),
  run: mkXPath("task-next"),
  success: mkXPath(view, "task-success"),
  close: mkXPath(view, "task-close"),
};

const permissionsLocation = location.permissionList({ clusterName });

const basicPermission: Permission = {
  type: "group",
  name: "haclient",
  allow: ["grant", "read", "write"],
};

const openNewPermission = async () => {
  await page.goto(permissionsLocation);
  await page.click(task.toolbarItem);
  await page.waitForSelector(task.view);
};

const finishNewPermissionSucessfully = async () => {
  await page.click(task.run);
  await page.waitForSelector(task.success);
  await page.click(task.close);
  expect(page.url()).toEqual(permissionsLocation);
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
    await page.type(task.name, newPermission.name);
    await radioGroup(task.type, newPermission.type);
    await formSwitch(task.read); // swith to off since it is on by default
    await formSwitch(task.grant); // switch to on
    await finishNewPermissionSucessfully();
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
    await page.type(task.name, newPermission.name);
    await radioGroup(task.type, newPermission.type);
    await formSwitch(task.read); // swith to off since it is on by default
    await formSwitch(task.full); // switch to on
    await finishNewPermissionSucessfully();
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
    await page.type(task.name, newPermission.name);
    await radioGroup(task.type, newPermission.type);
    await formSwitch(task.read); // swith to off since it is on by default
    await formSwitch(task.write); // switch to on
    await finishNewPermissionSucessfully();
  });

  it("should refuse to continue without essential data", async () => {
    interceptForPermissions({
      clusterName,
      usersPermissions: [basicPermission],
    });
    await openNewPermission();
    await formSwitch(task.read); // swith to off since it is on by default
    await page.click(task.run);
    await hasFieldError(task.name);
    await hasFieldError(`${task.full}/parent::*`);
  });
});
