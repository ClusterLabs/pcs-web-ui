import {api, clusterStatus} from "app/backend";

export type ClusterStatusActions = {
  "CLUSTER.STATUS.FETCH.OK": {
    type: "CLUSTER.STATUS.FETCH.OK";
    key: {clusterName: string};
    payload: api.PayloadOf<typeof clusterStatus>;
  };
  "CLUSTER.STATUS.FETCH.FAIL": {
    type: "CLUSTER.STATUS.FETCH.FAIL";
    key: {clusterName: string};
  };

  "CLUSTER.STATUS.FETCH.FORBIDDEN": {
    type: "CLUSTER.STATUS.FETCH.FORBIDDEN";
    key: {clusterName: string};
  };

  "CLUSTER.STATUS.REFRESH": {
    type: "CLUSTER.STATUS.REFRESH";
    key: {clusterName: string};
  };

  "CLUSTER.STATUS.SYNC": {
    type: "CLUSTER.STATUS.SYNC";
    key: {clusterName: string};
  };

  "CLUSTER.STATUS.SYNC.STOP": {
    type: "CLUSTER.STATUS.SYNC.STOP";
    key: {clusterName: string};
  };
};
