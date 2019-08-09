import { LoginActionType } from "./types";

export interface loginFailed {
  type: typeof LoginActionType.LOGIN_FAILED,
  payload: {
    badCredentials: boolean,
    message: string,
  }
}

export interface enterCredentials {
  type: typeof LoginActionType.ENTER_CREDENTIALS,
  payload: {
    username: string,
    password: string,
  }
}

export interface logout {
  type: typeof LoginActionType.LOGOUT,
}

export interface logoutSuccess {
  type: typeof LoginActionType.LOGOUT_SUCCESS,
}
