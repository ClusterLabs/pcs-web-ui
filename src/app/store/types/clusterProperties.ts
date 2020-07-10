import { types } from "app/backend";

export type ClusterProperty = types.clusterProperties.ApiClusterProperty;
export type ClusterProperties = ClusterProperty[];

export type ClusterPropertiesService = {
  data: ClusterProperties;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};
