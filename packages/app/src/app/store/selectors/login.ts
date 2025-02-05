import type {Root} from "./types";

export const loginIsFailed = (state: Root) => state.login.failed;

export const loginGetFailMessage = (state: Root) =>
  state.login.badCredentials
    ? "Incorrect login credentials"
    : state.login.errorMessage;

export const loginIsAcceptingData = (state: Root) =>
  state.login.acceptLoginData;

export const loginIsRequired = (state: Root) => state.login.required;
