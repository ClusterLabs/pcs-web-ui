import { combineReducers, Reducer } from "redux";
import {
  actionTypes as types,
  AUTH_STATE,
  ADD_STATE,
  NodeName,
  StateError,
  DashboardAddClusterPageState,
} from "./types";

const nodeName: Reducer<NodeName> = (state = "", action) => {
  switch (action.type) {
    case types.UPDATE_NODE_NAME: return action.payload;
    default: return state;
  }
};

const stepAuthState: Reducer<AUTH_STATE> = (
  state = AUTH_STATE.INITIAL,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_NODE_NAME: return AUTH_STATE.INITIAL;
    case types.CHECK_AUTH: return AUTH_STATE.CHECKING;
    case types.CHECK_AUTH_OK: return AUTH_STATE.ALREADY_AUTHENTICATED;
    case types.CHECK_AUTH_NO_AUTH: return AUTH_STATE.NOT_AUTHENTICATED;
    case types.CHECK_AUTH_ERROR: return AUTH_STATE.ERROR;
    case types.AUTHENTICATE_NODE:
      return AUTH_STATE.AUTHENTICATION_IN_PROGRESS;
    case types.AUTHENTICATE_NODE_SUCCESS:
      return AUTH_STATE.ALREADY_AUTHENTICATED;
    case types.AUTHENTICATE_NODE_FAILED:
      return AUTH_STATE.AUTHENTICATION_FAILED;
    default: return state;
  }
};

const stepAddState: Reducer<ADD_STATE> = (
  state = ADD_STATE.STARTED,
  action,
) => {
  switch (action.type) {
    case types.ADD_CLUSTER: return ADD_STATE.STARTED;
    case types.RELOAD_DASHBOARD: return ADD_STATE.DASHBOARD_RELOADING;
    case types.ADD_CLUSTER_SUCCESS: return ADD_STATE.SUCCESS;
    case types.ADD_CLUSTER_ERROR: return ADD_STATE.ERROR;
    default: return state;
  }
};

const stateError: Reducer<StateError> = (state = "", action) => {
  switch (action.type) {
    case types.UPDATE_NODE_NAME:
    case types.CHECK_AUTH:
    case types.CHECK_AUTH_OK:
    case types.CHECK_AUTH_NO_AUTH:
    case types.ADD_CLUSTER:
    case types.RELOAD_DASHBOARD:
    case types.ADD_CLUSTER_SUCCESS:
    case types.AUTHENTICATE_NODE:
      return "";
    case types.CHECK_AUTH_ERROR:
    case types.ADD_CLUSTER_ERROR:
    case types.AUTHENTICATE_NODE_FAILED:
      return action.payload.message;

    default: return state;
  }
};

export const getNodeName = (
  state: DashboardAddClusterPageState,
) => state.nodeName;

export const getStepAuthState = (
  state: DashboardAddClusterPageState,
) => state.stepAuthState;

export const getStepAddState = (
  state: DashboardAddClusterPageState,
) => state.stepAddState;

export const getStateError = (
  state: DashboardAddClusterPageState,
) => state.stateError;

export default combineReducers<DashboardAddClusterPageState>({
  nodeName,
  stepAuthState,
  stepAddState,
  stateError,
});
