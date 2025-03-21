import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";
import * as t from "dev/responses/clusterStatus/tools";

shortcut.dashboard([
  response.clusterStatus.ok,
  response.clusterStatus.error,
  response.clusterStatus.big,
  response.clusterStatus.ok2,
  response.clusterStatus.empty,
  response.clusterStatus.resourceTree,
  t.cluster("variable-node-state", "ok", {
    node_list: [
      t.node("1", {status: "online"}),
      t.node("2", {status: "standby"}),
      t.node("3", {status: "offline"}),
      t.node("4", {status: "unknown"}),
      t.node("5", {status: "offline"}),
      t.node("6", {status: "online", quorum: false}),
    ],
    resource_list: response.clusterStatusResources.resourceTree,
  }),
  t.cluster("single-standby", "ok", {
    node_list: [t.node("1", {status: "standby"})],
  }),
  t.cluster("single-offline", "ok", {
    node_list: [t.node("1", {status: "offline"})],
  }),
  t.cluster("unavailable", "ok", {
    node_list: [t.node("1", {status: "unknown"})],
  }),
  t.cluster("simulated-resource-error", "ok", {
    resource_list: [
      t.primitive("A", {
        warning_list: [
          {
            message:
              "Failed to asyncmon C on Thu Sep 21 11:50:57 2023 on node r91-1.vm: Simulated failure",
          },
        ],
      }),
    ],
  }),
]);
