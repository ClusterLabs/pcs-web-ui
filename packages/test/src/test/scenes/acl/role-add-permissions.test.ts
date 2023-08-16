import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus} from "./common";
import {goToRole, toolbar} from "./commonRole";

type Permission = Parameters<
  typeof mock.route.aclAddPermission
>[0]["permissionInfoList"][number];

const {radioGroup} = shortcuts.patternfly;
const {aclRoleAddPermission: task} = marks.task;

const roleId = "first";
const permission_1: Permission = ["read", "id", "some-id"];
const permission_2: Permission = ["write", "xpath", "some-xpath"];

describe("ACL role add permission task", () => {
  afterEach(mock.stop);
  it("should successfully add permissions to role", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.aclAddPermission({
          clusterName: clusterStatus.cluster_name,
          roleId,
          permissionInfoList: [permission_1, permission_2],
        }),
      ],
    });

    await goToRole(roleId);
    await toolbar.launch(toolbar => toolbar.addPermissions);

    const {
      add,
      permission: {kind, scopeType, scope},
    } = task;

    await radioGroup(kind.locator.nth(0), permission_1[0]);
    await radioGroup(scopeType.locator.nth(0), permission_1[1]);
    await fill(scope.locator.nth(0), permission_1[2]);

    await click(add);
    await radioGroup(kind.locator.nth(1), permission_2[0]);
    await radioGroup(scopeType.locator.nth(1), permission_2[1]);
    await fill(scope.locator.nth(1), permission_2[2]);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
