import * as types from "app/store/types";

import { Selector } from "./selector";

const localState: Selector<types.login.LoginState> = state => state.login;

export const loginIsFailed: Selector<boolean> = state =>
  localState(state).failed;

export const loginGetFailMessage: Selector<string> = state =>
  localState(state).badCredentials
    ? "The username or password you entered is incorect"
    : localState(state).errorMessage;

export const loginIsAcceptingData: Selector<boolean> = state =>
  localState(state).acceptLoginData;

export const loginIsRequired: Selector<boolean> = state =>
  localState(state).required;
