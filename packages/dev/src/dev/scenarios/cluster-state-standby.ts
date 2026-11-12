import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
  t.cluster("standby", "ok", {
    node_list: [
      t.node("1", {status: "standby"}),
      t.node("2", {status: "standby"}),
    ],
  }),
);
shortcut.clusterRelated();
