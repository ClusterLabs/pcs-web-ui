import {assert, mock} from "test/tools";

import {clusterStatus, goToAcl} from "./common";

const {aclRoleCreate} = marks.task;
const {review} = aclRoleCreate;

type Permission = Parameters<
  typeof mock.route.aclRoleCreate
>[0]["permissionInfoList"][number];

const roleId = "third";
const description = "Third description";
const permission_1: Permission = ["read", "id", "some-id"];
const permission_2: Permission = ["write", "xpath", "some-xpath"];

describe("Create acl role task", () => {
  it("should successfully create new role", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.aclRoleCreate({
          clusterName: clusterStatus.cluster_name,
          roleId,
          description,
          permissionInfoList: [permission_1, permission_2],
        }),
      ],
    });
    await goToAcl();
    await click(marks.cluster.aclToolbar.createRole);
    await fill(aclRoleCreate.roleName.roleId, roleId);
    await fill(aclRoleCreate.roleName.description, description);

    await click(aclRoleCreate.roleNameFooter.next);

    const {
      add,
      permission: {kind, scopeType, scope},
    } = aclRoleCreate.addPermissions;

    await radioGroup(kind.locator.nth(0), permission_1[0]);
    await radioGroup(scopeType.locator.nth(0), permission_1[1]);
    await fill(scope.locator.nth(0), permission_1[2]);

    await click(add);
    await radioGroup(kind.locator.nth(1), permission_2[0]);
    await radioGroup(scopeType.locator.nth(1), permission_2[1]);
    await fill(scope.locator.nth(1), permission_2[2]);

    await click(aclRoleCreate.addPermissionsFooter.next);

    await assert.textIs([
      [review.roleId, roleId],
      [review.roleDescription, description],
      [review.permission.kind.locator.nth(0), permission_1[0]],
      [review.permission.scopeType.locator.nth(0), permission_1[1]],
      [review.permission.scope.locator.nth(0), permission_1[2]],
      [review.permission.kind.locator.nth(1), permission_2[0]],
      [review.permission.scopeType.locator.nth(1), permission_2[1]],
      [review.permission.scope.locator.nth(1), permission_2[2]],
    ]);

    await click(aclRoleCreate.reviewFooter.next);
    await isVisible(aclRoleCreate.success);
  });
});
