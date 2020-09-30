import { api, clusterStatus } from "app/backend";

export type ClusterActions = {
  FetchClusterDataSuccess: {
    type: "CLUSTER_DATA.FETCH.SUCCESS";
    payload: {
      apiClusterStatus: api.PayloadOf<typeof clusterStatus>;
      clusterUrlName: string;
    };
  };

  RefreshClusterData: {
    type: "CLUSTER_DATA.REFRESH";
    payload: {
      clusterUrlName: string;
    };
  };

  SyncClusterData: {
    type: "CLUSTER_DATA.SYNC";
    payload: {
      clusterUrlName: string;
    };
  };

  SyncClusterDataStop: {
    type: "CLUSTER_DATA.SYNC.STOP";
    payload: {
      clusterUrlName: string;
    };
  };
};
