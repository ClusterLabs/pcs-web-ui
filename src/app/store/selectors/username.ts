import * as types from "app/store/types";

import { Selector } from "./selector";

export const getUsername: Selector<types.username.Username> = state =>
  state.username;

export const usernameLoaded: Selector<boolean> = state => state.username !== "";
