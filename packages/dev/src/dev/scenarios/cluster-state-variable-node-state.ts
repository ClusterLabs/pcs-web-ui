import * as response from "dev/responses";
import * as t from "dev/responses/clusterStatus/tools";
import * as shortcut from "dev/shortcuts";

shortcut.clusterStatus(
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
);
shortcut.clusterRelated();
