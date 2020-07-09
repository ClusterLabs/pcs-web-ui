import { ApiResponse, clusterProperties } from "app/backend";

export type ClusterPropertiesActions = {
  LoadClusterProperties: {
    type: "CLUSTER_PROPERTIES.LOAD";
    payload: {
      clusterUrlName: string;
    };
  };

  LoadClusterPropertiesSuccess: {
    type: "CLUSTER_PROPERTIES.LOAD.SUCCESS";
    payload: {
      clusterUrlName: string;
      apiClusterPropertis: ApiResponse<typeof clusterProperties>;
    };
  };

  LoadClusterPropertiesFailed: {
    type: "CLUSTER_PROPERTIES.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
    };
  };
};
