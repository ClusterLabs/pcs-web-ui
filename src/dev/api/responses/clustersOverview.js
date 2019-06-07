module.exports = {
  withClusters: clusterStatusList => ({ cluster_list: clusterStatusList }),
  empty: { cluster_list: [] },
};
