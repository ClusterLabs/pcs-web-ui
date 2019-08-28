import { Reducer } from "redux";

import * as AuthAction from "app/services/auth/actions";

import { LoginActionType, LoginState } from "./types";
import * as LoginAction from "./actions";

const defaultState = {
  required: false,
  logoutApplied: false,
  acceptLoginData: false,
  failed: false,
  badCredentials: false,
  errorMessage: "",
};

const loginState: Reducer<
  LoginState,
  | AuthAction.AuthRequired
  | AuthAction.AuthSuccess
  | LoginAction.EnterCredentials
  | LoginAction.LoginFailed
  | LoginAction.LogoutSuccess
> = (state = defaultState, action) => {
  switch (action.type) {
    case "AUTH.REQUIRED": return {
      ...state,
      required: true,
      acceptLoginData: true,
    };
    case LoginActionType.ENTER_CREDENTIALS: return {
      ...state,
      acceptLoginData: false,
    };
    case "AUTH.SUCCESS": return {
      ...state,
      required: false,
      acceptLoginData: false,
      failed: false,
      badCredentials: false,
      errorMessage: "",
    };
    case LoginActionType.LOGIN_FAILED: return {
      ...state,
      required: true,
      acceptLoginData: true,
      failed: true,
      badCredentials: action.payload.badCredentials,
      errorMessage: action.payload.message,
    };
    case LoginActionType.LOGOUT_SUCCESS: return {
      ...state,
      logoutApplied: true,
      required: true,
      acceptLoginData: true,
      failed: false,
      badCredentials: false,
      errorMessage: "",
    };
    default: return state;
  }
};

export default loginState;
