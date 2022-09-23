import { app } from "dev/app";
import * as t from "dev/responses/clusterStatus/tools";
import * as response from "dev/responses";
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
          permissions: ["permissions1", "permissions2"],
        },
        empty: {
          description: "",
          permissions: [],
        },
      },
      group: {
        group1: ["role1"],
        group2: ["role1"],
        empty: [],
      },
      user: {
        user1: ["role1"],
        user2: ["role1"],
        empty: [],
      },
    },
  }),
  response.clusterStatus.ok,
]);

app.libCluster("acl-create-role", (req, res) => {
  shortcut.libStd({
    code: req.body.role_id,
    res,
  });
});
