export const AUTH_REQUIRED = "/auth/AUTH_REQUIRED";
export const AUTH_SUCCESS = "/login/AUTH_SUCCESS";

export interface AuthRequired{
  type: typeof AUTH_REQUIRED,
}

export interface AuthSuccess{
  type: typeof AUTH_SUCCESS,
}
