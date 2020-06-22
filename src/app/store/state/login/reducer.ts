import { Reducer } from "redux";

import { Action } from "app/actions";
import { types } from "app/store";

const defaultState = {
  required: false,
  logoutApplied: false,
  acceptLoginData: false,
  failed: false,
  badCredentials: false,
  errorMessage: "",
};

const loginState: Reducer<types.login.LoginState, Action> = (
  state = defaultState,
  action,
) => {
  switch (action.type) {
    case "AUTH.REQUIRED":
      return {
        ...state,
        required: true,
        acceptLoginData: true,
      };
    case "ENTER_CREDENTIALS":
      return {
        ...state,
        acceptLoginData: false,
      };
    case "AUTH.SUCCESS":
      return {
        ...state,
        required: false,
        acceptLoginData: false,
        failed: false,
        badCredentials: false,
        errorMessage: "",
      };
    case "LOGIN.FAILED":
      return {
        ...state,
        required: true,
        acceptLoginData: true,
        failed: true,
        badCredentials: action.payload.badCredentials,
        errorMessage: action.payload.message,
      };
    case "LOGOUT.SUCCESS":
      return {
        ...state,
        logoutApplied: true,
        required: true,
        acceptLoginData: true,
        failed: false,
        badCredentials: false,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default loginState;
