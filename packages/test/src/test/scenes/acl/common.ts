import * as t from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";

const {item} = shortcuts.common;

const {acl} = marks.cluster;
const {lists} = acl;

export const clusterName = "test-cluster";
export const permissionsForFirst = [
  "read id abc (id1)",
  "deny xpath //xyz (xpath1)",
  "write id xyz (id2)",
];
export const rolesForUser1 = ["first", "second"];

export const clusterStatus = t.cluster(clusterName, "ok", {
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

export const goToAcl = async (clusterName: string) => {
  await shortcuts.dashboard.goToCluster(clusterName, tabs => tabs.acl);
};

export const roleListItem = (roleId: string) =>
  item(lists.role).byKey(lists.role.id, roleId);

export const openRole = async (roleId: string) => {
  await click(roleListItem(roleId).locator(lists.role.id));
};
