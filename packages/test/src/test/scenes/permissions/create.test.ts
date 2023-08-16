import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {
  clusterName,
  goToPermissions,
  mockForPermissions,
  toolbar,
} from "./common";

type Permission = Parameters<
  typeof mockForPermissions
>[0]["usersPermissions"][number];

const {radioGroup, getToggle, toggle, fieldError} = shortcuts.patternfly;

const {permissionEdit: task} = marks.task;

const basicPermission: Permission = {
  type: "group",
  name: "haclient",
  allow: ["grant", "read", "write"],
};
const name = "User1";
const type = "group";

const mockEditPermission = (allow: Permission["allow"]) =>
  mockForPermissions({
    usersPermissions: [basicPermission],
    additionalRouteList: [
      mock.route.permissionsSave({
        clusterName,
        permissionList: [basicPermission, {name, type, allow}],
      }),
    ],
  });

const launchTask = async () => {
  await goToPermissions();
  await toolbar.launch(toolbar => toolbar.createPermission);
};

const prefillTask = async () => {
  await fill(task.permissionName, name);
  await radioGroup(task.permissionType, type);
  await toggle(task.read);
};

const finishTask = async () => {
  await click(task.run);
  await isVisible(task.success);
  await click(task.success.close);
  await isAbsent(task);
};

describe("Create permission", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mockEditPermission(["grant"]);
    await launchTask();
    await prefillTask();
    await toggle(task.grant);

    await finishTask();
  });

  it("should add all permissions when full is selected", async () => {
    mockEditPermission(["read", "write", "grant", "full"]);
    await launchTask();
    await prefillTask();
    await toggle(task.full);

    await finishTask();
  });

  it("should add read permissions when write is selected", async () => {
    mockEditPermission(["read", "write"]);
    await launchTask();
    await prefillTask();
    await toggle(task.write);

    await finishTask();
  });

  it("should refuse to continue without essential data", async () => {
    mockForPermissions({
      usersPermissions: [basicPermission],
    });
    await launchTask();
    await prefillTask();
    await click(task.run);
    await isVisible(fieldError(getToggle(task.full)));
  });
});
