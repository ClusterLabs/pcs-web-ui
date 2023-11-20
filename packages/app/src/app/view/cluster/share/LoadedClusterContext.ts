import React from "react";

import {useClusterInfo} from "app/view/cluster/share";

type ClusterInfo = ReturnType<typeof useClusterInfo>;

const ClusterSourcesContext = React.createContext<
  | {
      loadedCluster: NonNullable<ClusterInfo["clusterStatus"]["data"]>;
      pcmkAgents: NonNullable<ClusterInfo["pcmkAgents"]>;
      uiState: NonNullable<ClusterInfo["uiState"]>;
    }
  | undefined
>(undefined);

export const ClusterSourcesProvider = ClusterSourcesContext.Provider;

export const useClusterSources = () => {
  const sources = React.useContext(ClusterSourcesContext);
  if (sources === undefined) {
    throw new Error("useClusterSources must be within ClusterSourcesProvider");
  }
  return sources;
};

export const useLoadedCluster = () => {
  return useClusterSources().loadedCluster;
};
