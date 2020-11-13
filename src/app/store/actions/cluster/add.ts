export type ClusterAddActions = {
  "CLUSTER.ADD": {
    type: "CLUSTER.ADD";
    payload: {
      nodeName: string;
    };
  };

  "CLUSTER.ADD.OK": {
    type: "CLUSTER.ADD.OK";
    payload: {
      warningMessages: string[];
    };
  };

  "CLUSTER.ADD.ERROR": {
    type: "CLUSTER.ADD.ERROR";
    payload: {
      message: string;
    };
  };

  "CLUSTER.ADD.AUTH_NODE": {
    type: "CLUSTER.ADD.AUTH_NODE";
    payload: {
      nodeName: string;
      password: string;
      address: string;
      // TODO make it number
      port: string;
    };
  };

  "CLUSTER.ADD.AUTH_NODE.OK": {
    type: "CLUSTER.ADD.AUTH_NODE.OK";
  };

  "CLUSTER.ADD.AUTH_NODE.ERROR": {
    type: "CLUSTER.ADD.AUTH_NODE.ERROR";
    payload: {
      message: string;
    };
  };

  "CLUSTER.ADD.CHECK_AUTH": {
    type: "CLUSTER.ADD.CHECK_AUTH";
    payload: {
      nodeName: string;
    };
  };

  "CLUSTER.ADD.CHECK_AUTH.OK": {
    type: "CLUSTER.ADD.CHECK_AUTH.OK";
  };

  "CLUSTER.ADD.CHECK_AUTH.NO_AUTH": {
    type: "CLUSTER.ADD.CHECK_AUTH.NO_AUTH";
  };

  "CLUSTER.ADD.CHECK_AUTH.ERROR": {
    type: "CLUSTER.ADD.CHECK_AUTH.ERROR";
    payload: {
      message: string;
    };
  };

  "CLUSTER.ADD.NODE_NAME.UPDATE": {
    type: "CLUSTER.ADD.NODE_NAME.UPDATE";
    payload: { nodeName: string };
  };
};
