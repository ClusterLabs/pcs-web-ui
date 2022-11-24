import React from "react";

import {Cluster} from "app/view/cluster/types";

const LoadedClusterContext = React.createContext<Cluster | undefined>(
  undefined,
);

export const LoadedClusterProvider = LoadedClusterContext.Provider;

export function useLoadedCluster(): [Cluster, Cluster];
export function useLoadedCluster<T>(
  _selector: (_cluster: Cluster) => T,
): [T, Cluster];
export function useLoadedCluster<T>(selector?: (_cluster: Cluster) => T) {
  const cluster = React.useContext(LoadedClusterContext);
  if (cluster === undefined) {
    throw new Error("useLoadedCluster must be within LoadedClusterProvider");
  }
  if (selector) {
    return [selector(cluster), cluster];
  }
  return [cluster, cluster];
}
