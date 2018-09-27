import * as types from "./constants";

export const loginFailed = ({ badCredentials, message = "" }) => ({
  type: types.LOGIN_FAILED,
  payload: { badCredentials, message },
});

export const enterCredentials = (username, password) => ({
  type: types.ENTER_CREDENTIALS,
  payload: { username, password },
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});
