import { combineReducers, Reducer } from "redux";
import {
  ClusterAddActionType,
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
} = ClusterAddActionType;

const nodeName: Reducer<
  NodeName,
  ClusterAddActions.UpdateNodeName
> = (state = "", action) => {
  switch (action.type) {
    case ClusterAddActionType.UPDATE_NODE_NAME: return action.payload.nodeName;
    default: return state;
  }
};

const stepAuthState: Reducer<AUTH_STATE> = (state = "INITIAL", action) => {
  switch (action.type) {
    case UPDATE_NODE_NAME: return "INITIAL";
    case CHECK_AUTH: return "CHECKING";
    case CHECK_AUTH_OK: return "ALREADY_AUTHENTICATED";
    case CHECK_AUTH_NO_AUTH: return "NOT_AUTHENTICATED";
    case CHECK_AUTH_ERROR: return "ERROR";
    case AUTHENTICATE_NODE:
      return "AUTHENTICATION_IN_PROGRESS";
    case AUTHENTICATE_NODE_SUCCESS:
      return "ALREADY_AUTHENTICATED";
    case AUTHENTICATE_NODE_FAILED:
      return "AUTHENTICATION_FAILED";
    default: return state;
  }
};

const stepAddState: Reducer<ADD_STATE> = (state = "STARTED", action) => {
  switch (action.type) {
    case ADD_CLUSTER: return "STARTED";
    case RELOAD_DASHBOARD: return "DASHBOARD_RELOADING";
    case ADD_CLUSTER_SUCCESS: return "SUCCESS";
    case ADD_CLUSTER_ERROR: return "ERROR";
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

export default combineReducers<DashboardAddClusterPageState>({
  nodeName,
  stepAuthState,
  stepAddState,
  stateError,
});
