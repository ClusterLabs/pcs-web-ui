import { combineReducers, Reducer } from "redux";
import {
  ClusterAddActionTypes,
  AUTH_STATE,
  ADD_STATE,
  NodeName,
  StateError,
  DashboardAddClusterPageState,
} from "./types";
import * as ClusterAddActions from "./actions";

const {
  ADD_CLUSTER,
  ADD_CLUSTER_SUCCESS,
  ADD_CLUSTER_ERROR,
  AUTHENTICATE_NODE,
  AUTHENTICATE_NODE_FAILED,
  AUTHENTICATE_NODE_SUCCESS,
  CHECK_AUTH,
  CHECK_AUTH_ERROR,
  CHECK_AUTH_NO_AUTH,
  CHECK_AUTH_OK,
  RELOAD_DASHBOARD,
  UPDATE_NODE_NAME,
} = ClusterAddActionTypes;

const nodeName: Reducer<
  NodeName,
  ClusterAddActions.UpdateNodeName
> = (state = "", action) => {
  switch (action.type) {
    case ClusterAddActionTypes.UPDATE_NODE_NAME: return action.payload.nodeName;
    default: return state;
  }
};

const stepAuthState: Reducer<AUTH_STATE> = (
  state = AUTH_STATE.INITIAL,
  action,
) => {
  switch (action.type) {
    case UPDATE_NODE_NAME: return AUTH_STATE.INITIAL;
    case CHECK_AUTH: return AUTH_STATE.CHECKING;
    case CHECK_AUTH_OK: return AUTH_STATE.ALREADY_AUTHENTICATED;
    case CHECK_AUTH_NO_AUTH: return AUTH_STATE.NOT_AUTHENTICATED;
    case CHECK_AUTH_ERROR: return AUTH_STATE.ERROR;
    case AUTHENTICATE_NODE:
      return AUTH_STATE.AUTHENTICATION_IN_PROGRESS;
    case AUTHENTICATE_NODE_SUCCESS:
      return AUTH_STATE.ALREADY_AUTHENTICATED;
    case AUTHENTICATE_NODE_FAILED:
      return AUTH_STATE.AUTHENTICATION_FAILED;
    default: return state;
  }
};

const stepAddState: Reducer<ADD_STATE> = (
  state = ADD_STATE.STARTED,
  action,
) => {
  switch (action.type) {
    case ADD_CLUSTER: return ADD_STATE.STARTED;
    case RELOAD_DASHBOARD: return ADD_STATE.DASHBOARD_RELOADING;
    case ADD_CLUSTER_SUCCESS: return ADD_STATE.SUCCESS;
    case ADD_CLUSTER_ERROR: return ADD_STATE.ERROR;
    default: return state;
  }
};

const stateError: Reducer<StateError> = (state = "", action) => {
  switch (action.type) {
    case UPDATE_NODE_NAME:
    case CHECK_AUTH:
    case CHECK_AUTH_OK:
    case CHECK_AUTH_NO_AUTH:
    case ADD_CLUSTER:
    case RELOAD_DASHBOARD:
    case ADD_CLUSTER_SUCCESS:
    case AUTHENTICATE_NODE:
      return "";
    case CHECK_AUTH_ERROR:
    case ADD_CLUSTER_ERROR:
    case AUTHENTICATE_NODE_FAILED:
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
