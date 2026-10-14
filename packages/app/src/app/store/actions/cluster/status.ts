import type {api, clusterStatus} from "app/backend";

export type ClusterStatusActions = {
  "CLUSTER.STATUS.FETCH.OK": {
    type: "CLUSTER.STATUS.FETCH.OK";
    payload: api.PayloadOf<typeof clusterStatus>;
  };
  "CLUSTER.STATUS.FETCH.FAIL": {
    type: "CLUSTER.STATUS.FETCH.FAIL";
  };

  "CLUSTER.STATUS.BACKEND_NOT_FOUND": {
    type: "CLUSTER.STATUS.BACKEND_NOT_FOUND";
  };

  "CLUSTER.STATUS.FETCH.FORBIDDEN": {
    type: "CLUSTER.STATUS.FETCH.FORBIDDEN";
  };

  "CLUSTER.STATUS.REFRESH": {
    type: "CLUSTER.STATUS.REFRESH";
  };

  "CLUSTER.STATUS.SYNC": {
    type: "CLUSTER.STATUS.SYNC";
  };

  "CLUSTER.STATUS.SYNC.STOP": {
    type: "CLUSTER.STATUS.SYNC.STOP";
  };
};
