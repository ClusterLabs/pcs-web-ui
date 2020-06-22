import { types } from "app/store";
import { Selector } from "app/store/types";

export const getUsername: Selector<types.username.UsernameState> = state =>
  state.username;

export const loaded: Selector<boolean> = state => state.username !== "";
