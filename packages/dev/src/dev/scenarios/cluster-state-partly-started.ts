import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
  t.cluster("partly-started", "ok", {
    node_list: [t.node("1", {status: "offline"}), t.node("2")],
  }),
);
shortcut.clusterRelated();
