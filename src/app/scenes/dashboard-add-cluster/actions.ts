import { ClusterAddActionTypes } from "./types";

export interface AddClusterSuccess {
  type: typeof ClusterAddActionTypes.ADD_CLUSTER_SUCCESS,
  payload: {
    warningMessages: string[],
  },
}

export interface AddClusterErrorAction {
  type: typeof ClusterAddActionTypes.ADD_CLUSTER_ERROR,
  payload: {
    message: string,
  }
}

export interface AuthenticateNodeAction {
  type: typeof ClusterAddActionTypes.AUTHENTICATE_NODE,
  payload: {
    nodeName: string,
    password: string,
    address: string,
    // TODO make it number
    port: string,
  }
}

export interface AuthenticateNodeSuccessAction {
  type: typeof ClusterAddActionTypes.AUTHENTICATE_NODE_SUCCESS,
}

export interface AuthenticateNodeFailedAction {
  type: typeof ClusterAddActionTypes.AUTHENTICATE_NODE_FAILED,
  payload: {
    message: string,
  }
}

export interface AddCluster {
  type: typeof ClusterAddActionTypes.ADD_CLUSTER,
  payload: {
    nodeName: string,
  },
}

export interface CheckAuth {
  type: typeof ClusterAddActionTypes.CHECK_AUTH,
  payload: {
    nodeName: string
  },
}

export interface CheckAuthOk {
  type: typeof ClusterAddActionTypes.CHECK_AUTH_OK,
}

export interface CheckAuthNoAuth {
  type: typeof ClusterAddActionTypes.CHECK_AUTH_NO_AUTH,
}

export interface CheckAuthError {
  type: typeof ClusterAddActionTypes.CHECK_AUTH_ERROR,
  payload: {
    message: string,
  }
}

export interface ReloadDashboard {
  type: typeof ClusterAddActionTypes.RELOAD_DASHBOARD,
}

export interface UpdateNodeName {
  type: typeof ClusterAddActionTypes.UPDATE_NODE_NAME,
  payload: { nodeName: string },
}
