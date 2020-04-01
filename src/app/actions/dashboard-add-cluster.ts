export type AddClusterActions = {
  AddCluster: {
    type: "ADD_CLUSTER.ADD_CLUSTER";
    payload: {
      nodeName: string;
    };
  };

  AddClusterSuccess: {
    type: "ADD_CLUSTER.ADD_CLUSTER.SUCCESS";
    payload: {
      warningMessages: string[];
    };
  };

  AddClusterError: {
    type: "ADD_CLUSTER.ADD_CLUSTER.ERROR";
    payload: {
      message: string;
    };
  };

  AuthenticateNode: {
    type: "ADD_CLUSTER.AUTHENTICATE_NODE";
    payload: {
      nodeName: string;
      password: string;
      address: string;
      // TODO make it number
      port: string;
    };
  };

  AuthenticateNodeSuccess: {
    type: "ADD_CLUSTER.AUTHENTICATE_NODE.SUCCESS";
  };

  AuthenticateNodeFailed: {
    type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED";
    payload: {
      message: string;
    };
  };

  CheckAuth: {
    type: "ADD_CLUSTER.CHECK_AUTH";
    payload: {
      nodeName: string;
    };
  };

  CheckAuthOk: {
    type: "ADD_CLUSTER.CHECK_AUTH.OK";
  };

  CheckAuthNoAuth: {
    type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH";
  };

  CheckAuthError: {
    type: "ADD_CLUSTER.CHECK_AUTH.ERROR";
    payload: {
      message: string;
    };
  };

  ReloadDashboard: {
    type: "ADD_CLUSTER.RELOAD_DASHBOARD";
  };

  UpdateNodeName: {
    type: "ADD_CLUSTER.NODE_NAME.UPDATE";
    payload: { nodeName: string };
  };
}
