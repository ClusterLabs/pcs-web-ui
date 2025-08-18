import * as t from "dev/responses/clusterStatus/tools";

export const clusterName = "test-cluster";
export const permissionXpath1Id = "xpath1";
export const permissionXpath1Label = `deny xpath //xyz (${permissionXpath1Id})`;
export const permissionsForFirst = [
  "read id abc (id1)",
  permissionXpath1Label,
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

export const goToAcl = async () => {
  await goToCluster(clusterStatus.cluster_name, tabs => tabs.acl);
};
