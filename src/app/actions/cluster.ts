import { clusterStatus, ApiResponse } from "app/backend";

export type ClusterActions = {
  FetchClusterDataSuccess: {
    type: "CLUSTER_DATA.FETCH.SUCCESS",
    payload: {
      apiClusterStatus: ApiResponse<typeof clusterStatus>,
    },
  };

  FetchClusterDataFailed: {
    type: "CLUSTER_DATA.FETCH.FAILED",
  };

  RefreshClusterData: {
    type: "CLUSTER_DATA.REFRESH",
  };

  SyncClusterData: {
    type: "CLUSTER_DATA.SYNC",
    payload: {
      clusterUrlName: string,
    },
  };

  SyncClusterDataStop: {
    type: "CLUSTER_DATA.SYNC.STOP",
  };
}
