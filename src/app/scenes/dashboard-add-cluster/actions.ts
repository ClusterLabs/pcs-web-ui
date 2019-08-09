import { ClusterAddActionType } from "./types";

export interface AddClusterSuccess {
  type: typeof ClusterAddActionType.ADD_CLUSTER_SUCCESS,
  payload: {
    warningMessages: string[],
  },
}

export interface AddClusterError {
  type: typeof ClusterAddActionType.ADD_CLUSTER_ERROR,
  payload: {
    message: string,
  }
}

export interface AuthenticateNode {
  type: typeof ClusterAddActionType.AUTHENTICATE_NODE,
  payload: {
    nodeName: string,
    password: string,
    address: string,
    // TODO make it number
    port: string,
  }
}

export interface AuthenticateNodeSuccess {
  type: typeof ClusterAddActionType.AUTHENTICATE_NODE_SUCCESS,
}

export interface AuthenticateNodeFailed {
  type: typeof ClusterAddActionType.AUTHENTICATE_NODE_FAILED,
  payload: {
    message: string,
  }
}

export interface AddCluster {
  type: typeof ClusterAddActionType.ADD_CLUSTER,
  payload: {
    nodeName: string,
  },
}

export interface CheckAuth {
  type: typeof ClusterAddActionType.CHECK_AUTH,
  payload: {
    nodeName: string
  },
}

export interface CheckAuthOk {
  type: typeof ClusterAddActionType.CHECK_AUTH_OK,
}

export interface CheckAuthNoAuth {
  type: typeof ClusterAddActionType.CHECK_AUTH_NO_AUTH,
}

export interface CheckAuthError {
  type: typeof ClusterAddActionType.CHECK_AUTH_ERROR,
  payload: {
    message: string,
  }
}

export interface ReloadDashboard {
  type: typeof ClusterAddActionType.RELOAD_DASHBOARD,
}

export interface UpdateNodeName {
  type: typeof ClusterAddActionType.UPDATE_NODE_NAME,
  payload: { nodeName: string },
}
