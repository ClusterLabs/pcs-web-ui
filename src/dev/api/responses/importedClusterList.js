module.exports = {
  withClusters: clusterList => ({
    cluster_list: clusterList.map(clusterName => ({ name: clusterName })),
  }),
  empty: { cluster_list: [] },
};
