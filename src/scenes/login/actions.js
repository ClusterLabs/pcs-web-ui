import * as types from "./constants"

export const requireLogin = () => ({
  type: types.REQUIRE_LOGIN,
});

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const loginFailed = () => ({
  type: types.LOGIN_FAILED,
});

export const enterCredentials = (username, password) => ({
  type: types.ENTER_CREDENTIALS,
  payload: { username, password }
});

export const logout = () => ({
  type: types.LOGOUT,
})

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
})
