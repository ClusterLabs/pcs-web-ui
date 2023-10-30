export type ClusterStopActions = {
  "CLUSTER.STOP": {
    type: "CLUSTER.STOP";
    payload: {
      clusterName: string;
      force: boolean;
    };
  };
  "CLUSTER.STOP.INIT": {
    type: "CLUSTER.STOP.INIT";
    payload: {
      clusterName: string;
    };
  };

  "CLUSTER.STOP.OK": {
    type: "CLUSTER.STOP.OK";
  };

  "CLUSTER.STOP.FAIL": {
    type: "CLUSTER.STOP.FAIL";
    payload: {
      message: string;
      isForceable: boolean;
    };
  };

  "CLUSTER.STOP.CLOSE": {
    type: "CLUSTER.STOP.CLOSE";
  };
};
