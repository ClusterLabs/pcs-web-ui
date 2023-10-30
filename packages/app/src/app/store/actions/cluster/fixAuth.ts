export type ClusterFixAuthActions = {
  "CLUSTER.FIX_AUTH.START": {
    type: "CLUSTER.FIX_AUTH.START";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      initialNodeList: string[];
    };
  };

  "CLUSTER.FIX_AUTH.AUTH_STARTED": {
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED";
    key: {clusterName: string};
    payload: {
      authProcessId: number;
    };
  };

  "CLUSTER.FIX_AUTH.CANCEL": {
    type: "CLUSTER.FIX_AUTH.CANCEL";
    key: {clusterName: string};
  };

  "CLUSTER.FIX_AUTH.AUTH_DONE": {
    type: "CLUSTER.FIX_AUTH.AUTH_DONE";
    key: {clusterName: string};
  };

  "CLUSTER.FIX_AUTH.OK": {
    type: "CLUSTER.FIX_AUTH.OK";
    key: {clusterName: string};
  };

  "CLUSTER.FIX_AUTH.FAIL": {
    type: "CLUSTER.FIX_AUTH.FAIL";
    key: {clusterName: string};
    payload: {
      message: string;
    };
  };

  "CLUSTER.FIX_AUTH.ERROR": {
    type: "CLUSTER.FIX_AUTH.ERROR";
    key: {clusterName: string};
    payload: {
      message: string;
    };
  };
};
