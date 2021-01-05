export type ClusterFixAuthActions = {
  "CLUSTER.FIX_AUTH.START": {
    type: "CLUSTER.FIX_AUTH.START";
    id: { cluster: string };
    payload: {
      initialNodeList: string[];
    };
  };

  "CLUSTER.FIX_AUTH.AUTH_STARTED": {
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED";
    id: { cluster: string };
    payload: {
      authProcessId: number;
    };
  };

  "CLUSTER.FIX_AUTH.CANCEL": {
    type: "CLUSTER.FIX_AUTH.CANCEL";
    id: { cluster: string };
  };

  "CLUSTER.FIX_AUTH.AUTH_DONE": {
    type: "CLUSTER.FIX_AUTH.AUTH_DONE";
    id: { cluster: string };
  };

  "CLUSTER.FIX_AUTH.OK": {
    type: "CLUSTER.FIX_AUTH.OK";
    id: { cluster: string };
  };

  "CLUSTER.FIX_AUTH.FAIL": {
    type: "CLUSTER.FIX_AUTH.FAIL";
    id: { cluster: string };
    payload: {
      message: string;
    };
  };

  "CLUSTER.FIX_AUTH.ERROR": {
    type: "CLUSTER.FIX_AUTH.ERROR";
    id: { cluster: string };
    payload: {
      message: string;
    };
  };
};
