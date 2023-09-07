import * as t from "dev/responses/clusterStatus/tools";

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
