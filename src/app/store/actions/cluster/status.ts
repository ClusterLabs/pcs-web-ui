import { api, clusterStatus } from "app/backend";

export type ClusterStatusActions = {
  "CLUSTER.STATUS.FETCH.OK": {
    type: "CLUSTER.STATUS.FETCH.OK";
    payload: {
      apiClusterStatus: api.PayloadOf<typeof clusterStatus>;
      clusterUrlName: string;
    };
  };

  "CLUSTER.STATUS.REFRESH": {
    type: "CLUSTER.STATUS.REFRESH";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.STATUS.SYNC": {
    type: "CLUSTER.STATUS.SYNC";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.STATUS.SYNC.STOP": {
    type: "CLUSTER.STATUS.SYNC.STOP";
    payload: {
      clusterUrlName: string;
    };
  };
};
