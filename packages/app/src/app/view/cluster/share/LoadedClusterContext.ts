import React from "react";
import type {getClusterStoreInfo} from "app/store/selectors";

type ClusterInfo = ReturnType<typeof getClusterStoreInfo>;

const ClusterSourcesContext = React.createContext<
  | {
      loadedCluster: NonNullable<ClusterInfo["clusterStatus"]["data"]>;
      pcmkAgents: NonNullable<ClusterInfo["pcmkAgents"]>;
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
