import React from "react";

import {Cluster} from "app/view/cluster/types";

const LoadedClusterContext = React.createContext<Cluster | undefined>(
  undefined,
);

export const LoadedClusterProvider = LoadedClusterContext.Provider;

export const useLoadedCluster = () => {
  const cluster = React.useContext(LoadedClusterContext);
  if (cluster === undefined) {
    throw new Error("useLoadedCluster must be within LoadedClusterProvider");
  }
  return cluster;
};
