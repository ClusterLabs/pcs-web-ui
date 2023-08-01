import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToAcl, openRole} from "./common";

type Permission = Parameters<
  typeof route.aclAddPermission
>[0]["permissionInfoList"][number];

const {radioGroup} = shortcuts.patternfly;
const {aclRoleAddPermission} = marks.task;

const roleId = "first";
const permission_1: Permission = ["read", "id", "some-id"];
const permission_2: Permission = ["write", "xpath", "some-xpath"];

const openTask = async () => {
  await click(marks.clusterDetail.acl.currentRole.toolbar.addPermissions);
  await isVisible(aclRoleAddPermission);
};

describe("ACL role add permission task", () => {
  afterEach(intercept.stop);
  it("should successfully add permissions to role", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclAddPermission({
          clusterName: clusterStatus.cluster_name,
          roleId,
          permissionInfoList: [permission_1, permission_2],
        }),
      ],
    });
    await goToAcl(clusterStatus.cluster_name);
    await openRole(roleId);
    await openTask();

    const {
      add,
      permission: {kind, scopeType, scope},
    } = aclRoleAddPermission;

    await radioGroup(kind.locator.nth(0), permission_1[0]);
    await radioGroup(scopeType.locator.nth(0), permission_1[1]);
    await fill(scope.locator.nth(0), permission_1[2]);

    await click(add);
    await radioGroup(kind.locator.nth(1), permission_2[0]);
    await radioGroup(scopeType.locator.nth(1), permission_2[1]);
    await fill(scope.locator.nth(1), permission_2[2]);

    await click(aclRoleAddPermission.run);
    await isVisible(aclRoleAddPermission.success);
    await click(aclRoleAddPermission.success.close);
    await isAbsent(aclRoleAddPermission);
  });
});
