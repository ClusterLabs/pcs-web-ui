import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToAcl} from "./common";

const {radioGroup} = shortcuts.patternfly;

const {createAclRole} = app;
const {review} = createAclRole;

type Permission = Parameters<
  typeof route.aclRoleCreate
>[0]["permissionInfoList"][number];

const roleId = "third";
const description = "Third description";
const permission_1: Permission = ["read", "id", "some-id"];
const permission_2: Permission = ["write", "xpath", "some-xpath"];

const openTask = async () => {
  await click(app.clusterDetail.aclToolbar.createRole);
  await isVisible(createAclRole);
};

const reviewPermission = (
  nth: number,
  getMark: (permission: typeof review.permission) => Mark,
) => shortcuts.common.item(review.permission).byIndex(nth).locator(getMark);

describe("Create acl role task", () => {
  it("should successfully create new role", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclRoleCreate({
          clusterName: clusterStatus.cluster_name,
          roleId,
          description,
          permissionInfoList: [permission_1, permission_2],
        }),
      ],
    });
    await goToAcl(clusterStatus.cluster_name);
    await openTask();
    await fill(createAclRole.roleName.roleId, roleId);
    await fill(createAclRole.roleName.description, description);

    await click(createAclRole.roleNameFooter.next);

    const {
      add,
      permission: {kind, scopeType, scope},
    } = createAclRole.addPermissions;

    await radioGroup(kind.locator.nth(0), permission_1[0]);
    await radioGroup(scopeType.locator.nth(0), permission_1[1]);
    await fill(scope.locator.nth(0), permission_1[2]);

    await click(add);
    await radioGroup(kind.locator.nth(1), permission_2[0]);
    await radioGroup(scopeType.locator.nth(1), permission_2[1]);
    await fill(scope.locator.nth(1), permission_2[2]);

    await click(createAclRole.addPermissionsFooter.next);

    await shortcuts.task.expectReview([
      [review.roleId, roleId],
      [review.roleDescription, description],
      [reviewPermission(0, ({kind}) => kind), permission_1[0]],
      [reviewPermission(0, ({scopeType}) => scopeType), permission_1[1]],
      [reviewPermission(0, ({scope}) => scope), permission_1[2]],
      [reviewPermission(1, ({kind}) => kind), permission_2[0]],
      [reviewPermission(1, ({scopeType}) => scopeType), permission_2[1]],
      [reviewPermission(1, ({scope}) => scope), permission_2[2]],
    ]);

    await click(createAclRole.reviewFooter.next);
    await isVisible(createAclRole.success);
  });
});
