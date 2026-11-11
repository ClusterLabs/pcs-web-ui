import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
  t.cluster("single-offline", "ok", {
    node_list: [t.node("1", {status: "offline"})],
  }),
);
shortcut.clusterRelated();
