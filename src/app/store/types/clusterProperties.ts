import { ApiClusterProperty } from "app/backend/types/clusterProperties";

export type ClusterProperty = ApiClusterProperty;
export type ClusterProperties = ClusterProperty[];

export type ClusterPropertiesService = {
  data: ClusterProperties;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};
