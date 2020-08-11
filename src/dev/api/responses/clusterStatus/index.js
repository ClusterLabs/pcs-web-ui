const { node, resource, issues, stonith, cluster } = require("./tools");
const { resourceTree } = require("./resource-tree");
const { resourcesForTest } = require("./resources-for-test");

const clusterOk = clusterName =>
  cluster(clusterName, "ok", {
    resource_list: [resource("R1"), stonith("F1")],
  });

const clusterError = cluster("error", "error", {
  node_list: [
    node(1, { sbd_config: null }),
    node(2, { status: "offline", quorum: false }),
    node(3, { status: "offline", quorum: false }),
  ],
  resource_list: [
    resource("R1", {
      status: "blocked",
      warning_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    resource("R2", { status: "failed" }),
    stonith("F1"),
    stonith("F2", { status: "failed" }),
  ],
  warning_list: issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
  ]),
  error_list: issues(["Unable to connect to the cluster."]),
});

const clusterBig = cluster("big", "error", {
  node_list: [
    node(1),
    node(2, { status: "offline", quorum: false }),
    node(3, { status: "offline", quorum: false }),
    node(4),
    node(5, { status: "offline", quorum: false }),
    node(6),
    node(7, { status: "unknown" }),
    node(8, { status: "offline", quorum: false }),
    node(9, { status: "offline", quorum: false }),
  ],
  resource_list: [
    resource("ip-addr", {
      status: "blocked",
      warning_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    resource("apache", { status: "failed" }),
    resource("pgsql", { status: "failed" }),
    resource("nagios"),
    resource("postfix", { status: "blocked" }),
    stonith("F1"),
    stonith("F2", { status: "failed" }),
  ],
  warning_list: issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
    "Unreal warning 1",
    "Unreal warning 2",
    "Unreal warning 3",
    "Unreal warning 4",
  ]),
  error_list: issues([
    "Unable to connect to the cluster.",
    "Unreal error 1",
    "Unreal error 2",
    "Unreal error 3",
  ]),
});

const empty = cluster("empty", "error", { node_list: [node(1)] });

module.exports = {
  ok: clusterOk("ok"),
  error: clusterError,
  big: clusterBig,
  ok2: clusterOk("ok2"),
  resourceTree,
  resourcesForTest,
  empty,
};
