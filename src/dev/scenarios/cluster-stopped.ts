import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.dashboard([
  t.cluster("started"),
  t.cluster("partly-started", "ok", {
    node_list: [t.node("1", {status: "offline"}), t.node("2")],
  }),
  t.cluster("standby", "ok", {
    node_list: [
      t.node("1", {status: "standby"}),
      t.node("2", {status: "standby"}),
    ],
  }),
  t.cluster("partly-standby", "ok", {
    node_list: [
      t.node("1", {status: "standby"}),
      t.node("2", {status: "offline"}),
    ],
  }),
  t.cluster("stopped", "ok", {
    node_list: [
      t.node("1", {status: "offline"}),
      t.node("2", {status: "offline"}),
    ],
  }),
  t.cluster("stopped-with-death-node", "ok", {
    node_list: [
      t.node("1", {status: "offline"}),
      t.node("2", {status: "unknown"}),
    ],
  }),
  t.cluster("unavailable", "ok", {
    node_list: [
      t.node("1", {status: "unknown"}),
      t.node("2", {status: "unknown"}),
    ],
  }),
]);
