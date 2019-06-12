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

const clusterOk = cluster("cluster-1", "ok", {
  resource_list: [resource("R1"), stonith("F1")],
});

const clusterError = cluster("cluster-2", "error", {
  node_list: [node(1), node(2), node(3, { status: "offline", quorum: false })],
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
    resource("R2", { status: "blocked" }),
  ],
  warning_list: issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
  ]),
  error_list: issues([
    "Unable to connect to the cluster.",
  ]),
});

module.exports = {
  ok: clusterOk,
  error: clusterError,
};
