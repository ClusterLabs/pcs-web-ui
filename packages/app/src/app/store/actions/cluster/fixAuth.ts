export type ClusterFixAuthActions = {
  "CLUSTER.FIX_AUTH.START": {
    type: "CLUSTER.FIX_AUTH.START";
    payload: {
      clusterName: string;
      initialNodeList: string[];
    };
  };

  "CLUSTER.FIX_AUTH.AUTH_STARTED": {
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED";
    payload: {
      authProcessId: number;
      clusterName: string;
    };
  };

  "CLUSTER.FIX_AUTH.CANCEL": {
    type: "CLUSTER.FIX_AUTH.CANCEL";
  };

  "CLUSTER.FIX_AUTH.AUTH_DONE": {
    type: "CLUSTER.FIX_AUTH.AUTH_DONE";
  };

  "CLUSTER.FIX_AUTH.OK": {
    type: "CLUSTER.FIX_AUTH.OK";
  };

  "CLUSTER.FIX_AUTH.FAIL": {
    type: "CLUSTER.FIX_AUTH.FAIL";
    payload: {
      message: string;
    };
  };

  "CLUSTER.FIX_AUTH.ERROR": {
    type: "CLUSTER.FIX_AUTH.ERROR";
    payload: {
      message: string;
    };
  };
};
