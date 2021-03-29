import { clusterStatusDefault } from "app/store/reducers";

import { Cluster, ClusterStorageItem, Root } from "../types";

export type ClusterSelector<ARGS extends unknown[], SELECTED> = (
  clusterName: string,
  ...args: ARGS
) => (state: Root) => SELECTED;

export function clusterStorageItemSelector<ARGS extends unknown[], SELECTED>(
  selector: (storageItem: ClusterStorageItem, ...args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  return (clusterName, ...args) => state =>
    selector(state.clusterStorage[clusterName], ...args);
}

export function clusterSelector<ARGS extends unknown[], SELECTED>(
  selector: (cluster: Cluster, ...args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  return (clusterName, ...args) => state =>
    selector(
      state.clusterStorage[clusterName]?.clusterStatus?.clusterData
        ?? clusterStatusDefault,
      ...args,
    );
}
