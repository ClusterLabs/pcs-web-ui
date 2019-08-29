import { Selector, RootState } from "app/core/types";

import { LoginState } from "./types";

const localState: Selector<RootState, LoginState> = state => state.login;

export const failed: Selector<RootState, boolean> = (
  state => localState(state).failed
);

export const failMessage: Selector<RootState, string> = (
  state => (
    localState(state).badCredentials
      ? "The username or password you entered is incorect"
      : localState(state).errorMessage
  )
);

export const isAcceptingLoginData: Selector<RootState, boolean> = (
  state => localState(state).acceptLoginData
);

export const loginRequired: Selector<RootState, boolean> = (
  state => localState(state).required
);
