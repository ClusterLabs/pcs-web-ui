import {assert, mock} from "test/tools";

import {clusterStatus, goToAcl} from "./common";
import {goToRole} from "./commonRole";

const {acl} = marks.cluster;

describe("ACL view", () => {
  beforeEach(async () => {
    mock.shortcuts.withCluster({clusterStatus});
  });
  afterEach(mock.stop);

  it("should display 3 lists", async () => {
    await goToAcl();
    await isVisible(acl.lists);

    const first = item.byId(acl.lists.role, "first");
    const second = item.byId(acl.lists.role, "second");
    await assert.textIs([
      [first(r => r.permissionsCount), "3"],
      [first(r => r.usersCount), "1"],
      [first(r => r.groupsCount), "1"],

      [second(r => r.permissionsCount), "0"],
      [second(r => r.usersCount), "1"],
      [second(r => r.groupsCount), "1"],

      [item.byId(acl.lists.user, "user1", u => u.rolesCount), "2"],
      [item.byId(acl.lists.user, "user2", u => u.rolesCount), "0"],
      [item.byId(acl.lists.group, "group1", g => g.rolesCount), "1"],
      [item.byId(acl.lists.group, "group2", g => g.rolesCount), "1"],
    ]);
  });

  it("should display role", async () => {
    await goToRole("first");
    await isVisible(acl.currentRole);
    await assert.textIs(acl.currentRole.id, "first");
  });

  it("should display user", async () => {
    await goToAcl();
    await click(item.byId(acl.lists.user, "user1", u => u.id));
    await isVisible(acl.currentUser);
    await assert.textIs(acl.currentUser.id, "user1");
  });

  it("should display group", async () => {
    await goToAcl();
    await click(item.byId(acl.lists.group, "group1", g => g.id));
    await isVisible(acl.currentGroup);
    await assert.textIs(acl.currentGroup.id, "group1");
  });
});
