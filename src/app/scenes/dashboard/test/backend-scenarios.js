const deepmerge = require("deepmerge");

const GET = "get";
const overwriteMerge = (destArr, srcArr/* , opts */) => srcArr;

const node = (id, diff) => deepmerge({
  id,
  name: `node-${id}`,
  status: "online",
}, diff || {});

const resource = (id, diff) => deepmerge({
  id,
  status: "running",
  stonit: false,
}, diff || {});

const stonith = (id, diff) => resource(id, { ...diff, stonith: true });

const cluster = (name, status, diff) => deepmerge(
  {
    cluster_name: name,
    status,
    node_list: [node(1), node(2)],
    warning_list: [],
    resource_list: [],
  },
  diff || {},
  { arrayMerge: overwriteMerge },
);

const clusterOk = cluster("cluster-1", "ok", {
  resource_list: [resource("R1"), stonith("F1")],
});

const clusterWarn = cluster("cluster-2", "warning", {
  node_list: [node(1), node(2), node(3, { status: "offline" })],
  resource_list: [resource("R1", { status: "blocked" })],
  warning_list: [
    { message: "No fencing configured in the cluster" },
    { message: "Not authorized against node(s) node-1, node-3" },
  ],
});

const clustersOverview = response => ({
  url: "/clusters_overview",
  method: GET,
  handler: (_, res) => { res.json(response); },
});

const clusterStatus = response => ({
  url: `/managec/${response.cluster_name}/cluster_status`,
  method: GET,
  handler: (_, res) => {
    res.json(response);
  },
});

module.exports = {
  displayMulti: [
    clustersOverview({ cluster_list: [clusterOk, clusterWarn] }),
  ],
  goToCluster: [
    clustersOverview({ cluster_list: [clusterOk] }),
    clusterStatus(clusterOk),
  ],
};
