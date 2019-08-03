import { Reducer } from "redux";

import {
  AuthRequired,
  AuthSuccess,
  AUTH_REQUIRED,
  AUTH_SUCCESS,
} from "app/services/auth/constants";

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
  | AuthRequired
  | AuthSuccess
  | LoginAction.enterCredentials
  | LoginAction.loginFailed
  | LoginAction.logoutSuccess
> = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_REQUIRED: return {
      ...state,
      required: true,
      acceptLoginData: true,
    };
    case LoginActionType.ENTER_CREDENTIALS: return {
      ...state,
      acceptLoginData: false,
    };
    case AUTH_SUCCESS: return {
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

export const failed = (state: LoginState) => typeof state.failed;
export const failMessage = (state: LoginState) => (
  state.badCredentials
    ? "The username or password you entered is incorect"
    : state.errorMessage
);
export const isAcceptingLoginData = (state: LoginState) => (
  state.acceptLoginData
);
export const loginRequired = (state: LoginState) => state.required;
