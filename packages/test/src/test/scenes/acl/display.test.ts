import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, openRole, roleListItem} from "./common";

const {goToCluster} = shortcuts.dashboard;
const {item} = shortcuts.common;
const {textIs} = shortcuts.expect;

const {acl} = app.clusterDetail;
const {lists} = acl;

const roleListValue = (roleId: string) => (mark: Mark) =>
  roleListItem(roleId).locator(locatorFor(mark));

const userListValue = (userId: string) => (mark: Mark) =>
  item(lists.user).byKey(lists.user.id, userId).locator(locatorFor(mark));

const groupListValue = (groupId: string) => (mark: Mark) =>
  item(lists.group).byKey(lists.group.id, groupId).locator(locatorFor(mark));

describe("ACL view", () => {
  beforeEach(async () => {
    intercept.shortcuts.interceptWithCluster({clusterStatus});
    await goToCluster(clusterStatus.cluster_name, tabs => tabs.acl);
  });
  afterEach(intercept.stop);

  it("should display 3 lists", async () => {
    await isVisible(lists);

    const role_1 = roleListValue("first");
    await textIs(role_1(lists.role.permissionsCount), "3");
    await textIs(role_1(lists.role.usersCount), "1");
    await textIs(role_1(lists.role.groupsCount), "1");

    const role_2 = roleListValue("second");
    await textIs(role_2(lists.role.permissionsCount), "0");
    await textIs(role_2(lists.role.usersCount), "1");
    await textIs(role_2(lists.role.groupsCount), "1");

    await textIs(userListValue("user1")(lists.user.rolesCount), "2");
    await textIs(userListValue("user2")(lists.user.rolesCount), "0");

    await textIs(groupListValue("group1")(lists.group.rolesCount), "1");
    await textIs(groupListValue("group2")(lists.group.rolesCount), "1");
  });

  it("should display role", async () => {
    await openRole("first");
    await isVisible(acl.currentRole);
    await textIs(acl.currentRole.id, "first");
  });

  it("should display user", async () => {
    await click(userListValue("user1")(lists.user.id));
    await isVisible(acl.currentUser);
    await textIs(acl.currentUser.id, "user1");
  });

  it("should display group", async () => {
    await click(groupListValue("group1")(lists.group.id));
    await isVisible(acl.currentGroup);
    await textIs(acl.currentGroup.id, "group1");
  });
});
