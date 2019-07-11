const deepmerge = require("deepmerge");

const overwriteMerge = (destArr, srcArr/* , opts */) => srcArr;

const node = (id, diff) => deepmerge({
  id,
  name: `node-${id}`,
  status: "online",
  quorum: true,
  warning_list: [],
  error_list: [],
}, diff || {});

const resource = (id, diff) => deepmerge({
  id,
  status: "running",
  stonith: false,
  warning_list: [],
  error_list: [],
}, diff || {});

const issues = list => list.map(message => ({ message }));

const stonith = (id, diff) => resource(id, { ...diff, stonith: true });

const cluster = (name, status, diff) => deepmerge(
  {
    cluster_name: name,
    status,
    node_list: [node(1), node(2)],
    warning_list: [],
    error_list: [],
    resource_list: [],
  },
  diff || {},
  { arrayMerge: overwriteMerge },
);

const clusterOk = clusterName => cluster(clusterName, "ok", {
  resource_list: [
    resource("R1"),
    stonith("F1"),
  ],
});

const clusterError = cluster("cluster-2", "error", {
  node_list: [
    node(1),
    node(2, { status: "unknown", quorum: false }),
    node(3, { status: "unknown", quorum: "unknown" })
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
  error_list: issues([
    "Unable to connect to the cluster.",
  ]),
});

const clusterBig = cluster("cluster-3", "error", {
  node_list: [
    node(1),
    node(2, { status: "unknown", quorum: "unknown" }),
    node(3, { status: "unknown", quorum: "unknown" }),
    node(4),
    node(5, { status: "offline", quorum: false }),
    node(6),
    node(7),
    node(8, { status: "offline", quorum: false }),
    node(9, { status: "offline", quorum: "unknown" }),
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

module.exports = {
  ok: clusterOk("cluster-1"),
  error: clusterError,
  big: clusterBig,
  ok2: clusterOk("cluster-4"),
};
