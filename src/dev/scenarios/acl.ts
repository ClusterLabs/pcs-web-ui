import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.dashboard([
  t.cluster("acls", "ok", {
    node_list: [
      t.node("1", { sbd_config: null }),
      t.node("2", { status: "offline", quorum: false }),
      t.node("3", { status: "unknown" }),
    ],
    acls: {
      role: {
        role1: {
          description: "description1",
          permissions: ["permissions1"],
        },
        role2: {
          description: "description2",
          permissions: ["permissions2"],
        },
      },
      group: {
        group1: ["role1"],
        group2: ["role2"],
      },
      user: {
        user1: ["role1"],
        user2: ["role2"],
      },
    },
  }),
  t.cluster("error-offline", "error", {
    node_list: [
      t.node("1", { sbd_config: null }),
      t.node("2", { status: "offline", quorum: false }),
      t.node("3", { status: "unknown" }),
    ],
  }),
]);
