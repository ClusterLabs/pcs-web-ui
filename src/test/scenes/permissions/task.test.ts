import * as responses from "dev/responses";

import { intercept, location, route, shortcuts } from "test/tools";
import { mkXPath } from "test/tools/selectors";
import { formSwitch, radioGroup } from "test/tools/workflows";

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

const permissionName = "User1";
const permissionType = "group";
const permissionsLocation = location.permissionList({ clusterName });

const basicPermission: Permission = {
  type: "group",
  name: "haclient",
  allow: ["grant", "read", "write"],
};

describe("Pemissions", () => {
  afterEach(intercept.stop);

  it("should be displayed according to response data", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.permissionsSave({
          clusterName,
          permissionList: [
            basicPermission,
            { name: permissionName, type: permissionType, allow: ["grant"] },
          ],
        }),
      ],
      replaceRoutes: {
        permissions: route.getPermissions({
          clusterName,
          permissions: {
            ...responses.permissions(),
            // start with basic permission to see it is combined with new one
            users_permissions: [basicPermission],
          },
        }),
      },
    });
    await page.goto(permissionsLocation);
    await page.click(task.toolbarItem);
    await page.waitForSelector(task.view);
    await page.type(task.name, permissionName);
    await radioGroup(task.type, permissionType);
    await formSwitch(task.read); // swith to off since it is on by default
    await formSwitch(task.grant);
    await page.click(task.run);
    await page.waitForSelector(task.success);
    await page.click(task.close);
    await page.waitForURL(permissionsLocation);
  });
});
