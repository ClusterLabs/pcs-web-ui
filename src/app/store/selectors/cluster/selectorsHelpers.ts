import {clusterStatusDefault} from "app/store/reducers";

import {Cluster, ClusterStorageItem, Root} from "../types";

export type ClusterSelector<ARGS extends unknown[], SELECTED> = (
  _clusterName: string,
  ..._args: ARGS
) => (_state: Root) => SELECTED;

export function clusterStorageItemSelector<ARGS extends unknown[], SELECTED>(
  selector: (_storageItem: ClusterStorageItem, ..._args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  return (clusterName, ...args) =>
    state =>
      selector(state.clusterStorage[clusterName], ...args);
}

export function clusterSelector<ARGS extends unknown[], SELECTED>(
  selector: (_cluster: Cluster, ..._args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  return (clusterName, ...args) =>
    state =>
      selector(
        state.clusterStorage[clusterName]?.clusterStatus?.clusterData
          ?? clusterStatusDefault,
        ...args,
      );
}
