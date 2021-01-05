import { api, clusterStatus } from "app/backend";

export type ClusterStatusActions = {
  "CLUSTER.STATUS.FETCH.OK": {
    type: "CLUSTER.STATUS.FETCH.OK";
    id: { cluster: string };
    payload: {
      apiClusterStatus: api.PayloadOf<typeof clusterStatus>;
    };
  };

  "CLUSTER.STATUS.REFRESH": {
    type: "CLUSTER.STATUS.REFRESH";
    id: { cluster: string };
  };

  "CLUSTER.STATUS.SYNC": {
    type: "CLUSTER.STATUS.SYNC";
    id: { cluster: string };
  };

  "CLUSTER.STATUS.SYNC.STOP": {
    type: "CLUSTER.STATUS.SYNC.STOP";
    id: { cluster: string };
  };
};
