import { actionTypes } from "./constants";

export const updateNodeName = nodeName => ({
  type: actionTypes.UPDATE_NODE_NAME,
  payload: nodeName,
});

export const checkAuth = nodeName => ({
  type: actionTypes.CHECK_AUTH,
  payload: nodeName,
});

export const checkAuthOk = () => ({
  type: actionTypes.CHECK_AUTH_OK,
});

export const checkAuthNoAuth = () => ({
  type: actionTypes.CHECK_AUTH_NO_AUTH,
});

export const checkAuthError = message => ({
  type: actionTypes.CHECK_AUTH_ERROR,
  payload: { message },
});

export const authenticateNode = (nodeName, password, address, port) => ({
  type: actionTypes.AUTHENTICATE_NODE,
  payload: {
    nodeName,
    password,
    address,
    port,
  },
});

export const authenticateNodeSuccess = () => ({
  type: actionTypes.AUTHENTICATE_NODE_SUCCESS,
});

export const authenticateNodeFailed = message => ({
  type: actionTypes.AUTHENTICATE_NODE_FAILED,
  payload: { message },
});

export const addCluster = nodeName => ({
  type: actionTypes.ADD_CLUSTER,
  payload: nodeName,
});

export const addClusterSuccess = warningMessages => ({
  type: actionTypes.ADD_CLUSTER_SUCCESS,
  payload: { warningMessages },
});

export const reloadDashboard = () => ({
  type: actionTypes.RELOAD_DASHBOARD,
});

export const addClusterError = message => ({
  type: actionTypes.ADD_CLUSTER_ERROR,
  payload: { message },
});
