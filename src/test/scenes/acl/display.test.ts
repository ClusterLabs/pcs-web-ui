import * as t from "dev/responses/clusterStatus/tools";

import {cluster} from "test/workflow";
import {intercept, location, shortcuts} from "test/tools";

const clusterName = "test-cluster";
const permissionsForFirst = [
  "read id abc (id1)",
  "deny xpath //xyz (xpath1)",
  "write id xyz (id2)",
];
const rolesForUser1 = ["first", "second"];

const clusterStatus = t.cluster(clusterName, "ok", {
  acls: {
    role: {
      first: {
        description: "description of first role",
        permissions: permissionsForFirst,
      },
      second: {
        description: "description of second role",
        permissions: [],
      },
    },
    group: {
      group1: ["first"],
      group2: ["second"],
    },
    user: {
      user1: rolesForUser1,
      user2: [],
    },
  },
});

const gotToAclTab = async () => {
  await page.goto(location.cluster({clusterName}));
  await cluster.selectTab("acl");
};

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
  afterEach(intercept.stop);

  it("should display 3 lists", async () => {
    shortcuts.interceptWithCluster({clusterStatus});

    await gotToAclTab();

    await assertAclListDisplayed();
  });

  it("should display role", async () => {
    shortcuts.interceptWithCluster({clusterStatus});

    await gotToAclTab();

    await assertAclListDisplayed();
    await page.click(cluster.acl.roleLinkSelector("first"));
    expect(await cluster.acl.roleDetail.getPermissionList()).toEqual(
      permissionsForFirst,
    );
  });

  it("should display user", async () => {
    shortcuts.interceptWithCluster({clusterStatus});

    await gotToAclTab();

    await assertAclListDisplayed();

    await page.click(cluster.acl.subjectLinkSelector("user", "user1"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual(
      rolesForUser1,
    );

    await page.click(cluster.acl.subjectLinkSelector("user", "user2"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual([]);
  });

  it("should display group", async () => {
    shortcuts.interceptWithCluster({clusterStatus});

    await gotToAclTab();

    await assertAclListDisplayed();

    await page.click(cluster.acl.subjectLinkSelector("user", "user1"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual(
      rolesForUser1,
    );

    await page.click(cluster.acl.subjectLinkSelector("user", "user2"));
    expect(await cluster.acl.subjectDetail.getRoleList()).toEqual([]);
  });
});
