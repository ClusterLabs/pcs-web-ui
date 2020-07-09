import { ApiClusterProperties } from "app/backend/types/clusterProperties";

export type ClusterProperties = ApiClusterProperties;

export type ClusterPropertiesService = {
  data: ClusterProperties;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};
