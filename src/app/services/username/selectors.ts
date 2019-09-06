import { Selector, RootState } from "app/core/types";

import { UsernameState } from "./types";

const localState: Selector<RootState, UsernameState> = (
  state => state.username
);

export const getUsername = localState;

export const loaded: Selector<RootState, boolean> = (
  state => localState(state) !== ""
);
