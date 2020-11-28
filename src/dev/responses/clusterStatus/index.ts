import * as t from "./tools";
import { resourceTree } from "./resource-tree";
import { resourcesForTest } from "./resources-for-test";
import { actions, actionsAlternative } from "./actions";
import { noAuthNodes } from "./noAuthNodes";

const clusterOk = (clusterName: string) =>
  t.cluster(clusterName, "ok", {
    resource_list: [t.primitive("R1"), t.stonith("F1")],
  });

export {
  resourceTree,
  resourcesForTest,
  actions,
  actionsAlternative,
  noAuthNodes,
};

export const ok = clusterOk("ok");
export const ok2 = clusterOk("ok2");

export const empty = t.cluster("empty", "error", { node_list: [t.node("1")] });
export const error = t.cluster("error", "error", {
  node_list: [
    t.node("1", { sbd_config: null }),
    t.node("2", { status: "offline", quorum: false }),
    t.node("3", { status: "offline", quorum: false }),
  ],
  resource_list: [
    t.primitive("R1", {
      status: "blocked",
      warning_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    t.primitive("R2", { status: "failed" }),
    t.stonith("F1"),
    t.stonith("F2", { status: "failed" }),
  ],
  warning_list: t.issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
  ]),
  error_list: t.issues(["Unable to connect to the cluster."]),
});

export const big = t.cluster("big", "error", {
  node_list: [
    t.node("1"),
    t.node("2", { status: "offline", quorum: false }),
    t.node("3", { status: "offline", quorum: false }),
    t.node("4"),
    t.node("5", { status: "offline", quorum: false }),
    t.node("6"),
    t.node("7", { status: "unknown" }),
    t.node("8", { status: "offline", quorum: false }),
    t.node("9", { status: "offline", quorum: false }),
  ],
  resource_list: [
    t.primitive("ip-addr", {
      status: "blocked",
      warning_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    t.primitive("apache", { status: "failed" }),
    t.primitive("pgsql", { status: "failed" }),
    t.primitive("nagios"),
    t.primitive("postfix", { status: "blocked" }),
    t.stonith("F1"),
    t.stonith("F2", { status: "failed" }),
  ],
  warning_list: t.issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
    "Unreal warning 1",
    "Unreal warning 2",
    "Unreal warning 3",
    "Unreal warning 4",
  ]),
  error_list: t.issues([
    "Unable to connect to the cluster.",
    "Unreal error 1",
    "Unreal error 2",
    "Unreal error 3",
  ]),
});
