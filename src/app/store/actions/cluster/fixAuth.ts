export type ClusterFixAuthActions = {
  "CLUSTER.FIX_AUTH.START": {
    type: "CLUSTER.FIX_AUTH.START";
    payload: {
      clusterUrlName: string;
      initialNodeList: string[];
    };
  };

  "CLUSTER.FIX_AUTH.AUTH_STARTED": {
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED";
    payload: {
      clusterUrlName: string;
      authProcessId: number;
    };
  };

  "CLUSTER.FIX_AUTH.CANCEL": {
    type: "CLUSTER.FIX_AUTH.CANCEL";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.FIX_AUTH.AUTH_DONE": {
    type: "CLUSTER.FIX_AUTH.AUTH_DONE";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.FIX_AUTH.OK": {
    type: "CLUSTER.FIX_AUTH.OK";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.FIX_AUTH.FAIL": {
    type: "CLUSTER.FIX_AUTH.FAIL";
    payload: {
      clusterUrlName: string;
      message: string;
    };
  };

  "CLUSTER.FIX_AUTH.ERROR": {
    type: "CLUSTER.FIX_AUTH.ERROR";
    payload: {
      clusterUrlName: string;
      message: string;
    };
  };
};
