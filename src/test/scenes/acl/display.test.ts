import {cluster} from "test/workflow";
import {intercept, shortcuts} from "test/tools";

import {clusterStatus} from "./common";

const rolesForUser1 = ["first", "second"];

const assertAclListDisplayed = async () => {
  expect(await cluster.acl.getRoleList()).toEqual([
    {
      name: "first",
      permissionsCount: "3",
      usersCount: "1",
      groupsCount: "1",
    },
    {
      name: "second",
      permissionsCount: "0",
      usersCount: "1",
      groupsCount: "1",
    },
  ]);
  expect(await cluster.acl.getSubjectList("user")).toEqual([
    {name: "user1", rolesCount: "2"},
    {name: "user2", rolesCount: "0"},
  ]);
  expect(await cluster.acl.getSubjectList("group")).toEqual([
    {name: "group1", rolesCount: "1"},
    {name: "group2", rolesCount: "1"},
  ]);
};

describe("SBD view", () => {
  beforeEach(async () => {
    shortcuts.interceptWithCluster({clusterStatus});
    await cluster.goTo({
      clusterName: clusterStatus.cluster_name,
      tabName: "acl",
    });
  });
  afterEach(intercept.stop);

  it("should display 3 lists", async () => {
    await assertAclListDisplayed();
  });

  it("should display role", async () => {
    await assertAclListDisplayed();
    await page.click(cluster.acl.roleLinkSelector("first"));
    expect(await cluster.acl.roleDetail.getPermissionList()).toEqual(
      clusterStatus.acls?.role?.first.permissions,
    );
  });

  it("should display user", async () => {
    await assertAclListDisplayed();

    await page.click(cluster.acl.subjectLinkSelector("user", "user1"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual(
      rolesForUser1,
    );

    await page.click(cluster.acl.subjectLinkSelector("user", "user2"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual([]);
  });

  it("should display group", async () => {
    await assertAclListDisplayed();

    await page.click(cluster.acl.subjectLinkSelector("user", "user1"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual(
      rolesForUser1,
    );

    await page.click(cluster.acl.subjectLinkSelector("user", "user2"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual([]);
  });
});
