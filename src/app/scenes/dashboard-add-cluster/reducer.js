import { combineReducers } from "redux";
import {
  actionTypes as types,
  stepAuthStates,
  stepAddStates,
} from "./constants";

const nodeName = (state = "", action) => {
  switch (action.type) {
    case types.UPDATE_NODE_NAME: return action.payload;
    default: return state;
  }
};

const stepAuthState = (state = stepAuthStates.INITIAL, action) => {
  switch (action.type) {
    case types.UPDATE_NODE_NAME: return stepAuthStates.INITIAL;
    case types.CHECK_AUTH: return stepAuthStates.CHECKING;
    case types.CHECK_AUTH_OK: return stepAuthStates.ALREADY_AUTHENTICATED;
    case types.CHECK_AUTH_NO_AUTH: return stepAuthStates.NOT_AUTHENTICATED;
    case types.CHECK_AUTH_ERROR: return stepAuthStates.ERROR;
    case types.AUTHENTICATE_NODE:
      return stepAuthStates.AUTHENTICATION_IN_PROGRESS;
    case types.AUTHENTICATE_NODE_SUCCESS:
      return stepAuthStates.ALREADY_AUTHENTICATED;
    case types.AUTHENTICATE_NODE_FAILED:
      return stepAuthStates.AUTHENTICATION_FAILED;
    default: return state;
  }
};

const stepAddState = (state = stepAddStates.STARTED, action) => {
  switch (action.type) {
    case types.ADD_CLUSTER: return stepAddStates.STARTED;
    case types.RELOAD_DASHBOARD: return stepAddStates.DASHBOARD_RELOADING;
    case types.ADD_CLUSTER_SUCCESS: return stepAddStates.SUCCESS;
    case types.ADD_CLUSTER_ERROR: return stepAddStates.ERROR;
    default: return state;
  }
};

const stateError = (state = "", action) => {
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

export const getNodeName = state => state.nodeName;
export const getStepAuthState = state => state.stepAuthState;
export const getStepAddState = state => state.stepAddState;
export const getStateError = state => state.stateError;

export default combineReducers({
  nodeName,
  stepAuthState,
  stepAddState,
  stateError,
});
