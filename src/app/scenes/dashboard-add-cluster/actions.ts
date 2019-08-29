export interface AddCluster {
  type: "ADD_CLUSTER.ADD_CLUSTER",
  payload: {
    nodeName: string,
  },
}

export interface AddClusterSuccess {
  type: "ADD_CLUSTER.ADD_CLUSTER.SUCCESS",
  payload: {
    warningMessages: string[],
  },
}

export interface AddClusterError {
  type: "ADD_CLUSTER.ADD_CLUSTER.ERROR",
  payload: {
    message: string,
  }
}

export interface AuthenticateNode {
  type: "ADD_CLUSTER.AUTHENTICATE_NODE",
  payload: {
    nodeName: string,
    password: string,
    address: string,
    // TODO make it number
    port: string,
  }
}

export interface AuthenticateNodeSuccess {
  type: "ADD_CLUSTER.AUTHENTICATE_NODE.SUCCESS",
}

export interface AuthenticateNodeFailed {
  type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
  payload: {
    message: string,
  }
}

export interface CheckAuth {
  type: "ADD_CLUSTER.CHECK_AUTH",
  payload: {
    nodeName: string
  },
}

export interface CheckAuthOk {
  type: "ADD_CLUSTER.CHECK_AUTH.OK",
}

export interface CheckAuthNoAuth {
  type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH",
}

export interface CheckAuthError {
  type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
  payload: {
    message: string,
  }
}

export interface ReloadDashboard {
  type: "ADD_CLUSTER.RELOAD_DASHBOARD",
}

export interface UpdateNodeName {
  type: "ADD_CLUSTER.NODE_NAME.UPDATE",
  payload: { nodeName: string },
}
