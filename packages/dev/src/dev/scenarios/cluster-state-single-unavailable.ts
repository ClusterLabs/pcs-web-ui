import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
  t.cluster("unavailable", "ok", {
    node_list: [t.node("1", {status: "unknown"})],
  }),
);
shortcut.clusterRelated();
