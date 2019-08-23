import { LoginActionType } from "./types";

export interface LoginFailed {
  type: typeof LoginActionType.LOGIN_FAILED,
  payload: {
    badCredentials: boolean,
    message: string,
  }
}

export interface EnterCredentials {
  type: typeof LoginActionType.ENTER_CREDENTIALS,
  payload: {
    username: string,
    password: string,
  }
}

export interface Logout {
  type: typeof LoginActionType.LOGOUT,
}

export interface LogoutSuccess {
  type: typeof LoginActionType.LOGOUT_SUCCESS,
}
