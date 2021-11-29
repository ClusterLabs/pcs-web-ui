import * as responses from "dev/responses";

import { intercept, location, route } from "test/tools";
import { mkXPath } from "test/tools/selectors";
import { formSwitch, hasFieldError, radioGroup } from "test/tools/workflows";

import { interceptForPermissions } from "./common";

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
  run: mkXPath("task-footer-run"),
  success: mkXPath(view, "task-success"),
  close: mkXPath(view, "task-close"),
};

const newPermission: Permission = {
  name: "User1",
  type: "group",
  allow: ["grant"],
};
const permissionsLocation = location.permissionList({ clusterName });

const basicPermission: Permission = {
  type: "group",
  name: "haclient",
  allow: ["grant", "read", "write"],
};

describe("Pemissions", () => {
  afterEach(intercept.stop);

  it("should create new permission", async () => {
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
    await page.goto(permissionsLocation);
    await page.click(task.toolbarItem);
    await page.waitForSelector(task.view);
    await page.type(task.name, newPermission.name);
    await radioGroup(task.type, newPermission.type);
    await formSwitch(task.read); // swith to off since it is on by default
    await formSwitch(task.grant); // switch to on
    await page.click(task.run);
    await page.waitForSelector(task.success);
    await page.click(task.close);
    await page.waitForURL(permissionsLocation);
  });

  it.only("should refuse to continue without essential data", async () => {
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
    await page.goto(permissionsLocation);
    await page.click(task.toolbarItem);
    await page.waitForSelector(task.view);
    await formSwitch(task.read); // swith to off since it is on by default
    await page.click(task.run);
    await hasFieldError(task.name);
    await hasFieldError(`${task.full}/parent::*`);
  });
});
