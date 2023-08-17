import {assert, mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToAcl} from "./common";
import {openRole, roleListItem} from "./commonRole";

const {item} = shortcuts.common;

const {acl} = marks.cluster;
const {lists} = acl;

const roleListValue = (roleId: string) => (mark: Mark) =>
  roleListItem(roleId).locator(locatorFor(mark));

const userListValue = (userId: string) => (mark: Mark) =>
  item(lists.user).byKey(lists.user.id, userId).locator(locatorFor(mark));

const groupListValue = (groupId: string) => (mark: Mark) =>
  item(lists.group).byKey(lists.group.id, groupId).locator(locatorFor(mark));

describe("ACL view", () => {
  beforeEach(async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToAcl();
  });
  afterEach(mock.stop);

  it("should display 3 lists", async () => {
    await isVisible(lists);

    const role_1 = roleListValue("first");
    await assert.textIs(role_1(lists.role.permissionsCount), "3");
    await assert.textIs(role_1(lists.role.usersCount), "1");
    await assert.textIs(role_1(lists.role.groupsCount), "1");

    const role_2 = roleListValue("second");
    await assert.textIs(role_2(lists.role.permissionsCount), "0");
    await assert.textIs(role_2(lists.role.usersCount), "1");
    await assert.textIs(role_2(lists.role.groupsCount), "1");

    await assert.textIs(userListValue("user1")(lists.user.rolesCount), "2");
    await assert.textIs(userListValue("user2")(lists.user.rolesCount), "0");

    await assert.textIs(groupListValue("group1")(lists.group.rolesCount), "1");
    await assert.textIs(groupListValue("group2")(lists.group.rolesCount), "1");
  });

  it("should display role", async () => {
    await openRole("first");
    await isVisible(acl.currentRole);
    await assert.textIs(acl.currentRole.id, "first");
  });

  it("should display user", async () => {
    await click(userListValue("user1")(lists.user.id));
    await isVisible(acl.currentUser);
    await assert.textIs(acl.currentUser.id, "user1");
  });

  it("should display group", async () => {
    await click(groupListValue("group1")(lists.group.id));
    await isVisible(acl.currentGroup);
    await assert.textIs(acl.currentGroup.id, "group1");
  });
});
