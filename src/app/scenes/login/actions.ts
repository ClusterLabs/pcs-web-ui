export interface LoginFailed {
  type: "LOGIN.FAILED",
  payload: {
    badCredentials: boolean,
    message: string,
  }
}

export interface EnterCredentials {
  type: "ENTER_CREDENTIALS",
  payload: {
    username: string,
    password: string,
  }
}

export interface Logout {
  type: "LOGOUT",
}

export interface LogoutSuccess {
  type: "LOGIN.SUCCESS",
}
