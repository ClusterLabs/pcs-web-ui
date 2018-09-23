import * as types from "./constants"

export const authRequired = () => ({
  type: types.AUTH_REQUIRED,
});

export const authSuccess = () => ({
  type: types.AUTH_SUCCESS,
});

export const authVerified = () => ({
  type: types.AUTH_VERIFIED,
});
