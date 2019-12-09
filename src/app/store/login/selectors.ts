import { Selector } from "../types";

import { LoginState } from "./types";

const localState: Selector<LoginState> = state => state.login;

export const failed: Selector<boolean> = (
  state => localState(state).failed
);

export const failMessage: Selector<string> = (
  state => (
    localState(state).badCredentials
      ? "The username or password you entered is incorect"
      : localState(state).errorMessage
  )
);

export const isAcceptingLoginData: Selector<boolean> = (
  state => localState(state).acceptLoginData
);

export const loginRequired: Selector<boolean> = (
  state => localState(state).required
);
