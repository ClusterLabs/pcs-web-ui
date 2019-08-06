import { AuthActionType } from "./types";

export interface AuthRequired{
  type: typeof AuthActionType.AUTH_REQUIRED,
}

export interface AuthSuccess{
  type: typeof AuthActionType.AUTH_SUCCESS,
}
