import { combineReducers } from "redux";

import { Reducer } from "./tools";

export type AUTH_STATE =
  | "INITIAL"
  | "CHECKING"
  | "ALREADY_AUTHENTICATED"
  | "NOT_AUTHENTICATED"
  | "ERROR";

export type AuthProcessId = number | null;

export type ADD_STATE = "STARTED" | "SUCCESS" | "ERROR" | "DASHBOARD_RELOADING";

export type NodeName = string;
export type StateError = string;

export interface DashboardAddClusterPageState {
  nodeName: NodeName;
  stepAuthState: AUTH_STATE;
  stepAddState: ADD_STATE;
  stateError: StateError;
  authProcessId: AuthProcessId;
}

const nodeName: Reducer<NodeName> = (state = "", action) => {
  switch (action.type) {
    case "CLUSTER.ADD.NODE_NAME.UPDATE":
      return action.payload.nodeName;
    default:
      return state;
  }
};

const stepAuthState: Reducer<AUTH_STATE> = (state = "INITIAL", action) => {
  switch (action.type) {
    case "CLUSTER.ADD.NODE_NAME.UPDATE":
      return "INITIAL";
    case "CLUSTER.ADD.CHECK_AUTH":
      return "CHECKING";
    case "CLUSTER.ADD.CHECK_AUTH.OK":
      return "ALREADY_AUTHENTICATED";
    case "CLUSTER.ADD.CHECK_AUTH.NO_AUTH":
      return "NOT_AUTHENTICATED";
    case "CLUSTER.ADD.CHECK_AUTH.ERROR":
      return "ERROR";
    default:
      return state;
  }
};

const authProcessId: Reducer<AuthProcessId> = (state = null, action) => {
  switch (action.type) {
    case "CLUSTER.ADD.CHECK_AUTH.NO_AUTH":
      return action.payload.authProcessId;
    case "CLUSTER.ADD.CHECK_AUTH.OK":
    case "CLUSTER.ADD.NODE_NAME.UPDATE":
      return null;
    default:
      return state;
  }
};

const stepAddState: Reducer<ADD_STATE> = (state = "STARTED", action) => {
  switch (action.type) {
    case "CLUSTER.ADD":
      return "STARTED";
    case "CLUSTER.LIST.REFRESH":
      return "DASHBOARD_RELOADING";
    case "CLUSTER.ADD.OK":
      return "SUCCESS";
    case "CLUSTER.ADD.ERROR":
      return "ERROR";
    default:
      return state;
  }
};

const stateError: Reducer<StateError> = (state = "", action) => {
  switch (action.type) {
    case "CLUSTER.ADD.NODE_NAME.UPDATE":
    case "CLUSTER.ADD.CHECK_AUTH":
    case "CLUSTER.ADD.CHECK_AUTH.OK":
    case "CLUSTER.ADD.CHECK_AUTH.NO_AUTH":
    case "CLUSTER.ADD":
    case "CLUSTER.LIST.REFRESH":
    case "CLUSTER.ADD.OK":
      return "";
    case "CLUSTER.ADD.CHECK_AUTH.ERROR":
    case "CLUSTER.ADD.ERROR":
      return action.payload.message;

    default:
      return state;
  }
};

export default combineReducers<DashboardAddClusterPageState>({
  nodeName,
  stepAuthState,
  stepAddState,
  stateError,
  authProcessId,
});
