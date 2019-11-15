export type LoginActions = {
  LoginFailed: {
    type: "LOGIN.FAILED",
    payload: {
      badCredentials: boolean,
      message: string,
    }
  };

  EnterCredentials: {
    type: "ENTER_CREDENTIALS",
    payload: {
      username: string,
      password: string,
    }
  };

  Logout: {
    type: "LOGOUT",
  };

  LogoutSuccess: {
    type: "LOGOUT.SUCCESS",
  };
}
