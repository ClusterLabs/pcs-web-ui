import { types } from "app/store/reducers";

import { Selector } from "./selector";

export const getUsername: Selector<types.username.Username> = state =>
  state.username;

export const usernameLoaded: Selector<boolean> = state => state.username !== "";
