import { Selector } from "../types";

import { UsernameState } from "./types";

export const getUsername: Selector<UsernameState> = (
  state => state.username
);

export const loaded: Selector<boolean> = (
  state => state.username !== ""
);
