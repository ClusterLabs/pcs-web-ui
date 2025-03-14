import type * as types from "dev/types";

export const withClusters = (
  clusterList: string[],
): types.ImportedClusterList => ({
  cluster_list: clusterList.map(clusterName => ({name: clusterName})),
});
export const empty = {cluster_list: []};
