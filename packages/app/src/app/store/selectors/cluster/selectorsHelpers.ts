import {CLUSTER_KEY} from "app/store/clusterStorageKey";

import type {ClusterStorageItem, Root} from "../types";

export type ClusterSelector<ARGS extends unknown[], SELECTED> = (
  _clusterName: string,
  ..._args: ARGS
) => (_state: Root) => SELECTED;

export function clusterStorageItemSelector<ARGS extends unknown[], SELECTED>(
  selector: (_storageItem: ClusterStorageItem, ..._args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  // Single-cluster model: the clusterName argument is kept for signature
  // compatibility but ignored; storage is always read under CLUSTER_KEY.
  return (_clusterName, ...args) =>
    state =>
      selector(state.clusterStorage[CLUSTER_KEY], ...args);
}
