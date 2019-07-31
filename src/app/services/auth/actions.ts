import * as types from "./constants";

export const authRequired = (): types.AuthRequired => ({
  type: types.AUTH_REQUIRED,
});

export const authSuccess = () => ({
  type: types.AUTH_SUCCESS,
});
